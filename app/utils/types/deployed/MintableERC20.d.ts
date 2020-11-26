/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, Overrides, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface MintableERC20Interface extends ethers.utils.Interface {
  functions: {
    'name()': FunctionFragment
    'approve(address,uint256)': FunctionFragment
    'totalSupply()': FunctionFragment
    'transferFrom(address,address,uint256)': FunctionFragment
    'decimals()': FunctionFragment
    'increaseAllowance(address,uint256)': FunctionFragment
    'mint(address,uint256)': FunctionFragment
    'burn(uint256)': FunctionFragment
    'balanceOf(address)': FunctionFragment
    'burnFrom(address,uint256)': FunctionFragment
    'symbol()': FunctionFragment
    'addMinter(address)': FunctionFragment
    'renounceMinter()': FunctionFragment
    'decreaseAllowance(address,uint256)': FunctionFragment
    'transfer(address,uint256)': FunctionFragment
    'isMinter(address)': FunctionFragment
    'allowance(address,address)': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'name', values?: undefined): string
  encodeFunctionData(functionFragment: 'approve', values: [string, BigNumberish]): string
  encodeFunctionData(functionFragment: 'totalSupply', values?: undefined): string
  encodeFunctionData(functionFragment: 'transferFrom', values: [string, string, BigNumberish]): string
  encodeFunctionData(functionFragment: 'decimals', values?: undefined): string
  encodeFunctionData(functionFragment: 'increaseAllowance', values: [string, BigNumberish]): string
  encodeFunctionData(functionFragment: 'mint', values: [string, BigNumberish]): string
  encodeFunctionData(functionFragment: 'burn', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'balanceOf', values: [string]): string
  encodeFunctionData(functionFragment: 'burnFrom', values: [string, BigNumberish]): string
  encodeFunctionData(functionFragment: 'symbol', values?: undefined): string
  encodeFunctionData(functionFragment: 'addMinter', values: [string]): string
  encodeFunctionData(functionFragment: 'renounceMinter', values?: undefined): string
  encodeFunctionData(functionFragment: 'decreaseAllowance', values: [string, BigNumberish]): string
  encodeFunctionData(functionFragment: 'transfer', values: [string, BigNumberish]): string
  encodeFunctionData(functionFragment: 'isMinter', values: [string]): string
  encodeFunctionData(functionFragment: 'allowance', values: [string, string]): string

  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'approve', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'totalSupply', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'transferFrom', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'decimals', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'increaseAllowance', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'mint', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'burn', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'burnFrom', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'symbol', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'addMinter', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'renounceMinter', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'decreaseAllowance', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'transfer', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isMinter', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'allowance', data: BytesLike): Result

  events: {
    'MinterAdded(address)': EventFragment
    'MinterRemoved(address)': EventFragment
    'Transfer(address,address,uint256)': EventFragment
    'Approval(address,address,uint256)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'MinterAdded'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'MinterRemoved'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'Transfer'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'Approval'): EventFragment
}

export class MintableERC20 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: MintableERC20Interface

  functions: {
    name(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'name()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    approve(spender: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    'approve(address,uint256)'(
      spender: string,
      value: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    totalSupply(
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    'totalSupply()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    transferFrom(from: string, to: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    'transferFrom(address,address,uint256)'(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    decimals(
      overrides?: CallOverrides,
    ): Promise<{
      0: number
    }>

    'decimals()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: number
    }>

    increaseAllowance(spender: string, addedValue: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    'increaseAllowance(address,uint256)'(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    mint(to: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    'mint(address,uint256)'(to: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    burn(value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    'burn(uint256)'(value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    balanceOf(
      owner: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    'balanceOf(address)'(
      owner: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    burnFrom(from: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    'burnFrom(address,uint256)'(from: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    symbol(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'symbol()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    addMinter(account: string, overrides?: Overrides): Promise<ContractTransaction>

    'addMinter(address)'(account: string, overrides?: Overrides): Promise<ContractTransaction>

    renounceMinter(overrides?: Overrides): Promise<ContractTransaction>

    'renounceMinter()'(overrides?: Overrides): Promise<ContractTransaction>

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'decreaseAllowance(address,uint256)'(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    transfer(to: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    'transfer(address,uint256)'(to: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    isMinter(
      account: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: boolean
    }>

    'isMinter(address)'(
      account: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: boolean
    }>

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    'allowance(address,address)'(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>
  }

  name(overrides?: CallOverrides): Promise<string>

  'name()'(overrides?: CallOverrides): Promise<string>

  approve(spender: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  'approve(address,uint256)'(spender: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>

  'totalSupply()'(overrides?: CallOverrides): Promise<BigNumber>

  transferFrom(from: string, to: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  'transferFrom(address,address,uint256)'(
    from: string,
    to: string,
    value: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  decimals(overrides?: CallOverrides): Promise<number>

  'decimals()'(overrides?: CallOverrides): Promise<number>

  increaseAllowance(spender: string, addedValue: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  'increaseAllowance(address,uint256)'(
    spender: string,
    addedValue: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  mint(to: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  'mint(address,uint256)'(to: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  burn(value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  'burn(uint256)'(value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>

  'balanceOf(address)'(owner: string, overrides?: CallOverrides): Promise<BigNumber>

  burnFrom(from: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  'burnFrom(address,uint256)'(from: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  symbol(overrides?: CallOverrides): Promise<string>

  'symbol()'(overrides?: CallOverrides): Promise<string>

  addMinter(account: string, overrides?: Overrides): Promise<ContractTransaction>

  'addMinter(address)'(account: string, overrides?: Overrides): Promise<ContractTransaction>

  renounceMinter(overrides?: Overrides): Promise<ContractTransaction>

  'renounceMinter()'(overrides?: Overrides): Promise<ContractTransaction>

  decreaseAllowance(spender: string, subtractedValue: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  'decreaseAllowance(address,uint256)'(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  transfer(to: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  'transfer(address,uint256)'(to: string, value: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  isMinter(account: string, overrides?: CallOverrides): Promise<boolean>

  'isMinter(address)'(account: string, overrides?: CallOverrides): Promise<boolean>

  allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>

  'allowance(address,address)'(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>

  callStatic: {
    name(overrides?: CallOverrides): Promise<string>

    'name()'(overrides?: CallOverrides): Promise<string>

    approve(spender: string, value: BigNumberish, overrides?: CallOverrides): Promise<boolean>

    'approve(address,uint256)'(spender: string, value: BigNumberish, overrides?: CallOverrides): Promise<boolean>

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>

    'totalSupply()'(overrides?: CallOverrides): Promise<BigNumber>

    transferFrom(from: string, to: string, value: BigNumberish, overrides?: CallOverrides): Promise<boolean>

    'transferFrom(address,address,uint256)'(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>

    decimals(overrides?: CallOverrides): Promise<number>

    'decimals()'(overrides?: CallOverrides): Promise<number>

    increaseAllowance(spender: string, addedValue: BigNumberish, overrides?: CallOverrides): Promise<boolean>

    'increaseAllowance(address,uint256)'(
      spender: string,
      addedValue: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>

    mint(to: string, value: BigNumberish, overrides?: CallOverrides): Promise<boolean>

    'mint(address,uint256)'(to: string, value: BigNumberish, overrides?: CallOverrides): Promise<boolean>

    burn(value: BigNumberish, overrides?: CallOverrides): Promise<void>

    'burn(uint256)'(value: BigNumberish, overrides?: CallOverrides): Promise<void>

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>

    'balanceOf(address)'(owner: string, overrides?: CallOverrides): Promise<BigNumber>

    burnFrom(from: string, value: BigNumberish, overrides?: CallOverrides): Promise<void>

    'burnFrom(address,uint256)'(from: string, value: BigNumberish, overrides?: CallOverrides): Promise<void>

    symbol(overrides?: CallOverrides): Promise<string>

    'symbol()'(overrides?: CallOverrides): Promise<string>

    addMinter(account: string, overrides?: CallOverrides): Promise<void>

    'addMinter(address)'(account: string, overrides?: CallOverrides): Promise<void>

    renounceMinter(overrides?: CallOverrides): Promise<void>

    'renounceMinter()'(overrides?: CallOverrides): Promise<void>

    decreaseAllowance(spender: string, subtractedValue: BigNumberish, overrides?: CallOverrides): Promise<boolean>

    'decreaseAllowance(address,uint256)'(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>

    transfer(to: string, value: BigNumberish, overrides?: CallOverrides): Promise<boolean>

    'transfer(address,uint256)'(to: string, value: BigNumberish, overrides?: CallOverrides): Promise<boolean>

    isMinter(account: string, overrides?: CallOverrides): Promise<boolean>

    'isMinter(address)'(account: string, overrides?: CallOverrides): Promise<boolean>

    allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>

    'allowance(address,address)'(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>
  }

  filters: {
    MinterAdded(account: string | null): EventFilter

    MinterRemoved(account: string | null): EventFilter

    Transfer(from: string | null, to: string | null, value: null): EventFilter

    Approval(owner: string | null, spender: string | null, value: null): EventFilter
  }

  estimateGas: {
    name(overrides?: CallOverrides): Promise<BigNumber>

    'name()'(overrides?: CallOverrides): Promise<BigNumber>

    approve(spender: string, value: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    'approve(address,uint256)'(spender: string, value: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>

    'totalSupply()'(overrides?: CallOverrides): Promise<BigNumber>

    transferFrom(from: string, to: string, value: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    'transferFrom(address,address,uint256)'(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>

    decimals(overrides?: CallOverrides): Promise<BigNumber>

    'decimals()'(overrides?: CallOverrides): Promise<BigNumber>

    increaseAllowance(spender: string, addedValue: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    'increaseAllowance(address,uint256)'(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>

    mint(to: string, value: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    'mint(address,uint256)'(to: string, value: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    burn(value: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    'burn(uint256)'(value: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>

    'balanceOf(address)'(owner: string, overrides?: CallOverrides): Promise<BigNumber>

    burnFrom(from: string, value: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    'burnFrom(address,uint256)'(from: string, value: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    symbol(overrides?: CallOverrides): Promise<BigNumber>

    'symbol()'(overrides?: CallOverrides): Promise<BigNumber>

    addMinter(account: string, overrides?: Overrides): Promise<BigNumber>

    'addMinter(address)'(account: string, overrides?: Overrides): Promise<BigNumber>

    renounceMinter(overrides?: Overrides): Promise<BigNumber>

    'renounceMinter()'(overrides?: Overrides): Promise<BigNumber>

    decreaseAllowance(spender: string, subtractedValue: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    'decreaseAllowance(address,uint256)'(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>

    transfer(to: string, value: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    'transfer(address,uint256)'(to: string, value: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    isMinter(account: string, overrides?: CallOverrides): Promise<BigNumber>

    'isMinter(address)'(account: string, overrides?: CallOverrides): Promise<BigNumber>

    allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>

    'allowance(address,address)'(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'name()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    approve(spender: string, value: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    'approve(address,uint256)'(
      spender: string,
      value: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'totalSupply()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    transferFrom(from: string, to: string, value: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    'transferFrom(address,address,uint256)'(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'decimals()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    increaseAllowance(spender: string, addedValue: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    'increaseAllowance(address,uint256)'(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    mint(to: string, value: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    'mint(address,uint256)'(to: string, value: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    burn(value: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    'burn(uint256)'(value: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    balanceOf(owner: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'balanceOf(address)'(owner: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    burnFrom(from: string, value: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    'burnFrom(address,uint256)'(from: string, value: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'symbol()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    addMinter(account: string, overrides?: Overrides): Promise<PopulatedTransaction>

    'addMinter(address)'(account: string, overrides?: Overrides): Promise<PopulatedTransaction>

    renounceMinter(overrides?: Overrides): Promise<PopulatedTransaction>

    'renounceMinter()'(overrides?: Overrides): Promise<PopulatedTransaction>

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'decreaseAllowance(address,uint256)'(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    transfer(to: string, value: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    'transfer(address,uint256)'(to: string, value: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    isMinter(account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'isMinter(address)'(account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'allowance(address,address)'(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>
  }
}