/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai')
const hre = require('hardhat')
const { deployments, ethers } = hre
const GelatoCoreLib = require('@gelatonetwork/core')

import { BigNumber, Signer, Wallet } from 'ethers'
import { addProviderModules, provideFunds, providerAssignsExecutor } from '../helpers/gelato'
import { deployConditions, deployMocks, IConditions, IMocks } from '../utils/fixtures'
import { getAccounts, getMainnetDeployedContracts, IContracts } from '../utils/contracts'
import { createFixtureLoader } from 'ethereum-waffle'
import { createDSA } from '../helpers/instaDapp'
import createCDP from '../helpers/maker/createCDP'
import { getMockAutoLiquidationSpells } from './spells'
import { ETH, GAS_PRICE_CEIL, MAKER_INITIAL_WBTC, MIN_COL_RATIO_MAKER } from '../utils/constants'
import { DSA } from '../../types/deployed'
import { executeMockAutoLiquidation } from './executors'

interface IAddresses {
  user: string
  gelatoProvider: string
  gelatoExecutor: string
}

/**
 *  Last run gas-reporter:
 *    ETH:
 *      - Route 0: 1148384 GAS
 *      - Route 1: 1612822 GAS
 *      - Route 2: 2399110 GAS
 *      - Route 3: 2669343 GAS
 *
 *    ERC20:
 *      - Route 0: 1158400 GAS
 *      - Route 1: 1627774 GAS
 *      - Route 2: 2408967 GAS
 *      - Route 3: 2679359 GAS
 */

