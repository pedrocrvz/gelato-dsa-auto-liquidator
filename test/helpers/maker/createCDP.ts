/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai')

import { BigNumber, Signer } from 'ethers'
import { getMainnetDeployedContracts } from '../../utils/contracts'
import { MAKER_INITIAL_ETH, MAKER_INITIAL_DEBT, MAKER_INITIAL_WBTC, MAKER_INITIAL_LINK } from '../../utils/constants'
import { DSA } from '../../../types/deployed'

type CollateralType = 'ETH-A' | 'ETH-B' | 'WBTC-A' | 'LINK-A'

const createCDP = async (signer: Signer, dsa: DSA, collType: CollateralType): Promise<BigNumber> => {
  const { DAI, GetCDPs, DssCdpManager, ConnectMaker } = getMainnetDeployedContracts(signer)
  const signerAddress = await signer.getAddress()

  const openVault = await ConnectMaker.populateTransaction.open(collType)
  await dsa.cast([ConnectMaker.address], [openVault.data!], signerAddress)

  const cdps = await GetCDPs.getCdpsAsc(DssCdpManager.address, dsa.address)
  const vaultId = cdps.ids[0]
  expect(cdps.ids[0].isZero()).to.be.false

  let MAKER_INITIAL_DEPOSIT
  if (collType === 'ETH-A' || collType === 'ETH-B') MAKER_INITIAL_DEPOSIT = MAKER_INITIAL_ETH
  else if (collType === 'WBTC-A') MAKER_INITIAL_DEPOSIT = MAKER_INITIAL_WBTC
  else if (collType === 'LINK-A') MAKER_INITIAL_DEPOSIT = MAKER_INITIAL_LINK
  else throw new Error('Unsupported test collateral type')

  const deposit = await ConnectMaker.populateTransaction.deposit(vaultId, MAKER_INITIAL_DEPOSIT, 0, 0)
  await dsa.cast([ConnectMaker.address], [deposit.data!], signerAddress, {
    value: MAKER_INITIAL_DEPOSIT,
  })

  const borrow = await ConnectMaker.populateTransaction.borrow(vaultId, MAKER_INITIAL_DEBT, 0, 0)
  await dsa.cast([ConnectMaker.address], [borrow.data!], signerAddress)

  expect(await DAI.balanceOf(dsa.address)).to.be.equal(MAKER_INITIAL_DEBT)

  return vaultId
}

export default createCDP
