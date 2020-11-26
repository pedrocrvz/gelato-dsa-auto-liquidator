/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface IndexInterfaceInterface extends ethers.utils.Interface {
  functions: {
    'connectors(uint256)': FunctionFragment
    'list()': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'connectors', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'list', values?: undefined): string

  decodeFunctionResult(functionFragment: 'connectors', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'list', data: BytesLike): Result

  events: {}
}

export class IndexInterface extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: IndexInterfaceInterface

  functions: {
    connectors(
      version: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'connectors(uint256)'(
      version: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    list(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'list()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>
  }

  connectors(version: BigNumberish, overrides?: CallOverrides): Promise<string>

  'connectors(uint256)'(version: BigNumberish, overrides?: CallOverrides): Promise<string>

  list(overrides?: CallOverrides): Promise<string>

  'list()'(overrides?: CallOverrides): Promise<string>

  callStatic: {
    connectors(version: BigNumberish, overrides?: CallOverrides): Promise<string>

    'connectors(uint256)'(version: BigNumberish, overrides?: CallOverrides): Promise<string>

    list(overrides?: CallOverrides): Promise<string>

    'list()'(overrides?: CallOverrides): Promise<string>
  }

  filters: {}

  estimateGas: {
    connectors(version: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'connectors(uint256)'(version: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    list(overrides?: CallOverrides): Promise<BigNumber>

    'list()'(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    connectors(version: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'connectors(uint256)'(version: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    list(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'list()'(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}