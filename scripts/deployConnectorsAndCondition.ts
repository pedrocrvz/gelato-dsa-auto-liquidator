/* eslint-disable @typescript-eslint/no-var-requires */
const hre = require('hardhat')
const { ethers } = hre

import { expect } from 'chai'
import { getMainnetDeployedContracts } from '../test/utils/contracts'

async function main() {
  const signers = await ethers.getSigners()
  const deployer = signers[0]
  const gelatoProvider = signers[1]

  const { InstaConnectors } = getMainnetDeployedContracts(deployer)

  const gelatoProviderAddress = await gelatoProvider.getAddress()
  const connectorLength = await InstaConnectors.connectorLength()

  await hre.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [hre.network.config.InstaMaster],
  })

  const instaMaster = await ethers.provider.getSigner(hre.network.config.InstaMaster)

  console.log('Deploying ConnectGelatoProviderPayment...')
  const connectGelatoProviderPayment_ConnectorId = connectorLength.add(1)
  const ConnectGelatoProviderPaymentContract = await ethers.getContractFactory('ConnectGelatoProviderPayment')
  const ConnectGelatoProviderPayment = await ConnectGelatoProviderPaymentContract.deploy(
    connectGelatoProviderPayment_ConnectorId,
    gelatoProviderAddress,
  )
  await ConnectGelatoProviderPayment.deployed()

  await InstaConnectors.connect(instaMaster).enable(ConnectGelatoProviderPayment.address)

  console.log('Deploying ConnectorAutoLiquidate...')
  const connectorAutoLiquidate_ConnectorId = connectGelatoProviderPayment_ConnectorId.add(1)
  const ConnectorAutoLiquidateContract = await ethers.getContractFactory('ConnectorAutoLiquidate')
  const ConnectorAutoLiquidate = await ConnectorAutoLiquidateContract.deploy(
    connectorAutoLiquidate_ConnectorId,
    ConnectGelatoProviderPayment.address,
  )
  await ConnectorAutoLiquidate.deployed()

  await InstaConnectors.connect(instaMaster).enable(ConnectorAutoLiquidate.address)

  expect(await InstaConnectors.isConnector([ConnectorAutoLiquidate.address, ConnectGelatoProviderPayment.address])).to
    .be.true

  await hre.network.provider.request({
    method: 'hardhat_stopImpersonatingAccount',
    params: [await instaMaster.getAddress()],
  })

  const ConditionMakerVaultUnsafeContract = await ethers.getContractFactory('ConditionMakerVaultUnsafe')
  const ConditionMakerVaultUnsafe = await ConditionMakerVaultUnsafeContract.deploy()
  await ConditionMakerVaultUnsafe.deployed()

  const data = {
    ConnectGelatoProviderPayment: ConnectGelatoProviderPayment.address,
    ConnectorAutoLiquidate: ConnectorAutoLiquidate.address,
    ConditionMakerVaultUnsafe: ConditionMakerVaultUnsafe.address,
  }
  const outputLocation = require('path').resolve(__dirname, '../app/services/gelato/deployed.json')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  require('fs').writeFileSync(outputLocation, JSON.stringify(data), function (err: any) {
    if (err) {
      console.log(err)
    } else {
      console.log('JSON saved to ' + outputLocation)
    }
  })

  console.log('Deployed ConnectGelatoProviderPayment to address: ', ConnectGelatoProviderPayment.address)
  console.log('Deployed ConnectorAutoLiquidate to address: ', ConnectorAutoLiquidate.address)
  console.log('Deployed ConditionMakerVaultUnsafe to address: ', ConditionMakerVaultUnsafe.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
