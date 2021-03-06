/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, PayableOverrides, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface IConnectInstaPoolV2Interface extends ethers.utils.Interface {
  functions: {
    'flashBorrowAndCast(address,uint256,uint256,bytes)': FunctionFragment
    'flashPayback(address,uint256,uint256,uint256)': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'flashBorrowAndCast',
    values: [string, BigNumberish, BigNumberish, BytesLike],
  ): string
  encodeFunctionData(
    functionFragment: 'flashPayback',
    values: [string, BigNumberish, BigNumberish, BigNumberish],
  ): string

  decodeFunctionResult(functionFragment: 'flashBorrowAndCast', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'flashPayback', data: BytesLike): Result

  events: {}
}

export class IConnectInstaPoolV2 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: IConnectInstaPoolV2Interface

  functions: {
    flashBorrowAndCast(
      token: string,
      amt: BigNumberish,
      route: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>

    'flashBorrowAndCast(address,uint256,uint256,bytes)'(
      token: string,
      amt: BigNumberish,
      route: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>

    flashPayback(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>

    'flashPayback(address,uint256,uint256,uint256)'(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>
  }

  flashBorrowAndCast(
    token: string,
    amt: BigNumberish,
    route: BigNumberish,
    data: BytesLike,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  'flashBorrowAndCast(address,uint256,uint256,bytes)'(
    token: string,
    amt: BigNumberish,
    route: BigNumberish,
    data: BytesLike,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  flashPayback(
    token: string,
    amt: BigNumberish,
    getId: BigNumberish,
    setId: BigNumberish,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  'flashPayback(address,uint256,uint256,uint256)'(
    token: string,
    amt: BigNumberish,
    getId: BigNumberish,
    setId: BigNumberish,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  callStatic: {
    flashBorrowAndCast(
      token: string,
      amt: BigNumberish,
      route: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>

    'flashBorrowAndCast(address,uint256,uint256,bytes)'(
      token: string,
      amt: BigNumberish,
      route: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>

    flashPayback(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>

    'flashPayback(address,uint256,uint256,uint256)'(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>
  }

  filters: {}

  estimateGas: {
    flashBorrowAndCast(
      token: string,
      amt: BigNumberish,
      route: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>

    'flashBorrowAndCast(address,uint256,uint256,bytes)'(
      token: string,
      amt: BigNumberish,
      route: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>

    flashPayback(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>

    'flashPayback(address,uint256,uint256,uint256)'(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>
  }

  populateTransaction: {
    flashBorrowAndCast(
      token: string,
      amt: BigNumberish,
      route: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>

    'flashBorrowAndCast(address,uint256,uint256,bytes)'(
      token: string,
      amt: BigNumberish,
      route: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>

    flashPayback(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>

    'flashPayback(address,uint256,uint256,uint256)'(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>
  }
}
