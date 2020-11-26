/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface HelpersInterface extends ethers.utils.Interface {
  functions: {
    'connectorID()': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'connectorID', values?: undefined): string

  decodeFunctionResult(functionFragment: 'connectorID', data: BytesLike): Result

  events: {}
}

export class Helpers extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: HelpersInterface

  functions: {
    connectorID(
      overrides?: CallOverrides,
    ): Promise<{
      _type: BigNumber
      _id: BigNumber
      0: BigNumber
      1: BigNumber
    }>

    'connectorID()'(
      overrides?: CallOverrides,
    ): Promise<{
      _type: BigNumber
      _id: BigNumber
      0: BigNumber
      1: BigNumber
    }>
  }

  connectorID(
    overrides?: CallOverrides,
  ): Promise<{
    _type: BigNumber
    _id: BigNumber
    0: BigNumber
    1: BigNumber
  }>

  'connectorID()'(
    overrides?: CallOverrides,
  ): Promise<{
    _type: BigNumber
    _id: BigNumber
    0: BigNumber
    1: BigNumber
  }>

  callStatic: {
    connectorID(
      overrides?: CallOverrides,
    ): Promise<{
      _type: BigNumber
      _id: BigNumber
      0: BigNumber
      1: BigNumber
    }>

    'connectorID()'(
      overrides?: CallOverrides,
    ): Promise<{
      _type: BigNumber
      _id: BigNumber
      0: BigNumber
      1: BigNumber
    }>
  }

  filters: {}

  estimateGas: {
    connectorID(overrides?: CallOverrides): Promise<BigNumber>

    'connectorID()'(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    connectorID(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'connectorID()'(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}
