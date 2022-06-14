/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface BoxInterface extends utils.Interface {
  contractName: "Box";
  functions: {
    "OPEN_BOX_WITH_SIG_TYPEHASH()": FunctionFragment;
    "openBox(uint256)": FunctionFragment;
    "openBoxSigNonces(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setBoxInfo(address,address,address)": FunctionFragment;
    "setReceiver(address)": FunctionFragment;
    "setUnboxFee(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unboxFee()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "OPEN_BOX_WITH_SIG_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "openBox",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "openBoxSigNonces",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setBoxInfo",
    values: [string, string, string]
  ): string;
  encodeFunctionData(functionFragment: "setReceiver", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setUnboxFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "unboxFee", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "OPEN_BOX_WITH_SIG_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "openBox", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "openBoxSigNonces",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setBoxInfo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setReceiver",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setUnboxFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unboxFee", data: BytesLike): Result;

  events: {
    "OpenBox(address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OpenBox"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type OpenBoxEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { _user: string; landId: BigNumber; amount: BigNumber }
>;

export type OpenBoxEventFilter = TypedEventFilter<OpenBoxEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface Box extends BaseContract {
  contractName: "Box";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BoxInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    OPEN_BOX_WITH_SIG_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    openBox(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    openBoxSigNonces(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBoxInfo(
      _boxAddress: string,
      _tokenAddress: string,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setReceiver(
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setUnboxFee(
      _unboxFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unboxFee(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  OPEN_BOX_WITH_SIG_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  openBox(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  openBoxSigNonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBoxInfo(
    _boxAddress: string,
    _tokenAddress: string,
    _receiver: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setReceiver(
    _receiver: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setUnboxFee(
    _unboxFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unboxFee(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    OPEN_BOX_WITH_SIG_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    openBox(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    openBoxSigNonces(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setBoxInfo(
      _boxAddress: string,
      _tokenAddress: string,
      _receiver: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setReceiver(_receiver: string, overrides?: CallOverrides): Promise<void>;

    setUnboxFee(
      _unboxFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unboxFee(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "OpenBox(address,uint256,uint256)"(
      _user?: null,
      landId?: null,
      amount?: null
    ): OpenBoxEventFilter;
    OpenBox(_user?: null, landId?: null, amount?: null): OpenBoxEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    OPEN_BOX_WITH_SIG_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    openBox(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    openBoxSigNonces(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBoxInfo(
      _boxAddress: string,
      _tokenAddress: string,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setReceiver(
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setUnboxFee(
      _unboxFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unboxFee(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    OPEN_BOX_WITH_SIG_TYPEHASH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    openBox(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    openBoxSigNonces(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBoxInfo(
      _boxAddress: string,
      _tokenAddress: string,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setReceiver(
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setUnboxFee(
      _unboxFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unboxFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
