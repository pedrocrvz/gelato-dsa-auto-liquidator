/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
const hre = require('hardhat')
const { ethers } = hre

import { expect } from 'chai'
import { BigNumber, Signer } from 'ethers'
import { GAS_LIMIT } from '../../utils/constants'
import { MockAutoLiquidationExecutor, PriceOracleResolver } from '../../../types/compiled'
import { GelatoCore } from '../../../types/deployed'

export const executeMockAutoLiquidation = async (
  GelatoCore: GelatoCore,
  MockAutoLiquidationExecutor: MockAutoLiquidationExecutor,
  PriceOracleResolver: PriceOracleResolver,
  mockRoute: number,
  gelatoExecutor: Signer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  taskReceipt: any,
  gelatoGasPrice: BigNumber,
  token: string,
): Promise<void> => {
  if (token === 'ETH-A') {
    await PriceOracleResolver.setMockPrice(ethers.utils.parseUnits('400', 18))

    expect(
      await MockAutoLiquidationExecutor.connect(gelatoExecutor).canExec(taskReceipt, GAS_LIMIT, gelatoGasPrice),
    ).to.be.equal('ConditionNotOk:MakerVaultNotUnsafe')

    await PriceOracleResolver.setMockPrice(ethers.utils.parseUnits('250', 18))

    expect(
      await MockAutoLiquidationExecutor.connect(gelatoExecutor).canExec(taskReceipt, GAS_LIMIT, gelatoGasPrice),
    ).to.be.equal('OK')
  } else {
    await PriceOracleResolver.setMockPrice(ethers.utils.parseUnits('15000', 18))

    expect(
      await MockAutoLiquidationExecutor.connect(gelatoExecutor).canExec(taskReceipt, GAS_LIMIT, gelatoGasPrice),
    ).to.be.equal('ConditionNotOk:MakerVaultNotUnsafe')

    await PriceOracleResolver.setMockPrice(ethers.utils.parseUnits('5000', 18))

    expect(
      await MockAutoLiquidationExecutor.connect(gelatoExecutor).canExec(taskReceipt, GAS_LIMIT, gelatoGasPrice),
    ).to.be.equal('OK')
  }
  if (mockRoute === 0) {
    if (token === 'ETH-A')
      await expect(
        MockAutoLiquidationExecutor.connect(gelatoExecutor).execViaRoute0(taskReceipt, {
          gasPrice: gelatoGasPrice, // Executor must use gelatoGasPrice (Chainlink fast gwei)
          gasLimit: GAS_LIMIT,
        }),
      ).to.emit(GelatoCore, 'LogExecSuccess')
    else
      await expect(
        MockAutoLiquidationExecutor.connect(gelatoExecutor).execViaRoute0AndPayGasWithToken(taskReceipt, {
          gasPrice: gelatoGasPrice, // Executor must use gelatoGasPrice (Chainlink fast gwei)
          gasLimit: GAS_LIMIT,
        }),
      ).to.emit(GelatoCore, 'LogExecSuccess')
  } else if (mockRoute === 1) {
    if (token === 'ETH-A')
      await expect(
        MockAutoLiquidationExecutor.connect(gelatoExecutor).execViaRoute1(taskReceipt, {
          gasPrice: gelatoGasPrice, // Executor must use gelatoGasPrice (Chainlink fast gwei)
          gasLimit: GAS_LIMIT,
        }),
      ).to.emit(GelatoCore, 'LogExecSuccess')
    else
      await expect(
        MockAutoLiquidationExecutor.connect(gelatoExecutor).execViaRoute1AndPayGasWithToken(taskReceipt, {
          gasPrice: gelatoGasPrice, // Executor must use gelatoGasPrice (Chainlink fast gwei)
          gasLimit: GAS_LIMIT,
        }),
      ).to.emit(GelatoCore, 'LogExecSuccess')
  } else if (mockRoute === 2) {
    if (token === 'ETH-A')
      await expect(
        MockAutoLiquidationExecutor.connect(gelatoExecutor).execViaRoute2(taskReceipt, {
          gasPrice: gelatoGasPrice, // Executor must use gelatoGasPrice (Chainlink fast gwei)
          gasLimit: GAS_LIMIT,
        }),
      ).to.emit(GelatoCore, 'LogExecSuccess')
    else
      await expect(
        MockAutoLiquidationExecutor.connect(gelatoExecutor).execViaRoute2AndPayGasWithToken(taskReceipt, {
          gasPrice: gelatoGasPrice, // Executor must use gelatoGasPrice (Chainlink fast gwei)
          gasLimit: GAS_LIMIT,
        }),
      ).to.emit(GelatoCore, 'LogExecSuccess')
  } else if (mockRoute === 3) {
    if (token === 'ETH-A')
      await expect(
        MockAutoLiquidationExecutor.connect(gelatoExecutor).execViaRoute3(taskReceipt, {
          gasPrice: gelatoGasPrice, // Executor must use gelatoGasPrice (Chainlink fast gwei)
          gasLimit: GAS_LIMIT,
        }),
      ).to.emit(GelatoCore, 'LogExecSuccess')
    else
      await expect(
        MockAutoLiquidationExecutor.connect(gelatoExecutor).execViaRoute3AndPayGasWithToken(taskReceipt, {
          gasPrice: gelatoGasPrice, // Executor must use gelatoGasPrice (Chainlink fast gwei)
          gasLimit: GAS_LIMIT,
        }),
      ).to.emit(GelatoCore, 'LogExecSuccess')
  } else {
    throw new Error('Invalid mockRoute')
  }
}
