/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
const GelatoCoreLib = require('@gelatonetwork/core')
const hre = require('hardhat')
const { deployments } = hre

import { ethers } from 'hardhat'
import { expect } from 'chai'
import { createFixtureLoader } from 'ethereum-waffle'
import { BigNumber, Signer, Wallet } from 'ethers'
import { IConditions, IConnectors, deployConnectors, deployConditions } from '../utils/fixtures'
import createCDP from '../helpers/maker/createCDP'
import { DSA } from '../../types/deployed'
import { addProviderModules, provideFunds, providerAssignsExecutor, stakeExecutor } from '../helpers/gelato'
import { createDSA, getInstaPoolV2Route } from '../helpers/instaDapp'
import { getAccounts, getMainnetDeployedContracts, IContracts } from '../utils/contracts'
import {
  GAS_LIMIT,
  GAS_PRICE_CEIL,
  MAKER_INITIAL_DEBT,
  MAKER_INITIAL_LINK,
  MIN_COL_RATIO_MAKER,
} from '../utils/constants'
import { getAutoLiquidationSpells } from './spells/getAutoLiquidationSpells'
import { getAutoLiquidationGasCostByRoute } from './gas'

interface IAddresses {
  user: string
  gelatoProvider: string
  gelatoExecutor: string
}

