/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
const GelatoCoreLib = require('@gelatonetwork/core')
const hre = require('hardhat')
const { ethers } = hre

import { expect } from 'chai'
import { BigNumber } from 'ethers'
import { getAccounts, getMainnetDeployedContracts } from '../../utils/contracts'
import { ConnectorAutoLiquidate, ConditionMakerVaultUnsafe } from '../../../types/compiled'

export const getAutoLiquidationSpells = async (
  vaultId: BigNumber,
  ConnectorAutoLiquidate: ConnectorAutoLiquidate,
  ConditionMakerVaultUnsafe: ConditionMakerVaultUnsafe,
  collateralTokenAddress: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<Array<any>> => {
  const { gelatoProvider } = await getAccounts()
  const gelatoProviderAddress = await gelatoProvider.getAddress()
  const { GelatoCore } = getMainnetDeployedContracts(gelatoProvider)
  const spells = []

  const getDataAndCastAutoLiquidation = await ConnectorAutoLiquidate.populateTransaction.getDataAndCastAutoLiquidation(
    vaultId,
    collateralTokenAddress,
  )
  const autoLiquidationSpells = new GelatoCoreLib.Action({
    addr: ConnectorAutoLiquidate.address,
    data: getDataAndCastAutoLiquidation.data!,
    operation: GelatoCoreLib.Operation.Delegatecall,
  })

  spells.push(autoLiquidationSpells)

  const gasPriceCeil = ethers.constants.MaxUint256

  const autoLiquidationTaskSpec = new GelatoCoreLib.TaskSpec({
    conditions: [ConditionMakerVaultUnsafe.address],
    actions: spells,
    gasPriceCeil,
  })

  await expect(GelatoCore.connect(gelatoProvider).provideTaskSpecs([autoLiquidationTaskSpec])).to.emit(
    GelatoCore,
    'LogTaskSpecProvided',
  )

  expect(
    await GelatoCore.connect(gelatoProvider).isTaskSpecProvided(gelatoProviderAddress, autoLiquidationTaskSpec),
  ).to.be.equal('OK')

  expect(
    await GelatoCore.connect(gelatoProviderAddress).taskSpecGasPriceCeil(
      gelatoProviderAddress,
      await GelatoCore.connect(gelatoProvider).hashTaskSpec(autoLiquidationTaskSpec),
    ),
  ).to.be.equal(gasPriceCeil)

  return spells
}
