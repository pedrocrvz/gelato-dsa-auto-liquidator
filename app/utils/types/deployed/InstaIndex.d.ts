/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, Overrides, PayableOverrides, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface InstaIndexInterface extends ethers.utils.Interface {
  functions: {
    'account(uint256)': FunctionFragment
    'addNewAccount(address,address,address)': FunctionFragment
    'build(address,uint256,address)': FunctionFragment
    'buildWithCast(address,uint256,address[],bytes[],address)': FunctionFragment
    'changeCheck(uint256,address)': FunctionFragment
    'changeMaster(address)': FunctionFragment
    'check(uint256)': FunctionFragment
    'connectors(uint256)': FunctionFragment
    'isClone(uint256,address)': FunctionFragment
    'list()': FunctionFragment
    'master()': FunctionFragment
    'setBasics(address,address,address,address)': FunctionFragment
    'updateMaster()': FunctionFragment
    'versionCount()': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'account', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'addNewAccount', values: [string, string, string]): string
  encodeFunctionData(functionFragment: 'build', values: [string, BigNumberish, string]): string
  encodeFunctionData(
    functionFragment: 'buildWithCast',
    values: [string, BigNumberish, string[], BytesLike[], string],
  ): string
  encodeFunctionData(functionFragment: 'changeCheck', values: [BigNumberish, string]): string
  encodeFunctionData(functionFragment: 'changeMaster', values: [string]): string
  encodeFunctionData(functionFragment: 'check', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'connectors', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'isClone', values: [BigNumberish, string]): string
  encodeFunctionData(functionFragment: 'list', values?: undefined): string
  encodeFunctionData(functionFragment: 'master', values?: undefined): string
  encodeFunctionData(functionFragment: 'setBasics', values: [string, string, string, string]): string
  encodeFunctionData(functionFragment: 'updateMaster', values?: undefined): string
  encodeFunctionData(functionFragment: 'versionCount', values?: undefined): string

  decodeFunctionResult(functionFragment: 'account', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'addNewAccount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'build', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'buildWithCast', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'changeCheck', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'changeMaster', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'check', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'connectors', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isClone', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'list', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'master', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setBasics', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'updateMaster', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'versionCount', data: BytesLike): Result

  events: {
    'LogAccountCreated(address,address,address,address)': EventFragment
    'LogNewAccount(address,address,address)': EventFragment
    'LogNewCheck(uint256,address)': EventFragment
    'LogNewMaster(address)': EventFragment
    'LogUpdateMaster(address)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'LogAccountCreated'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'LogNewAccount'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'LogNewCheck'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'LogNewMaster'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'LogUpdateMaster'): EventFragment
}

export class InstaIndex extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: InstaIndexInterface

  functions: {
    account(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'account(uint256)'(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    addNewAccount(
      _newAccount: string,
      _connectors: string,
      _check: string,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'addNewAccount(address,address,address)'(
      _newAccount: string,
      _connectors: string,
      _check: string,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    build(
      _owner: string,
      accountVersion: BigNumberish,
      _origin: string,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'build(address,uint256,address)'(
      _owner: string,
      accountVersion: BigNumberish,
      _origin: string,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    buildWithCast(
      _owner: string,
      accountVersion: BigNumberish,
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>

    'buildWithCast(address,uint256,address[],bytes[],address)'(
      _owner: string,
      accountVersion: BigNumberish,
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>

    changeCheck(accountVersion: BigNumberish, _newCheck: string, overrides?: Overrides): Promise<ContractTransaction>

    'changeCheck(uint256,address)'(
      accountVersion: BigNumberish,
      _newCheck: string,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    changeMaster(_newMaster: string, overrides?: Overrides): Promise<ContractTransaction>

    'changeMaster(address)'(_newMaster: string, overrides?: Overrides): Promise<ContractTransaction>

    check(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'check(uint256)'(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    connectors(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'connectors(uint256)'(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    isClone(
      version: BigNumberish,
      query: string,
      overrides?: CallOverrides,
    ): Promise<{
      result: boolean
      0: boolean
    }>

    'isClone(uint256,address)'(
      version: BigNumberish,
      query: string,
      overrides?: CallOverrides,
    ): Promise<{
      result: boolean
      0: boolean
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

    master(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'master()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    setBasics(
      _master: string,
      _list: string,
      _account: string,
      _connectors: string,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'setBasics(address,address,address,address)'(
      _master: string,
      _list: string,
      _account: string,
      _connectors: string,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    updateMaster(overrides?: Overrides): Promise<ContractTransaction>

    'updateMaster()'(overrides?: Overrides): Promise<ContractTransaction>

    versionCount(
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    'versionCount()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>
  }

  account(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

  'account(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

  addNewAccount(
    _newAccount: string,
    _connectors: string,
    _check: string,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'addNewAccount(address,address,address)'(
    _newAccount: string,
    _connectors: string,
    _check: string,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  build(
    _owner: string,
    accountVersion: BigNumberish,
    _origin: string,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'build(address,uint256,address)'(
    _owner: string,
    accountVersion: BigNumberish,
    _origin: string,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  buildWithCast(
    _owner: string,
    accountVersion: BigNumberish,
    _targets: string[],
    _datas: BytesLike[],
    _origin: string,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  'buildWithCast(address,uint256,address[],bytes[],address)'(
    _owner: string,
    accountVersion: BigNumberish,
    _targets: string[],
    _datas: BytesLike[],
    _origin: string,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  changeCheck(accountVersion: BigNumberish, _newCheck: string, overrides?: Overrides): Promise<ContractTransaction>

  'changeCheck(uint256,address)'(
    accountVersion: BigNumberish,
    _newCheck: string,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  changeMaster(_newMaster: string, overrides?: Overrides): Promise<ContractTransaction>

  'changeMaster(address)'(_newMaster: string, overrides?: Overrides): Promise<ContractTransaction>

  check(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

  'check(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

  connectors(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

  'connectors(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

  isClone(version: BigNumberish, query: string, overrides?: CallOverrides): Promise<boolean>

  'isClone(uint256,address)'(version: BigNumberish, query: string, overrides?: CallOverrides): Promise<boolean>

  list(overrides?: CallOverrides): Promise<string>

  'list()'(overrides?: CallOverrides): Promise<string>

  master(overrides?: CallOverrides): Promise<string>

  'master()'(overrides?: CallOverrides): Promise<string>

  setBasics(
    _master: string,
    _list: string,
    _account: string,
    _connectors: string,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'setBasics(address,address,address,address)'(
    _master: string,
    _list: string,
    _account: string,
    _connectors: string,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  updateMaster(overrides?: Overrides): Promise<ContractTransaction>

  'updateMaster()'(overrides?: Overrides): Promise<ContractTransaction>

  versionCount(overrides?: CallOverrides): Promise<BigNumber>

  'versionCount()'(overrides?: CallOverrides): Promise<BigNumber>

  callStatic: {
    account(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

    'account(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

    addNewAccount(_newAccount: string, _connectors: string, _check: string, overrides?: CallOverrides): Promise<void>

    'addNewAccount(address,address,address)'(
      _newAccount: string,
      _connectors: string,
      _check: string,
      overrides?: CallOverrides,
    ): Promise<void>

    build(_owner: string, accountVersion: BigNumberish, _origin: string, overrides?: CallOverrides): Promise<string>

    'build(address,uint256,address)'(
      _owner: string,
      accountVersion: BigNumberish,
      _origin: string,
      overrides?: CallOverrides,
    ): Promise<string>

    buildWithCast(
      _owner: string,
      accountVersion: BigNumberish,
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: CallOverrides,
    ): Promise<string>

    'buildWithCast(address,uint256,address[],bytes[],address)'(
      _owner: string,
      accountVersion: BigNumberish,
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: CallOverrides,
    ): Promise<string>

    changeCheck(accountVersion: BigNumberish, _newCheck: string, overrides?: CallOverrides): Promise<void>

    'changeCheck(uint256,address)'(
      accountVersion: BigNumberish,
      _newCheck: string,
      overrides?: CallOverrides,
    ): Promise<void>

    changeMaster(_newMaster: string, overrides?: CallOverrides): Promise<void>

    'changeMaster(address)'(_newMaster: string, overrides?: CallOverrides): Promise<void>

    check(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

    'check(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

    connectors(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

    'connectors(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

    isClone(version: BigNumberish, query: string, overrides?: CallOverrides): Promise<boolean>

    'isClone(uint256,address)'(version: BigNumberish, query: string, overrides?: CallOverrides): Promise<boolean>

    list(overrides?: CallOverrides): Promise<string>

    'list()'(overrides?: CallOverrides): Promise<string>

    master(overrides?: CallOverrides): Promise<string>

    'master()'(overrides?: CallOverrides): Promise<string>

    setBasics(
      _master: string,
      _list: string,
      _account: string,
      _connectors: string,
      overrides?: CallOverrides,
    ): Promise<void>

    'setBasics(address,address,address,address)'(
      _master: string,
      _list: string,
      _account: string,
      _connectors: string,
      overrides?: CallOverrides,
    ): Promise<void>

    updateMaster(overrides?: CallOverrides): Promise<void>

    'updateMaster()'(overrides?: CallOverrides): Promise<void>

    versionCount(overrides?: CallOverrides): Promise<BigNumber>

    'versionCount()'(overrides?: CallOverrides): Promise<BigNumber>
  }

  filters: {
    LogAccountCreated(sender: null, owner: string | null, account: string | null, origin: string | null): EventFilter

    LogNewAccount(_newAccount: string | null, _connectors: string | null, _check: string | null): EventFilter

    LogNewCheck(accountVersion: BigNumberish | null, check: string | null): EventFilter

    LogNewMaster(master: string | null): EventFilter

    LogUpdateMaster(master: string | null): EventFilter
  }

  estimateGas: {
    account(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'account(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    addNewAccount(_newAccount: string, _connectors: string, _check: string, overrides?: Overrides): Promise<BigNumber>

    'addNewAccount(address,address,address)'(
      _newAccount: string,
      _connectors: string,
      _check: string,
      overrides?: Overrides,
    ): Promise<BigNumber>

    build(_owner: string, accountVersion: BigNumberish, _origin: string, overrides?: Overrides): Promise<BigNumber>

    'build(address,uint256,address)'(
      _owner: string,
      accountVersion: BigNumberish,
      _origin: string,
      overrides?: Overrides,
    ): Promise<BigNumber>

    buildWithCast(
      _owner: string,
      accountVersion: BigNumberish,
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>

    'buildWithCast(address,uint256,address[],bytes[],address)'(
      _owner: string,
      accountVersion: BigNumberish,
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>

    changeCheck(accountVersion: BigNumberish, _newCheck: string, overrides?: Overrides): Promise<BigNumber>

    'changeCheck(uint256,address)'(
      accountVersion: BigNumberish,
      _newCheck: string,
      overrides?: Overrides,
    ): Promise<BigNumber>

    changeMaster(_newMaster: string, overrides?: Overrides): Promise<BigNumber>

    'changeMaster(address)'(_newMaster: string, overrides?: Overrides): Promise<BigNumber>

    check(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'check(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    connectors(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'connectors(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    isClone(version: BigNumberish, query: string, overrides?: CallOverrides): Promise<BigNumber>

    'isClone(uint256,address)'(version: BigNumberish, query: string, overrides?: CallOverrides): Promise<BigNumber>

    list(overrides?: CallOverrides): Promise<BigNumber>

    'list()'(overrides?: CallOverrides): Promise<BigNumber>

    master(overrides?: CallOverrides): Promise<BigNumber>

    'master()'(overrides?: CallOverrides): Promise<BigNumber>

    setBasics(
      _master: string,
      _list: string,
      _account: string,
      _connectors: string,
      overrides?: Overrides,
    ): Promise<BigNumber>

    'setBasics(address,address,address,address)'(
      _master: string,
      _list: string,
      _account: string,
      _connectors: string,
      overrides?: Overrides,
    ): Promise<BigNumber>

    updateMaster(overrides?: Overrides): Promise<BigNumber>

    'updateMaster()'(overrides?: Overrides): Promise<BigNumber>

    versionCount(overrides?: CallOverrides): Promise<BigNumber>

    'versionCount()'(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    account(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'account(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    addNewAccount(
      _newAccount: string,
      _connectors: string,
      _check: string,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'addNewAccount(address,address,address)'(
      _newAccount: string,
      _connectors: string,
      _check: string,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    build(
      _owner: string,
      accountVersion: BigNumberish,
      _origin: string,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'build(address,uint256,address)'(
      _owner: string,
      accountVersion: BigNumberish,
      _origin: string,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    buildWithCast(
      _owner: string,
      accountVersion: BigNumberish,
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>

    'buildWithCast(address,uint256,address[],bytes[],address)'(
      _owner: string,
      accountVersion: BigNumberish,
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>

    changeCheck(accountVersion: BigNumberish, _newCheck: string, overrides?: Overrides): Promise<PopulatedTransaction>

    'changeCheck(uint256,address)'(
      accountVersion: BigNumberish,
      _newCheck: string,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    changeMaster(_newMaster: string, overrides?: Overrides): Promise<PopulatedTransaction>

    'changeMaster(address)'(_newMaster: string, overrides?: Overrides): Promise<PopulatedTransaction>

    check(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'check(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    connectors(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'connectors(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    isClone(version: BigNumberish, query: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'isClone(uint256,address)'(
      version: BigNumberish,
      query: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    list(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'list()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    master(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'master()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    setBasics(
      _master: string,
      _list: string,
      _account: string,
      _connectors: string,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'setBasics(address,address,address,address)'(
      _master: string,
      _list: string,
      _account: string,
      _connectors: string,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    updateMaster(overrides?: Overrides): Promise<PopulatedTransaction>

    'updateMaster()'(overrides?: Overrides): Promise<PopulatedTransaction>

    versionCount(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'versionCount()'(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}