describe('[LINK-A] Auto Liquidation scenario where collateralization ratio goes lower than target set by user', function () {
  this.timeout(0)
  if (hre.network.name !== 'hardhat') {
    console.error('Test Suite is meant to be run on hardhat only')
    process.exit(1)
  }

  let addresses: IAddresses
  let user: Signer
  let gelatoProvider: Signer
  let gelatoExecutor: Signer

  let contracts: IContracts
  let connectors: IConnectors
  let conditions: IConditions

  let dsa: DSA
  let vaultId: BigNumber

  let spells: any[]
  let taskReceipt: any

  before(async function () {
    // Reset back to a fresh forked state during runtime
    await deployments.fixture()

    const accounts = await getAccounts()
    user = accounts.user
    gelatoProvider = accounts.gelatoProvider
    gelatoExecutor = accounts.gelatoExecutor

    addresses = {
      user: await user.getAddress(),
      gelatoProvider: await gelatoProvider.getAddress(),
      gelatoExecutor: await gelatoExecutor.getAddress(),
    }

    contracts = getMainnetDeployedContracts(user)

    const loadFixture = createFixtureLoader([user, gelatoProvider, gelatoExecutor] as Wallet[])

    connectors = await loadFixture(deployConnectors)
    conditions = await loadFixture(deployConditions)

    // Setup gelato
    await stakeExecutor(gelatoExecutor)
    await provideFunds(gelatoProvider)
    await providerAssignsExecutor(gelatoProvider, addresses.gelatoExecutor)
    await addProviderModules(gelatoProvider)

    // Setup DSA
    dsa = await createDSA(user)

    // Snag some link from some holder account (randomly picked among top holders)
    const linkMegaHolder = await ethers.provider.getSigner(hre.network.config.LINKHolder)

    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [hre.network.config.LINKHolder],
    })

    // send funds to pay gas (link marine has no ETH ¯\_(ツ)_/¯)
    await user.sendTransaction({
      to: hre.network.config.LINKHolder,
      value: ethers.utils.parseEther('1'),
    })

    // Transfer link to dsa
    await contracts.LINK.connect(linkMegaHolder).transfer(dsa.address, MAKER_INITIAL_LINK)

    expect(await contracts.LINK.balanceOf(dsa.address)).to.be.equal(MAKER_INITIAL_LINK)

    await hre.network.provider.request({
      method: 'hardhat_stopImpersonatingAccount',
      params: [hre.network.config.LINKHolder],
    })

    vaultId = await createCDP(user, dsa, 'LINK-A')

    // Get spells
    spells = await getAutoLiquidationSpells(
      vaultId,
      connectors.ConnectorAutoLiquidate,
      conditions.ConditionMakerVaultUnsafe,
      hre.network.config.LINK,
    )
  })

  it('#1: DSA authorizes Gelato to cast spells.', async function () {
    const addAuthData = await contracts.ConnectAuth.populateTransaction.add(contracts.GelatoCore.address)
    await dsa.cast([hre.network.config.ConnectAuth], [addAuthData.data!], await user.getAddress())
    expect(await dsa.isAuth(contracts.GelatoCore.address)).to.be.true
  })

  // User submits the auto liquidation task if collateralization ratio
  // goes lower than the target specified.
  // So in this case if the maker vault go to the unsafe area
  // the auto liquidation task will be executed and the vault
  // will be repaid with the vault collateral using flash loans
  it('#2: User submits automated Auto Liquidation task to Gelato via DSA', async function () {
    const getMockPrice = await contracts.PriceOracleResolver.populateTransaction.getMockPrice(addresses.user)
    const conditionMakerVaultUnsafeObj = new GelatoCoreLib.Condition({
      inst: conditions.ConditionMakerVaultUnsafe.address,
      data: await conditions.ConditionMakerVaultUnsafe.getConditionData(
        vaultId,
        contracts.PriceOracleResolver.address,
        getMockPrice.data!,
        MIN_COL_RATIO_MAKER,
      ),
    })

    // Gelato task setup
    const autoLiquidateIfVaultUnsafe = new GelatoCoreLib.Task({
      conditions: [conditionMakerVaultUnsafeObj],
      actions: spells,
    })

    const gelatoExternalProvider = new GelatoCoreLib.GelatoProvider({
      addr: await gelatoProvider.getAddress(), // Gelato Provider Address
      module: contracts.ProviderModuleDSA.address, // Gelato DSA module
    })

    const expiryDate = 0

    const submitTask = await contracts.GelatoCore.submitTask(
      gelatoExternalProvider,
      autoLiquidateIfVaultUnsafe,
      expiryDate,
    )
    await expect(
      dsa.cast(
        [contracts.ConnectGelato.address], // targets
        [submitTask.data!], // datas
        addresses.user, // origin
        {
          gasLimit: 5000000,
        },
      ),
    ).to.emit(contracts.GelatoCore, 'LogTaskSubmitted')

    taskReceipt = new GelatoCoreLib.TaskReceipt({
      id: await contracts.GelatoCore.currentTaskReceiptId(),
      userProxy: dsa.address,
      provider: gelatoExternalProvider,
      tasks: [autoLiquidateIfVaultUnsafe],
      expiryDate,
    })
  })

  // This test showcases the part which is automatically done by the Gelato Executor Network on mainnet
  // Bots constantly check whether the submitted task is executable (by calling canExec)
  // If the task becomes executable (returns "OK"), the "exec" function will be called
  // which will execute the debt refinancing on behalf of the user
  it('#3: Auto-Liquidate Vault, after the Maker vault became unsafe.', async function () {
    const gelatoGasPrice = await hre.run('fetchGelatoGasPrice')
    expect(gelatoGasPrice).to.be.lte(GAS_PRICE_CEIL)

    await contracts.PriceOracleResolver.setMockPrice(ethers.utils.parseUnits('15', 18))

    expect(
      await contracts.GelatoCore.connect(gelatoExecutor).canExec(taskReceipt, GAS_LIMIT, gelatoGasPrice),
    ).to.be.equal('ConditionNotOk:MakerVaultNotUnsafe')

    // LINK market price went from the current price to 3$
    await contracts.PriceOracleResolver.setMockPrice(ethers.utils.parseUnits('3', 18))

    // And our condition is now OK, meaning we should execute the task
    expect(
      await contracts.GelatoCore.connect(gelatoExecutor).canExec(taskReceipt, GAS_LIMIT, gelatoGasPrice),
    ).to.be.equal('OK')

    const debtOnMakerBefore = await contracts.MakerResolver.getMakerVaultDebt(vaultId)
    const route = await getInstaPoolV2Route(contracts.DAI.address, debtOnMakerBefore, contracts.InstaPoolResolver)

    const gasCost = await getAutoLiquidationGasCostByRoute(route!, 'LINK-A')
    const gasFeesPaid = ethers.BigNumber.from(gasCost).mul(gelatoGasPrice)

    const linkAddressUsedOnUniswap = contracts.LINK.address
    const wEthAddressUsedOnUniswap = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    const [spentLinkToPayFlashLoan] = await contracts.UniswapV2Router.getAmountsIn(MAKER_INITIAL_DEBT, [
      wEthAddressUsedOnUniswap,
      contracts.DAI.address,
    ])

    const [spentLinkToPayGasFees] = await contracts.UniswapV2Router.getAmountsIn(gasFeesPaid, [
      linkAddressUsedOnUniswap,
      wEthAddressUsedOnUniswap,
    ])

    const providerLinkBalanceBeforeExecution = await contracts.LINK.balanceOf(addresses.gelatoProvider)
    expect(providerLinkBalanceBeforeExecution).to.be.equal(ethers.constants.Zero)

    // The executor will execute the user's task to auto liquidate the vault
    await expect(
      contracts.GelatoCore.connect(gelatoExecutor).exec(taskReceipt, {
        gasPrice: gelatoGasPrice, // Executor must use gelatoGasPrice (Chainlink fast gwei)
        gasLimit: GAS_LIMIT,
      }),
    ).to.emit(contracts.GelatoCore, 'LogExecSuccess')

    const cdps = await contracts.GetCDPs.getCdpsAsc(contracts.DssCdpManager.address, dsa.address)
    expect(cdps.ids[0]).to.equal(vaultId)

    const providerLinkBalanceAfterExecution = await contracts.LINK.balanceOf(addresses.gelatoProvider)
    // Provider should have has balance the correspondent amount of gas fees paid in LINK
    expect(providerLinkBalanceAfterExecution).to.be.equal(spentLinkToPayGasFees)

    const collateralOnMakerOnVaultAfter = await contracts.MakerResolver.getMakerVaultCollateralBalance(vaultId) // in Ether.
    const debtOnMakerOnVaultAfter = await contracts.MakerResolver.getMakerVaultDebt(vaultId)

    // CDP should be empty.
    expect(collateralOnMakerOnVaultAfter).to.be.equal(ethers.constants.Zero)
    expect(debtOnMakerOnVaultAfter).to.be.equal(ethers.constants.Zero)

    // DAI balance should be the same
    expect(await contracts.DAI.balanceOf(dsa.address)).to.be.equal(MAKER_INITIAL_DEBT)

    const spentEthToPayFlashLoanWithSlipagge = spentLinkToPayFlashLoan.add(spentLinkToPayFlashLoan.div(50)) // 2% slippage

    // Link balance should be greater than the max paid for the flash loan (2%) minus the link spent to pay debt minus fees+gas paid to gelato
    expect(await ethers.provider.getBalance(dsa.address)).to.be.gt(
      MAKER_INITIAL_LINK.sub(spentEthToPayFlashLoanWithSlipagge).sub(gasFeesPaid),
    )
  })
})
