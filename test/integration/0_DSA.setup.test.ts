/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
const hre = require('hardhat')
const GelatoCoreLib = require('@gelatonetwork/core')

import { ethers } from 'hardhat'
import { expect } from 'chai'
import { Signer } from '@ethersproject/abstract-signer'
import { getAccounts, getMainnetDeployedContracts, IContracts } from '../utils/contracts'
import { ETH } from '../utils/constants'
import { BigNumber } from 'ethers'
import { DSA } from '../../types/deployed'
import { createDSA } from '../helpers/instaDapp'

describe('DSA setup with Gelato', function () {
  let user: Signer
  let userAddress: string

  // Deployed instances
  let contracts: IContracts
  let dsa: DSA
  let dsaVersion: BigNumber

  before(async function () {
    const accounts = await getAccounts()
    user = accounts.user
    userAddress = await user.getAddress()

    contracts = getMainnetDeployedContracts(user)

    dsa = await createDSA(user)
    dsaVersion = await dsa.version()
  })

  it('#1: Forks InstaDapp Mainnet config', async function () {
    expect(await contracts.InstaIndex.list()).to.be.equal(contracts.InstaList.address)
    expect(dsaVersion).to.be.equal(1)
    expect(await contracts.InstaIndex.connectors(dsaVersion)).to.be.equal(contracts.InstaConnectors.address)
    expect(await contracts.InstaConnectors.connectors(hre.network.config.ConnectOasis)).to.be.true
    expect(await contracts.InstaConnectors.connectors(hre.network.config.ConnectAuth)).to.be.true
    expect(await contracts.InstaConnectors.connectors(hre.network.config.ConnectBasic)).to.be.true
    expect(await contracts.InstaConnectors.connectors(hre.network.config.ConnectMaker)).to.be.true
    expect(await contracts.InstaConnectors.connectors(hre.network.config.ConnectCompound)).to.be.true
  })

  it('#2: Deploy a DSA with user as authority', async function () {
    expect(await dsa.isAuth(userAddress)).to.be.true
  })

  it('#3: Let User deposit and withdraw funds from DSA', async function () {
    // Send withdraw TX via DSA.cast delegatecall
    const gasLimit = ethers.BigNumber.from(1000000)
    const gasPrice = ethers.utils.parseUnits('20', 'gwei')
    const gasCostMax = gasLimit.mul(gasPrice)

    // Deposit funds into DSA
    const initialWalletBalance = await user.getBalance()
    expect(await ethers.provider.getBalance(dsa.address)).to.be.equal(0)
    await user.sendTransaction({
      to: dsa.address,
      value: ethers.utils.parseEther('1'),
      gasLimit,
      gasPrice,
    })
    expect(await user.getBalance()).to.be.lt(initialWalletBalance.sub(ethers.utils.parseEther('1')))
    expect(await ethers.provider.getBalance(dsa.address)).to.be.equal(ethers.utils.parseEther('1'))

    // Encode Payloads for ConnectBasic.withdraw
    const withdrawData = await contracts.ConnectBasic.populateTransaction.withdraw(
      ETH,
      ethers.utils.parseEther('1'),
      userAddress,
      0,
      0,
    )

    await expect(
      dsa.cast([hre.network.config.ConnectBasic], [withdrawData.data!], userAddress, {
        gasLimit,
        gasPrice,
      }),
    )
      .to.emit(dsa, 'LogCast')
      .withArgs(userAddress, userAddress, 0)

    expect(await ethers.provider.getBalance(dsa.address)).to.be.equal(0)
    expect(await user.getBalance()).to.be.gte(initialWalletBalance.sub(gasCostMax.mul(2)))
  })

  it('#4: Enables GelatoCore as a User of the DSA', async function () {
    expect(await dsa.isAuth(contracts.GelatoCore.address)).to.be.false

    // Encode Payloads for ConnectAuth.addModule
    const addAuthData = await contracts.ConnectAuth.populateTransaction.add(contracts.GelatoCore.address)

    await expect(dsa.cast([hre.network.config.ConnectAuth], [addAuthData.data!], userAddress))
      .to.emit(dsa, 'LogCast')
      .withArgs(userAddress, userAddress, 0)

    expect(await dsa.isAuth(contracts.GelatoCore.address)).to.be.true
  })

  it('#5: ConnectGelato is deployed and whitelisted on mainnet', async function () {
    expect(await contracts.InstaConnectors.isConnector([hre.network.config.ConnectGelato])).to.be.true
  })

  it('#6: Gelato ProviderModuleDSA returns correct execPayload', async function () {
    // Deposit 1 ETH into DSA
    await user.sendTransaction({
      to: dsa.address,
      value: ethers.utils.parseEther('1'),
    })
    expect(await ethers.provider.getBalance(dsa.address)).to.be.equal(ethers.utils.parseEther('1'))

    // We withdraw to otherWallet to ignore gasUsed during test
    const { 1: otherWallet } = await ethers.getSigners()

    // Instantiate Gelato ConnectBasic.withdraw Task
    const withdraw = await contracts.ConnectBasic.populateTransaction.withdraw(
      ETH,
      ethers.utils.parseEther('1'),
      await otherWallet.getAddress(),
      0,
      0,
    )
    const withdrawFromDSATask = new GelatoCoreLib.Task({
      actions: [
        new GelatoCoreLib.Action({
          addr: hre.network.config.ConnectBasic,
          data: withdraw.data!,
          operation: GelatoCoreLib.Operation.Delegatecall,
        }),
      ],
    })

    // otherWallet needs to be an authority to qualify as withdraw to address.
    const addAuthData = await contracts.ConnectAuth.populateTransaction.add(await otherWallet.getAddress())

    await dsa.cast([hre.network.config.ConnectAuth], [addAuthData.data!], userAddress)

    const { payload } = await contracts.ProviderModuleDSA.execPayload(
      0,
      ethers.constants.AddressZero,
      ethers.constants.AddressZero,
      withdrawFromDSATask,
      0,
    )

    await expect(() =>
      user.sendTransaction({
        to: dsa.address,
        data: payload,
      }),
    ).to.changeBalance(otherWallet, ethers.utils.parseEther('1'))
    expect(await ethers.provider.getBalance(dsa.address)).to.be.equal(0)
  })
})
