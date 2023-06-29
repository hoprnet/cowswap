/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from './common'

export interface ExtensibleFallbackHandlerInterface extends utils.Interface {
  functions: {
    'setDefaultFallbackHandler(address)': FunctionFragment
    'setSafeMethod(bytes4,address)': FunctionFragment
  }

  getFunction(nameOrSignatureOrTopic: 'setDefaultFallbackHandler' | 'setSafeMethod'): FunctionFragment

  encodeFunctionData(functionFragment: 'setDefaultFallbackHandler', values: [PromiseOrValue<string>]): string
  encodeFunctionData(
    functionFragment: 'setSafeMethod',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string

  decodeFunctionResult(functionFragment: 'setDefaultFallbackHandler', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setSafeMethod', data: BytesLike): Result

  events: {
    'AddedSafeMethod(address,bytes4,address)': EventFragment
    'ChangedDefaultFallbackHandler(address,address,address)': EventFragment
    'ChangedSafeMethod(address,bytes4,address,address)': EventFragment
    'RemovedSafeMethod(address,bytes4)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'AddedSafeMethod'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'ChangedDefaultFallbackHandler'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'ChangedSafeMethod'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'RemovedSafeMethod'): EventFragment
}

export interface AddedSafeMethodEventObject {
  safe: string
  selector: string
  handler: string
}
export type AddedSafeMethodEvent = TypedEvent<[string, string, string], AddedSafeMethodEventObject>

export type AddedSafeMethodEventFilter = TypedEventFilter<AddedSafeMethodEvent>

export interface ChangedDefaultFallbackHandlerEventObject {
  safe: string
  oldHandler: string
  newHandler: string
}
export type ChangedDefaultFallbackHandlerEvent = TypedEvent<
  [string, string, string],
  ChangedDefaultFallbackHandlerEventObject
>

export type ChangedDefaultFallbackHandlerEventFilter = TypedEventFilter<ChangedDefaultFallbackHandlerEvent>

export interface ChangedSafeMethodEventObject {
  safe: string
  selector: string
  oldHandler: string
  newHandler: string
}
export type ChangedSafeMethodEvent = TypedEvent<[string, string, string, string], ChangedSafeMethodEventObject>

export type ChangedSafeMethodEventFilter = TypedEventFilter<ChangedSafeMethodEvent>

export interface RemovedSafeMethodEventObject {
  safe: string
  selector: string
}
export type RemovedSafeMethodEvent = TypedEvent<[string, string], RemovedSafeMethodEventObject>

export type RemovedSafeMethodEventFilter = TypedEventFilter<RemovedSafeMethodEvent>

export interface ExtensibleFallbackHandler extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: ExtensibleFallbackHandlerInterface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    setDefaultFallbackHandler(
      newHandler: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    setSafeMethod(
      selector: PromiseOrValue<BytesLike>,
      newHandler: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>
  }

  setDefaultFallbackHandler(
    newHandler: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  setSafeMethod(
    selector: PromiseOrValue<BytesLike>,
    newHandler: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  callStatic: {
    setDefaultFallbackHandler(newHandler: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>

    setSafeMethod(
      selector: PromiseOrValue<BytesLike>,
      newHandler: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>
  }

  filters: {
    'AddedSafeMethod(address,bytes4,address)'(
      safe?: PromiseOrValue<string> | null,
      selector?: null,
      handler?: null
    ): AddedSafeMethodEventFilter
    AddedSafeMethod(safe?: PromiseOrValue<string> | null, selector?: null, handler?: null): AddedSafeMethodEventFilter

    'ChangedDefaultFallbackHandler(address,address,address)'(
      safe?: PromiseOrValue<string> | null,
      oldHandler?: null,
      newHandler?: null
    ): ChangedDefaultFallbackHandlerEventFilter
    ChangedDefaultFallbackHandler(
      safe?: PromiseOrValue<string> | null,
      oldHandler?: null,
      newHandler?: null
    ): ChangedDefaultFallbackHandlerEventFilter

    'ChangedSafeMethod(address,bytes4,address,address)'(
      safe?: PromiseOrValue<string> | null,
      selector?: null,
      oldHandler?: null,
      newHandler?: null
    ): ChangedSafeMethodEventFilter
    ChangedSafeMethod(
      safe?: PromiseOrValue<string> | null,
      selector?: null,
      oldHandler?: null,
      newHandler?: null
    ): ChangedSafeMethodEventFilter

    'RemovedSafeMethod(address,bytes4)'(
      safe?: PromiseOrValue<string> | null,
      selector?: null
    ): RemovedSafeMethodEventFilter
    RemovedSafeMethod(safe?: PromiseOrValue<string> | null, selector?: null): RemovedSafeMethodEventFilter
  }

  estimateGas: {
    setDefaultFallbackHandler(
      newHandler: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    setSafeMethod(
      selector: PromiseOrValue<BytesLike>,
      newHandler: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>
  }

  populateTransaction: {
    setDefaultFallbackHandler(
      newHandler: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    setSafeMethod(
      selector: PromiseOrValue<BytesLike>,
      newHandler: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>
  }
}
