/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface CoWSwapEthFlowInterface extends ethers.utils.Interface {
  functions: {
    "cowSwapSettlement()": FunctionFragment;
    "createOrder((address,address,uint256,uint256,bytes32,uint256,uint32,bool,int64))": FunctionFragment;
    "deleteOrder((address,address,uint256,uint256,bytes32,uint256,uint32,bool,int64))": FunctionFragment;
    "isValidSignature(bytes32,bytes)": FunctionFragment;
    "orders(bytes32)": FunctionFragment;
    "wrappedNativeToken()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "cowSwapSettlement",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createOrder",
    values: [
      {
        buyToken: string;
        receiver: string;
        sellAmount: BigNumberish;
        buyAmount: BigNumberish;
        appData: BytesLike;
        feeAmount: BigNumberish;
        validTo: BigNumberish;
        partiallyFillable: boolean;
        quoteId: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deleteOrder",
    values: [
      {
        buyToken: string;
        receiver: string;
        sellAmount: BigNumberish;
        buyAmount: BigNumberish;
        appData: BytesLike;
        feeAmount: BigNumberish;
        validTo: BigNumberish;
        partiallyFillable: boolean;
        quoteId: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidSignature",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "orders", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "wrappedNativeToken",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "cowSwapSettlement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deleteOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "orders", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "wrappedNativeToken",
    data: BytesLike
  ): Result;

  events: {
    "OrderPlacement(address,tuple,tuple,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OrderPlacement"): EventFragment;
}

export type OrderPlacementEvent = TypedEvent<
  [
    string,
    [
      string,
      string,
      string,
      BigNumber,
      BigNumber,
      number,
      string,
      BigNumber,
      string,
      boolean,
      string,
      string
    ] & {
      sellToken: string;
      buyToken: string;
      receiver: string;
      sellAmount: BigNumber;
      buyAmount: BigNumber;
      validTo: number;
      appData: string;
      feeAmount: BigNumber;
      kind: string;
      partiallyFillable: boolean;
      sellTokenBalance: string;
      buyTokenBalance: string;
    },
    [number, string] & { scheme: number; data: string },
    string
  ] & {
    sender: string;
    order: [
      string,
      string,
      string,
      BigNumber,
      BigNumber,
      number,
      string,
      BigNumber,
      string,
      boolean,
      string,
      string
    ] & {
      sellToken: string;
      buyToken: string;
      receiver: string;
      sellAmount: BigNumber;
      buyAmount: BigNumber;
      validTo: number;
      appData: string;
      feeAmount: BigNumber;
      kind: string;
      partiallyFillable: boolean;
      sellTokenBalance: string;
      buyTokenBalance: string;
    };
    signature: [number, string] & { scheme: number; data: string };
    data: string;
  }
>;

export class CoWSwapEthFlow extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: CoWSwapEthFlowInterface;

  functions: {
    cowSwapSettlement(overrides?: CallOverrides): Promise<[string]>;

    createOrder(
      order: {
        buyToken: string;
        receiver: string;
        sellAmount: BigNumberish;
        buyAmount: BigNumberish;
        appData: BytesLike;
        feeAmount: BigNumberish;
        validTo: BigNumberish;
        partiallyFillable: boolean;
        quoteId: BigNumberish;
      },
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deleteOrder(
      order: {
        buyToken: string;
        receiver: string;
        sellAmount: BigNumberish;
        buyAmount: BigNumberish;
        appData: BytesLike;
        feeAmount: BigNumberish;
        validTo: BigNumberish;
        partiallyFillable: boolean;
        quoteId: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isValidSignature(
      orderHash: BytesLike,
      arg1: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    orders(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, number] & { owner: string; validTo: number }>;

    wrappedNativeToken(overrides?: CallOverrides): Promise<[string]>;
  };

  cowSwapSettlement(overrides?: CallOverrides): Promise<string>;

  createOrder(
    order: {
      buyToken: string;
      receiver: string;
      sellAmount: BigNumberish;
      buyAmount: BigNumberish;
      appData: BytesLike;
      feeAmount: BigNumberish;
      validTo: BigNumberish;
      partiallyFillable: boolean;
      quoteId: BigNumberish;
    },
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deleteOrder(
    order: {
      buyToken: string;
      receiver: string;
      sellAmount: BigNumberish;
      buyAmount: BigNumberish;
      appData: BytesLike;
      feeAmount: BigNumberish;
      validTo: BigNumberish;
      partiallyFillable: boolean;
      quoteId: BigNumberish;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isValidSignature(
    orderHash: BytesLike,
    arg1: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  orders(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<[string, number] & { owner: string; validTo: number }>;

  wrappedNativeToken(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    cowSwapSettlement(overrides?: CallOverrides): Promise<string>;

    createOrder(
      order: {
        buyToken: string;
        receiver: string;
        sellAmount: BigNumberish;
        buyAmount: BigNumberish;
        appData: BytesLike;
        feeAmount: BigNumberish;
        validTo: BigNumberish;
        partiallyFillable: boolean;
        quoteId: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<string>;

    deleteOrder(
      order: {
        buyToken: string;
        receiver: string;
        sellAmount: BigNumberish;
        buyAmount: BigNumberish;
        appData: BytesLike;
        feeAmount: BigNumberish;
        validTo: BigNumberish;
        partiallyFillable: boolean;
        quoteId: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    isValidSignature(
      orderHash: BytesLike,
      arg1: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    orders(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, number] & { owner: string; validTo: number }>;

    wrappedNativeToken(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "OrderPlacement(address,tuple,tuple,bytes)"(
      sender?: string | null,
      order?: null,
      signature?: null,
      data?: null
    ): TypedEventFilter<
      [
        string,
        [
          string,
          string,
          string,
          BigNumber,
          BigNumber,
          number,
          string,
          BigNumber,
          string,
          boolean,
          string,
          string
        ] & {
          sellToken: string;
          buyToken: string;
          receiver: string;
          sellAmount: BigNumber;
          buyAmount: BigNumber;
          validTo: number;
          appData: string;
          feeAmount: BigNumber;
          kind: string;
          partiallyFillable: boolean;
          sellTokenBalance: string;
          buyTokenBalance: string;
        },
        [number, string] & { scheme: number; data: string },
        string
      ],
      {
        sender: string;
        order: [
          string,
          string,
          string,
          BigNumber,
          BigNumber,
          number,
          string,
          BigNumber,
          string,
          boolean,
          string,
          string
        ] & {
          sellToken: string;
          buyToken: string;
          receiver: string;
          sellAmount: BigNumber;
          buyAmount: BigNumber;
          validTo: number;
          appData: string;
          feeAmount: BigNumber;
          kind: string;
          partiallyFillable: boolean;
          sellTokenBalance: string;
          buyTokenBalance: string;
        };
        signature: [number, string] & { scheme: number; data: string };
        data: string;
      }
    >;

    OrderPlacement(
      sender?: string | null,
      order?: null,
      signature?: null,
      data?: null
    ): TypedEventFilter<
      [
        string,
        [
          string,
          string,
          string,
          BigNumber,
          BigNumber,
          number,
          string,
          BigNumber,
          string,
          boolean,
          string,
          string
        ] & {
          sellToken: string;
          buyToken: string;
          receiver: string;
          sellAmount: BigNumber;
          buyAmount: BigNumber;
          validTo: number;
          appData: string;
          feeAmount: BigNumber;
          kind: string;
          partiallyFillable: boolean;
          sellTokenBalance: string;
          buyTokenBalance: string;
        },
        [number, string] & { scheme: number; data: string },
        string
      ],
      {
        sender: string;
        order: [
          string,
          string,
          string,
          BigNumber,
          BigNumber,
          number,
          string,
          BigNumber,
          string,
          boolean,
          string,
          string
        ] & {
          sellToken: string;
          buyToken: string;
          receiver: string;
          sellAmount: BigNumber;
          buyAmount: BigNumber;
          validTo: number;
          appData: string;
          feeAmount: BigNumber;
          kind: string;
          partiallyFillable: boolean;
          sellTokenBalance: string;
          buyTokenBalance: string;
        };
        signature: [number, string] & { scheme: number; data: string };
        data: string;
      }
    >;
  };

  estimateGas: {
    cowSwapSettlement(overrides?: CallOverrides): Promise<BigNumber>;

    createOrder(
      order: {
        buyToken: string;
        receiver: string;
        sellAmount: BigNumberish;
        buyAmount: BigNumberish;
        appData: BytesLike;
        feeAmount: BigNumberish;
        validTo: BigNumberish;
        partiallyFillable: boolean;
        quoteId: BigNumberish;
      },
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deleteOrder(
      order: {
        buyToken: string;
        receiver: string;
        sellAmount: BigNumberish;
        buyAmount: BigNumberish;
        appData: BytesLike;
        feeAmount: BigNumberish;
        validTo: BigNumberish;
        partiallyFillable: boolean;
        quoteId: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isValidSignature(
      orderHash: BytesLike,
      arg1: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    orders(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    wrappedNativeToken(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    cowSwapSettlement(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createOrder(
      order: {
        buyToken: string;
        receiver: string;
        sellAmount: BigNumberish;
        buyAmount: BigNumberish;
        appData: BytesLike;
        feeAmount: BigNumberish;
        validTo: BigNumberish;
        partiallyFillable: boolean;
        quoteId: BigNumberish;
      },
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deleteOrder(
      order: {
        buyToken: string;
        receiver: string;
        sellAmount: BigNumberish;
        buyAmount: BigNumberish;
        appData: BytesLike;
        feeAmount: BigNumberish;
        validTo: BigNumberish;
        partiallyFillable: boolean;
        quoteId: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isValidSignature(
      orderHash: BytesLike,
      arg1: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    orders(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    wrappedNativeToken(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
