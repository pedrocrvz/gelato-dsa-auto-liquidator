/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai')
const hre = require('hardhat')

import { BigNumber, Signer } from 'ethers'
import { DSA } from '../../../types/deployed/DSA'
import { getMainnetDeployedContracts, getDSA } from '../../utils/contracts'
import { IInstaPoolResolver } from '../../../types/compiled'

export const addGelatoCoreAsDSAAuth = async (user: Signer, dsa: DSA) => {
  const { GelatoCore, ConnectAuth } = getMainnetDeployedContracts(user)

  const addAuthData = await ConnectAuth.populateTransaction.add(GelatoCore.address)
  await dsa.cast([hre.network.config.ConnectAuth], [addAuthData.data!], await user.getAddress())
  expect(await dsa.isAuth(GelatoCore.address)).to.be.true
}

export const createDSA = async (user: Signer): Promise<DSA> => {
  const userAddress = await user.getAddress()
  const { InstaList, InstaIndex } = getMainnetDeployedContracts(user)

  const lastDsaId = await InstaList.accounts()

  // Deploy DSA and get and verify ID of newly deployed DSA
  await expect(InstaIndex.build(userAddress, 1, userAddress)).to.emit(InstaIndex, 'LogAccountCreated')
  await expect(await InstaList.accounts()).to.be.equal(lastDsaId.add(1))
  const dsaId = lastDsaId.add(1)

  // Instantiate the DSA
  const dsaAddress = await InstaList.accountAddr(dsaId)
  const dsa = getDSA(user, dsaAddress)

  return dsa
}

export const getInstaPoolV2Route = async (
  token: string,
  tokenDebtToMove: BigNumber,
  InstaPoolResolver: IInstaPoolResolver,
): Promise<number | undefined> => {
  const rData = await InstaPoolResolver.getTokenLimit(token)

  if (rData.dydx.gt(tokenDebtToMove)) return 0
  if (rData.maker.gt(tokenDebtToMove)) return 1
  if (rData.compound.gt(tokenDebtToMove)) return 2
  if (rData.aave.gt(tokenDebtToMove)) return 3
}