describe('Gas Measurements: AutoLiquidation', function () {
  this.timeout(0)
  if (hre.network.name !== 'hardhat') {
    console.error('Test Suite is meant to be run on hardhat only')
    process.exit(1)
  }

  let conditionMakerVaultUnsafeObj
  let autoLiquidateIfVaultUnsafe: any
  let gelatoExternalProviderObject: any

  const expiryDate = 0

  let gelatoGasPrice: BigNumber

  let addresses: IAddresses
  let user: Signer
  let gelatoProvider: Signer
  let gelatoExecutor: Signer

  let contracts: IContracts
  let conditions: IConditions
  let mocks: IMocks

  let dsa: DSA
  let vaultId: BigNumber

  let spells: any[]

  let taskReceipt: any
  before(async function () {
    gelatoGasPrice = await hre.run('fetchGelatoGasPrice')
  })

  beforeEach(async function () {
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

    const loadFixture = createFixtureLoader([user, gelatoProvider, gelatoExecutor] as Wallet[], ethers.provider)

    conditions = await loadFixture(deployConditions)
    mocks = await loadFixture(deployMocks)

    // Setup gelato
    await provideFunds(gelatoProvider)
    await providerAssignsExecutor(gelatoProvider, mocks.MockAutoLiquidationExecutor.address)
    await addProviderModules(gelatoProvider)
  })

  describe('Fees paid in ETH Routes', function () {
    let mockRoute = 0

    beforeEach(async function () {
      // Setup DSA
      dsa = await createDSA(user)
      vaultId = await createCDP(user, dsa, 'ETH-A')

      // Get spells
      spells = await getMockAutoLiquidationSpells(
        vaultId,
        mocks.MockConnectorAutoLiquidate,
        conditions.ConditionMakerVaultUnsafe,
        mockRoute,
        ETH,
      )

      expect(gelatoGasPrice).to.be.lte(GAS_PRICE_CEIL)

      const getMockPriceTx = await contracts.PriceOracleResolver.populateTransaction.getMockPrice(addresses.user)
      conditionMakerVaultUnsafeObj = new GelatoCoreLib.Condition({
        inst: conditions.ConditionMakerVaultUnsafe.address,
        data: await conditions.ConditionMakerVaultUnsafe.getConditionData(
          vaultId,
          contracts.PriceOracleResolver.address,
          getMockPriceTx.data!,
          MIN_COL_RATIO_MAKER,
        ),
      })

      autoLiquidateIfVaultUnsafe = new GelatoCoreLib.Task({
        conditions: [conditionMakerVaultUnsafeObj],
        actions: spells,
      })

      gelatoExternalProviderObject = new GelatoCoreLib.GelatoProvider({
        addr: addresses.gelatoProvider, // Gelato Provider Address
        module: contracts.ProviderModuleDSA.address, // Gelato DSA module
      })

      const authGelato = await contracts.ConnectAuth.populateTransaction.add(contracts.GelatoCore.address)
      await dsa.cast([hre.network.config.ConnectAuth], [authGelato.data!], addresses.user)

      expect(await dsa.isAuth(contracts.GelatoCore.address)).to.be.true
    })

    // Increment mockRoute in between tests
    afterEach(function () {
      mockRoute = mockRoute === 4 ? 0 : mockRoute + 1
    })

    it('[ETH] #1: Execute Auto Liquidation via route 0', async function () {
      expect(mockRoute, 'mockRoute mismatch').to.be.equal(0)

      // Gelato task setup
      const submitTask = await contracts.ConnectGelato.populateTransaction.submitTask(
        gelatoExternalProviderObject,
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
        provider: gelatoExternalProviderObject,
        tasks: [autoLiquidateIfVaultUnsafe],
        expiryDate,
      })

      await executeMockAutoLiquidation(
        contracts.GelatoCore,
        mocks.MockAutoLiquidationExecutor,
        contracts.PriceOracleResolver,
        mockRoute,
        gelatoExecutor,
        taskReceipt,
        gelatoGasPrice,
        'ETH-A',
      )
    })

    it('[ETH] #2: Execute Auto Liquidation via route 1', async function () {
      expect(mockRoute, 'mockRoute mismatch').to.be.equal(1)

      // Gelato task setup
      const submitTask = await contracts.ConnectGelato.populateTransaction.submitTask(
        gelatoExternalProviderObject,
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
        provider: gelatoExternalProviderObject,
        tasks: [autoLiquidateIfVaultUnsafe],
        expiryDate,
      })

      await executeMockAutoLiquidation(
        contracts.GelatoCore,
        mocks.MockAutoLiquidationExecutor,
        contracts.PriceOracleResolver,
        mockRoute,
        gelatoExecutor,
        taskReceipt,
        gelatoGasPrice,
        'ETH-A',
      )
    })

    it('[ETH] #3: Execute Auto Liquidation via route 2', async function () {
      expect(mockRoute, 'mockRoute mismatch').to.be.equal(2)

      // Gelato task setup
      const submitTask = await contracts.ConnectGelato.populateTransaction.submitTask(
        gelatoExternalProviderObject,
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
        provider: gelatoExternalProviderObject,
        tasks: [autoLiquidateIfVaultUnsafe],
        expiryDate,
      })

      await executeMockAutoLiquidation(
        contracts.GelatoCore,
        mocks.MockAutoLiquidationExecutor,
        contracts.PriceOracleResolver,
        mockRoute,
        gelatoExecutor,
        taskReceipt,
        gelatoGasPrice,
        'ETH-A',
      )
    })

    it('[ETH] #4: Execute Auto Liquidation via route 3', async function () {
      expect(mockRoute, 'mockRoute mismatch').to.be.equal(3)

      // Gelato task setup
      const submitTask = await contracts.ConnectGelato.populateTransaction.submitTask(
        gelatoExternalProviderObject,
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
        provider: gelatoExternalProviderObject,
        tasks: [autoLiquidateIfVaultUnsafe],
        expiryDate,
      })

      await executeMockAutoLiquidation(
        contracts.GelatoCore,
        mocks.MockAutoLiquidationExecutor,
        contracts.PriceOracleResolver,
        mockRoute,
        gelatoExecutor,
        taskReceipt,
        gelatoGasPrice,
        'ETH-A',
      )
    })
  })

  describe('Fees paid in ERC20 Routes', function () {
    let mockRoute = 0

    beforeEach(async function () {
      // Setup DSA
      dsa = await createDSA(user)

      // Snag some wbtc from some holder account (randomly picked among top holders)
      const wbtcMegaHolder = await ethers.provider.getSigner(hre.network.config.WBTCHolder)

      await hre.network.provider.request({
        method: 'hardhat_impersonateAccount',
        params: [hre.network.config.WBTCHolder],
      })

      // Transfer WBTC to dsa
      await contracts.WBTC.connect(wbtcMegaHolder).transfer(dsa.address, MAKER_INITIAL_WBTC)

      expect(await contracts.WBTC.balanceOf(dsa.address)).to.be.equal(MAKER_INITIAL_WBTC)

      await hre.network.provider.request({
        method: 'hardhat_stopImpersonatingAccount',
        params: [hre.network.config.WBTCHolder],
      })

      vaultId = await createCDP(user, dsa, 'WBTC-A')

      // Get spells
      spells = await getMockAutoLiquidationSpells(
        vaultId,
        mocks.MockConnectorAutoLiquidate,
        conditions.ConditionMakerVaultUnsafe,
        mockRoute,
        contracts.WBTC.address,
      )

      expect(gelatoGasPrice).to.be.lte(GAS_PRICE_CEIL)

      const getMockPriceTx = await contracts.PriceOracleResolver.populateTransaction.getMockPrice(addresses.user)
      conditionMakerVaultUnsafeObj = new GelatoCoreLib.Condition({
        inst: conditions.ConditionMakerVaultUnsafe.address,
        data: await conditions.ConditionMakerVaultUnsafe.getConditionData(
          vaultId,
          contracts.PriceOracleResolver.address,
          getMockPriceTx.data!,
          MIN_COL_RATIO_MAKER,
        ),
      })

      autoLiquidateIfVaultUnsafe = new GelatoCoreLib.Task({
        conditions: [conditionMakerVaultUnsafeObj],
        actions: spells,
      })

      gelatoExternalProviderObject = new GelatoCoreLib.GelatoProvider({
        addr: addresses.gelatoProvider, // Gelato Provider Address
        module: contracts.ProviderModuleDSA.address, // Gelato DSA module
      })

      const authGelato = await contracts.ConnectAuth.populateTransaction.add(contracts.GelatoCore.address)
      await dsa.cast([hre.network.config.ConnectAuth], [authGelato.data!], addresses.user)

      expect(await dsa.isAuth(contracts.GelatoCore.address)).to.be.true
    })

    // Increment mockRoute in between tests
    afterEach(function () {
      mockRoute = mockRoute === 4 ? 0 : mockRoute + 1
    })

    it('[ERC20] #1: Execute Auto Liquidation via route 0', async function () {
      expect(mockRoute, 'mockRoute mismatch').to.be.equal(0)

      // Gelato task setup
      const submitTask = await contracts.ConnectGelato.populateTransaction.submitTask(
        gelatoExternalProviderObject,
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
        provider: gelatoExternalProviderObject,
        tasks: [autoLiquidateIfVaultUnsafe],
        expiryDate,
      })

      await executeMockAutoLiquidation(
        contracts.GelatoCore,
        mocks.MockAutoLiquidationExecutor,
        contracts.PriceOracleResolver,
        mockRoute,
        gelatoExecutor,
        taskReceipt,
        gelatoGasPrice,
        'WBTC-A',
      )
    })

    it('[ERC20] #2: Execute Auto Liquidation via route 1', async function () {
      expect(mockRoute, 'mockRoute mismatch').to.be.equal(1)

      // Gelato task setup
      const submitTask = await contracts.ConnectGelato.populateTransaction.submitTask(
        gelatoExternalProviderObject,
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
        provider: gelatoExternalProviderObject,
        tasks: [autoLiquidateIfVaultUnsafe],
        expiryDate,
      })

      await executeMockAutoLiquidation(
        contracts.GelatoCore,
        mocks.MockAutoLiquidationExecutor,
        contracts.PriceOracleResolver,
        mockRoute,
        gelatoExecutor,
        taskReceipt,
        gelatoGasPrice,
        'WBTC-A',
      )
    })

    it('[ERC20] #3: Execute Auto Liquidation via route 2', async function () {
      expect(mockRoute, 'mockRoute mismatch').to.be.equal(2)

      // Gelato task setup
      const submitTask = await contracts.ConnectGelato.populateTransaction.submitTask(
        gelatoExternalProviderObject,
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
        provider: gelatoExternalProviderObject,
        tasks: [autoLiquidateIfVaultUnsafe],
        expiryDate,
      })

      await executeMockAutoLiquidation(
        contracts.GelatoCore,
        mocks.MockAutoLiquidationExecutor,
        contracts.PriceOracleResolver,
        mockRoute,
        gelatoExecutor,
        taskReceipt,
        gelatoGasPrice,
        'WBTC-A',
      )
    })

    it('#4: Execute Auto Liquidation via route 3', async function () {
      expect(mockRoute, 'mockRoute mismatch').to.be.equal(3)

      // Gelato task setup
      const submitTask = await contracts.ConnectGelato.populateTransaction.submitTask(
        gelatoExternalProviderObject,
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
        provider: gelatoExternalProviderObject,
        tasks: [autoLiquidateIfVaultUnsafe],
        expiryDate,
      })

      await executeMockAutoLiquidation(
        contracts.GelatoCore,
        mocks.MockAutoLiquidationExecutor,
        contracts.PriceOracleResolver,
        mockRoute,
        gelatoExecutor,
        taskReceipt,
        gelatoGasPrice,
        'WBTC-A',
      )
    })
  })
})
