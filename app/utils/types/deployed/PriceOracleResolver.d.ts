/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, Overrides, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface PriceOracleResolverInterface extends ethers.utils.Interface {
  functions: {
    'addOracle(string,address,bytes)': FunctionFragment
    'getMockPrice(address)': FunctionFragment
    'getPrice(string)': FunctionFragment
    'isOwner()': FunctionFragment
    'mockPrice(address)': FunctionFragment
    'oracle(string)': FunctionFragment
    'oraclePayload(string)': FunctionFragment
    'owner()': FunctionFragment
    'renounceOwnership()': FunctionFragment
    'setMockPrice(uint256)': FunctionFragment
    'transferOwnership(address)': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'addOracle', values: [string, string, BytesLike]): string
  encodeFunctionData(functionFragment: 'getMockPrice', values: [string]): string
  encodeFunctionData(functionFragment: 'getPrice', values: [string]): string
  encodeFunctionData(functionFragment: 'isOwner', values?: undefined): string
  encodeFunctionData(functionFragment: 'mockPrice', values: [string]): string
  encodeFunctionData(functionFragment: 'oracle', values: [string]): string
  encodeFunctionData(functionFragment: 'oraclePayload', values: [string]): string
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string
  encodeFunctionData(functionFragment: 'renounceOwnership', values?: undefined): string
  encodeFunctionData(functionFragment: 'setMockPrice', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'transferOwnership', values: [string]): string

  decodeFunctionResult(functionFragment: 'addOracle', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getMockPrice', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getPrice', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isOwner', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'mockPrice', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'oracle', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'oraclePayload', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'renounceOwnership', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setMockPrice', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'transferOwnership', data: BytesLike): Result

  events: {
    'OwnershipTransferred(address,address)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment
}

export class PriceOracleResolver extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: PriceOracleResolverInterface

  functions: {
    addOracle(
      _oracle: string,
      _oracleAddress: string,
      _oraclePayload: BytesLike,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'addOracle(string,address,bytes)'(
      _oracle: string,
      _oracleAddress: string,
      _oraclePayload: BytesLike,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    getMockPrice(
      _tester: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    'getMockPrice(address)'(
      _tester: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    getPrice(
      _oracle: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    'getPrice(string)'(
      _oracle: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    isOwner(
      overrides?: CallOverrides,
    ): Promise<{
      0: boolean
    }>

    'isOwner()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: boolean
    }>

    mockPrice(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    'mockPrice(address)'(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    oracle(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'oracle(string)'(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    oraclePayload(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'oraclePayload(string)'(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    owner(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'owner()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>

    'renounceOwnership()'(overrides?: Overrides): Promise<ContractTransaction>

    setMockPrice(_mockPrice: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    'setMockPrice(uint256)'(_mockPrice: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    transferOwnership(newOwner: string, overrides?: Overrides): Promise<ContractTransaction>

    'transferOwnership(address)'(newOwner: string, overrides?: Overrides): Promise<ContractTransaction>
  }

  addOracle(
    _oracle: string,
    _oracleAddress: string,
    _oraclePayload: BytesLike,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'addOracle(string,address,bytes)'(
    _oracle: string,
    _oracleAddress: string,
    _oraclePayload: BytesLike,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  getMockPrice(_tester: string, overrides?: CallOverrides): Promise<BigNumber>

  'getMockPrice(address)'(_tester: string, overrides?: CallOverrides): Promise<BigNumber>

  getPrice(_oracle: string, overrides?: CallOverrides): Promise<BigNumber>

  'getPrice(string)'(_oracle: string, overrides?: CallOverrides): Promise<BigNumber>

  isOwner(overrides?: CallOverrides): Promise<boolean>

  'isOwner()'(overrides?: CallOverrides): Promise<boolean>

  mockPrice(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

  'mockPrice(address)'(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

  oracle(arg0: string, overrides?: CallOverrides): Promise<string>

  'oracle(string)'(arg0: string, overrides?: CallOverrides): Promise<string>

  oraclePayload(arg0: string, overrides?: CallOverrides): Promise<string>

  'oraclePayload(string)'(arg0: string, overrides?: CallOverrides): Promise<string>

  owner(overrides?: CallOverrides): Promise<string>

  'owner()'(overrides?: CallOverrides): Promise<string>

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>

  'renounceOwnership()'(overrides?: Overrides): Promise<ContractTransaction>

  setMockPrice(_mockPrice: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  'setMockPrice(uint256)'(_mockPrice: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  transferOwnership(newOwner: string, overrides?: Overrides): Promise<ContractTransaction>

  'transferOwnership(address)'(newOwner: string, overrides?: Overrides): Promise<ContractTransaction>

  callStatic: {
    addOracle(
      _oracle: string,
      _oracleAddress: string,
      _oraclePayload: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>

    'addOracle(string,address,bytes)'(
      _oracle: string,
      _oracleAddress: string,
      _oraclePayload: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>

    getMockPrice(_tester: string, overrides?: CallOverrides): Promise<BigNumber>

    'getMockPrice(address)'(_tester: string, overrides?: CallOverrides): Promise<BigNumber>

    getPrice(_oracle: string, overrides?: CallOverrides): Promise<BigNumber>

    'getPrice(string)'(_oracle: string, overrides?: CallOverrides): Promise<BigNumber>

    isOwner(overrides?: CallOverrides): Promise<boolean>

    'isOwner()'(overrides?: CallOverrides): Promise<boolean>

    mockPrice(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    'mockPrice(address)'(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    oracle(arg0: string, overrides?: CallOverrides): Promise<string>

    'oracle(string)'(arg0: string, overrides?: CallOverrides): Promise<string>

    oraclePayload(arg0: string, overrides?: CallOverrides): Promise<string>

    'oraclePayload(string)'(arg0: string, overrides?: CallOverrides): Promise<string>

    owner(overrides?: CallOverrides): Promise<string>

    'owner()'(overrides?: CallOverrides): Promise<string>

    renounceOwnership(overrides?: CallOverrides): Promise<void>

    'renounceOwnership()'(overrides?: CallOverrides): Promise<void>

    setMockPrice(_mockPrice: BigNumberish, overrides?: CallOverrides): Promise<void>

    'setMockPrice(uint256)'(_mockPrice: BigNumberish, overrides?: CallOverrides): Promise<void>

    transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>

    'transferOwnership(address)'(newOwner: string, overrides?: CallOverrides): Promise<void>
  }

  filters: {
    OwnershipTransferred(previousOwner: string | null, newOwner: string | null): EventFilter
  }

  estimateGas: {
    addOracle(
      _oracle: string,
      _oracleAddress: string,
      _oraclePayload: BytesLike,
      overrides?: Overrides,
    ): Promise<BigNumber>

    'addOracle(string,address,bytes)'(
      _oracle: string,
      _oracleAddress: string,
      _oraclePayload: BytesLike,
      overrides?: Overrides,
    ): Promise<BigNumber>

    getMockPrice(_tester: string, overrides?: CallOverrides): Promise<BigNumber>

    'getMockPrice(address)'(_tester: string, overrides?: CallOverrides): Promise<BigNumber>

    getPrice(_oracle: string, overrides?: CallOverrides): Promise<BigNumber>

    'getPrice(string)'(_oracle: string, overrides?: CallOverrides): Promise<BigNumber>

    isOwner(overrides?: CallOverrides): Promise<BigNumber>

    'isOwner()'(overrides?: CallOverrides): Promise<BigNumber>

    mockPrice(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    'mockPrice(address)'(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    oracle(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    'oracle(string)'(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    oraclePayload(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    'oraclePayload(string)'(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    owner(overrides?: CallOverrides): Promise<BigNumber>

    'owner()'(overrides?: CallOverrides): Promise<BigNumber>

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>

    'renounceOwnership()'(overrides?: Overrides): Promise<BigNumber>

    setMockPrice(_mockPrice: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    'setMockPrice(uint256)'(_mockPrice: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    transferOwnership(newOwner: string, overrides?: Overrides): Promise<BigNumber>

    'transferOwnership(address)'(newOwner: string, overrides?: Overrides): Promise<BigNumber>
  }

  populateTransaction: {
    addOracle(
      _oracle: string,
      _oracleAddress: string,
      _oraclePayload: BytesLike,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'addOracle(string,address,bytes)'(
      _oracle: string,
      _oracleAddress: string,
      _oraclePayload: BytesLike,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    getMockPrice(_tester: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'getMockPrice(address)'(_tester: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    getPrice(_oracle: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'getPrice(string)'(_oracle: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    isOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'isOwner()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    mockPrice(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'mockPrice(address)'(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    oracle(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'oracle(string)'(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    oraclePayload(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'oraclePayload(string)'(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'owner()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>

    'renounceOwnership()'(overrides?: Overrides): Promise<PopulatedTransaction>

    setMockPrice(_mockPrice: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    'setMockPrice(uint256)'(_mockPrice: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    transferOwnership(newOwner: string, overrides?: Overrides): Promise<PopulatedTransaction>

    'transferOwnership(address)'(newOwner: string, overrides?: Overrides): Promise<PopulatedTransaction>
  }
}
