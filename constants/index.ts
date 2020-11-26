import { ContractInterface } from 'ethers'

import mainnetDeployedAddresses from './addresses'

import ConnectAuth from './abis/ConnectAuth.json'
import ConnectBasic from './abis/ConnectBasic.json'
import ConnectGelatoProviderPayment from './abis/ConnectGelatoProviderPayment.json'
import DSA from './abis/DSA.json'
import GelatoCore from './abis/GelatoCore.json'
import GelatoGasPriceOracle from './abis/GelatoGasPriceOracle.json'
import InstaAccount from './abis/InstaAccount.json'
import InstaConnectors from './abis/InstaConnectors.json'
import InstaIndex from './abis/InstaIndex.json'
import InstaList from './abis/InstaList.json'
import ProviderModuleDSA from './abis/ProviderModuleDSA.json'
import ConnectMaker from './abis/ConnectMaker.json'
import IERC20 from './abis/IERC20.json'
import GetCDPs from './abis/GetCDPs.json'
import DssCdpManager from './abis/DssCdpManager.json'
import ConnectGelato from './abis/ConnectGelato.json'
import ConnectOasis from './abis/ConnectOasis.json'
import MakerResolver from './abis/MakerResolver.json'
import Oasis from './abis/Oasis.json'
import PriceOracleResolver from './abis/PriceOracleResolver.json'
import InstaPoolResolver from './abis/InstaPoolResolver.json'
import UniswapV2Router from './abis/UniswapV2Router.json'

export { mainnetDeployedAddresses }

export interface IABIs {
  ConnectAuth: ContractInterface
  ConnectBasic: ContractInterface
  ConnectGelatoProviderPayment: ContractInterface
  DSA: ContractInterface
  GelatoCore: ContractInterface
  GelatoGasPriceOracle: ContractInterface
  InstaAccount: ContractInterface
  InstaConnectors: ContractInterface
  InstaIndex: ContractInterface
  InstaList: ContractInterface
  ProviderModuleDSA: ContractInterface
  ConnectMaker: ContractInterface
  IERC20: ContractInterface
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  GetCDPs: any
  DssCdpManager: ContractInterface
  ConnectGelato: ContractInterface
  ConnectOasis: ContractInterface
  MakerResolver: ContractInterface
  Oasis: ContractInterface
  PriceOracleResolver: ContractInterface
  InstaPoolResolver: ContractInterface
  UniswapV2Router: ContractInterface
}

export const ABIs: IABIs = {
  ConnectAuth,
  ConnectBasic,
  ConnectGelatoProviderPayment,
  DSA,
  GelatoCore,
  GelatoGasPriceOracle,
  InstaAccount,
  InstaConnectors,
  InstaIndex,
  InstaList,
  ProviderModuleDSA,
  ConnectMaker,
  IERC20,
  GetCDPs,
  DssCdpManager,
  ConnectGelato,
  ConnectOasis,
  MakerResolver,
  Oasis,
  PriceOracleResolver,
  InstaPoolResolver,
  UniswapV2Router,
}
