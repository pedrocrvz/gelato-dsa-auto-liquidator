// eslint-disable-next-line @typescript-eslint/no-var-requires
const hre = require('hardhat')
const { ethers } = hre

import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { mainnetDeployedAddresses } from '../../../constants'

import {
  InstaAccount,
  InstaAccount__factory,
  InstaConnectors,
  InstaConnectors__factory,
  InstaIndex,
  InstaIndex__factory,
  InstaList,
  InstaList__factory,
  GelatoCore,
  GelatoCore__factory,
  GelatoGasPriceOracle,
  GelatoGasPriceOracle__factory,
  ProviderModuleDSA,
  ProviderModuleDSA__factory,
  DSA,
  DSA__factory,
  ConnectAuth,
  ConnectAuth__factory,
  ConnectBasic,
  ConnectBasic__factory,
  ConnectMaker,
  ConnectMaker__factory,
  IERC20,
  IERC20__factory,
  GetCDPs,
  GetCDPs__factory,
  DssCdpManager,
  DssCdpManager__factory,
  ConnectGelato,
  ConnectGelato__factory,
  MakerResolver,
  MakerResolver__factory,
  Oasis,
  Oasis__factory,
  PriceOracleResolver,
  PriceOracleResolver__factory,
  InstaPoolResolver,
  InstaPoolResolver__factory,
  UniswapV2Router,
  UniswapV2Router__factory,
} from '../../../types/deployed'

export interface IContracts {
  InstaAccount: InstaAccount
  InstaConnectors: InstaConnectors
  InstaIndex: InstaIndex
  InstaList: InstaList
  GelatoCore: GelatoCore
  GelatoGasPriceOracle: GelatoGasPriceOracle
  ProviderModuleDSA: ProviderModuleDSA
  ConnectAuth: ConnectAuth
  ConnectBasic: ConnectBasic
  ConnectMaker: ConnectMaker
  DAI: IERC20
  GetCDPs: GetCDPs
  DssCdpManager: DssCdpManager
  ConnectGelato: ConnectGelato
  MakerResolver: MakerResolver
  WBTC: IERC20
  Oasis: Oasis
  PriceOracleResolver: PriceOracleResolver
  InstaPoolResolver: InstaPoolResolver
  UniswapV2Router: UniswapV2Router
  LINK: IERC20
}

export interface IAccounts {
  user: Signer
  gelatoProvider: Signer
  gelatoExecutor: Signer
}

export const getMainnetDeployedContracts = (providerOrSigner: Provider | Signer): IContracts => {
  const GelatoCore = GelatoCore__factory.connect(mainnetDeployedAddresses.GelatoCore, providerOrSigner)
  const GelatoGasPriceOracle = GelatoGasPriceOracle__factory.connect(
    mainnetDeployedAddresses.GelatoGasPriceOracle,
    providerOrSigner,
  )

  const ProviderModuleDSA = ProviderModuleDSA__factory.connect(
    mainnetDeployedAddresses.ProviderModuleDSA,
    providerOrSigner,
  )

  const InstaAccount = InstaAccount__factory.connect(mainnetDeployedAddresses.InstaAccount, providerOrSigner)
  const InstaConnectors = InstaConnectors__factory.connect(mainnetDeployedAddresses.InstaConnectors, providerOrSigner)
  const InstaIndex = InstaIndex__factory.connect(mainnetDeployedAddresses.InstaIndex, providerOrSigner)
  const InstaList = InstaList__factory.connect(mainnetDeployedAddresses.InstaList, providerOrSigner)
  const InstaPoolResolver = InstaPoolResolver__factory.connect(
    mainnetDeployedAddresses.InstaPoolResolver,
    providerOrSigner,
  )

  const ConnectAuth = ConnectAuth__factory.connect(mainnetDeployedAddresses.ConnectAuth, providerOrSigner)
  const ConnectBasic = ConnectBasic__factory.connect(mainnetDeployedAddresses.ConnectBasic, providerOrSigner)
  const ConnectMaker = ConnectMaker__factory.connect(mainnetDeployedAddresses.ConnectMaker, providerOrSigner)
  const ConnectGelato = ConnectGelato__factory.connect(mainnetDeployedAddresses.ConnectGelato, providerOrSigner)

  const DAI = IERC20__factory.connect(mainnetDeployedAddresses.DAI, providerOrSigner)

  const GetCDPs = GetCDPs__factory.connect(mainnetDeployedAddresses.GetCDPs, providerOrSigner)
  const DssCdpManager = DssCdpManager__factory.connect(mainnetDeployedAddresses.DssCdpManager, providerOrSigner)

  const MakerResolver = MakerResolver__factory.connect(mainnetDeployedAddresses.MakerResolver, providerOrSigner)

  const WBTC = IERC20__factory.connect(mainnetDeployedAddresses.WBTC, providerOrSigner)
  const LINK = IERC20__factory.connect(mainnetDeployedAddresses.LINK, providerOrSigner)

  const Oasis = Oasis__factory.connect(mainnetDeployedAddresses.Oasis, providerOrSigner)

  const PriceOracleResolver = PriceOracleResolver__factory.connect(
    mainnetDeployedAddresses.PriceOracleResolver,
    providerOrSigner,
  )

  const UniswapV2Router = UniswapV2Router__factory.connect(mainnetDeployedAddresses.UniswapV2Router, providerOrSigner)

  return {
    GelatoCore,
    GelatoGasPriceOracle,
    InstaAccount,
    InstaConnectors,
    InstaIndex,
    InstaList,
    ProviderModuleDSA,
    ConnectAuth,
    ConnectBasic,
    ConnectMaker,
    DAI,
    GetCDPs,
    DssCdpManager,
    ConnectGelato,
    InstaPoolResolver,
    MakerResolver,
    WBTC,
    Oasis,
    PriceOracleResolver,
    UniswapV2Router,
    LINK,
  }
}

export const getDSA = (providerOrSigner: Provider | Signer, dsaAddress: string): DSA => {
  const DSA = DSA__factory.connect(dsaAddress, providerOrSigner)
  return DSA
}

export const getAccounts = async (): Promise<IAccounts> => {
  const [user, gelatoProvider, gelatoExecutor] = await ethers.getSigners()
  return { user, gelatoProvider, gelatoExecutor }
}
