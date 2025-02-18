// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'EtherWrapper';
export const address = '0x4556b9761b2aC071D1665FAe01faA255a53d1307';
export const source = 'EtherWrapper';
export const abi = [
  'constructor(address _owner, address _resolver, address _WETH)',
  'event Burned(address indexed account, uint256 principal, uint256 fee, uint256 amountIn)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event Minted(address indexed account, uint256 principal, uint256 fee, uint256 amountIn)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event PauseChanged(bool isPaused)',
  'function acceptOwnership()',
  'function burn(uint256 amountIn)',
  'function burnFeeRate() view returns (uint256)',
  'function calculateBurnFee(uint256 amount) view returns (uint256)',
  'function calculateMintFee(uint256 amount) view returns (uint256)',
  'function capacity() view returns (uint256 _capacity)',
  'function distributeFees()',
  'function feesEscrowed() view returns (uint256)',
  'function getReserves() view returns (uint256)',
  'function isResolverCached() view returns (bool)',
  'function lastPauseTime() view returns (uint256)',
  'function maxETH() view returns (uint256)',
  'function mint(uint256 amountIn)',
  'function mintFeeRate() view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function paused() view returns (bool)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function sETHIssued() view returns (uint256)',
  'function sUSDIssued() view returns (uint256)',
  'function setPaused(bool _paused)',
  'function totalIssuedSynths() view returns (uint256)',
  'function weth() view returns (address)',
];
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
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
} from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from './common';

export interface EtherWrapperInterface extends utils.Interface {
  functions: {
    'acceptOwnership()': FunctionFragment;
    'burn(uint256)': FunctionFragment;
    'burnFeeRate()': FunctionFragment;
    'calculateBurnFee(uint256)': FunctionFragment;
    'calculateMintFee(uint256)': FunctionFragment;
    'capacity()': FunctionFragment;
    'distributeFees()': FunctionFragment;
    'feesEscrowed()': FunctionFragment;
    'getReserves()': FunctionFragment;
    'isResolverCached()': FunctionFragment;
    'lastPauseTime()': FunctionFragment;
    'maxETH()': FunctionFragment;
    'mint(uint256)': FunctionFragment;
    'mintFeeRate()': FunctionFragment;
    'nominateNewOwner(address)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'owner()': FunctionFragment;
    'paused()': FunctionFragment;
    'rebuildCache()': FunctionFragment;
    'resolver()': FunctionFragment;
    'resolverAddressesRequired()': FunctionFragment;
    'sETHIssued()': FunctionFragment;
    'sUSDIssued()': FunctionFragment;
    'setPaused(bool)': FunctionFragment;
    'totalIssuedSynths()': FunctionFragment;
    'weth()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'acceptOwnership'
      | 'burn'
      | 'burnFeeRate'
      | 'calculateBurnFee'
      | 'calculateMintFee'
      | 'capacity'
      | 'distributeFees'
      | 'feesEscrowed'
      | 'getReserves'
      | 'isResolverCached'
      | 'lastPauseTime'
      | 'maxETH'
      | 'mint'
      | 'mintFeeRate'
      | 'nominateNewOwner'
      | 'nominatedOwner'
      | 'owner'
      | 'paused'
      | 'rebuildCache'
      | 'resolver'
      | 'resolverAddressesRequired'
      | 'sETHIssued'
      | 'sUSDIssued'
      | 'setPaused'
      | 'totalIssuedSynths'
      | 'weth'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(functionFragment: 'burn', values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: 'burnFeeRate', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'calculateBurnFee',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'calculateMintFee',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'capacity', values?: undefined): string;
  encodeFunctionData(functionFragment: 'distributeFees', values?: undefined): string;
  encodeFunctionData(functionFragment: 'feesEscrowed', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getReserves', values?: undefined): string;
  encodeFunctionData(functionFragment: 'isResolverCached', values?: undefined): string;
  encodeFunctionData(functionFragment: 'lastPauseTime', values?: undefined): string;
  encodeFunctionData(functionFragment: 'maxETH', values?: undefined): string;
  encodeFunctionData(functionFragment: 'mint', values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: 'mintFeeRate', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'nominateNewOwner',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'paused', values?: undefined): string;
  encodeFunctionData(functionFragment: 'rebuildCache', values?: undefined): string;
  encodeFunctionData(functionFragment: 'resolver', values?: undefined): string;
  encodeFunctionData(functionFragment: 'resolverAddressesRequired', values?: undefined): string;
  encodeFunctionData(functionFragment: 'sETHIssued', values?: undefined): string;
  encodeFunctionData(functionFragment: 'sUSDIssued', values?: undefined): string;
  encodeFunctionData(functionFragment: 'setPaused', values: [PromiseOrValue<boolean>]): string;
  encodeFunctionData(functionFragment: 'totalIssuedSynths', values?: undefined): string;
  encodeFunctionData(functionFragment: 'weth', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'burn', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'burnFeeRate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'calculateBurnFee', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'calculateMintFee', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'capacity', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'distributeFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'feesEscrowed', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getReserves', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isResolverCached', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'lastPauseTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'maxETH', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mint', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintFeeRate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'paused', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rebuildCache', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'resolver', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'resolverAddressesRequired', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'sETHIssued', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'sUSDIssued', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPaused', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalIssuedSynths', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'weth', data: BytesLike): Result;

  events: {
    'Burned(address,uint256,uint256,uint256)': EventFragment;
    'CacheUpdated(bytes32,address)': EventFragment;
    'Minted(address,uint256,uint256,uint256)': EventFragment;
    'OwnerChanged(address,address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'PauseChanged(bool)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'Burned'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CacheUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Minted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PauseChanged'): EventFragment;
}

export interface BurnedEventObject {
  account: string;
  principal: BigNumber;
  fee: BigNumber;
  amountIn: BigNumber;
}
export type BurnedEvent = TypedEvent<[string, BigNumber, BigNumber, BigNumber], BurnedEventObject>;

export type BurnedEventFilter = TypedEventFilter<BurnedEvent>;

export interface CacheUpdatedEventObject {
  name: string;
  destination: string;
}
export type CacheUpdatedEvent = TypedEvent<[string, string], CacheUpdatedEventObject>;

export type CacheUpdatedEventFilter = TypedEventFilter<CacheUpdatedEvent>;

export interface MintedEventObject {
  account: string;
  principal: BigNumber;
  fee: BigNumber;
  amountIn: BigNumber;
}
export type MintedEvent = TypedEvent<[string, BigNumber, BigNumber, BigNumber], MintedEventObject>;

export type MintedEventFilter = TypedEventFilter<MintedEvent>;

export interface OwnerChangedEventObject {
  oldOwner: string;
  newOwner: string;
}
export type OwnerChangedEvent = TypedEvent<[string, string], OwnerChangedEventObject>;

export type OwnerChangedEventFilter = TypedEventFilter<OwnerChangedEvent>;

export interface OwnerNominatedEventObject {
  newOwner: string;
}
export type OwnerNominatedEvent = TypedEvent<[string], OwnerNominatedEventObject>;

export type OwnerNominatedEventFilter = TypedEventFilter<OwnerNominatedEvent>;

export interface PauseChangedEventObject {
  isPaused: boolean;
}
export type PauseChangedEvent = TypedEvent<[boolean], PauseChangedEventObject>;

export type PauseChangedEventFilter = TypedEventFilter<PauseChangedEvent>;

export interface EtherWrapper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EtherWrapperInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    burn(
      amountIn: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    burnFeeRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    calculateBurnFee(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    calculateMintFee(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    capacity(overrides?: CallOverrides): Promise<[BigNumber] & { _capacity: BigNumber }>;

    distributeFees(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    feesEscrowed(overrides?: CallOverrides): Promise<[BigNumber]>;

    getReserves(overrides?: CallOverrides): Promise<[BigNumber]>;

    isResolverCached(overrides?: CallOverrides): Promise<[boolean]>;

    lastPauseTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    maxETH(overrides?: CallOverrides): Promise<[BigNumber]>;

    mint(
      amountIn: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mintFeeRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    rebuildCache(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    resolver(overrides?: CallOverrides): Promise<[string]>;

    resolverAddressesRequired(
      overrides?: CallOverrides
    ): Promise<[string[]] & { addresses: string[] }>;

    sETHIssued(overrides?: CallOverrides): Promise<[BigNumber]>;

    sUSDIssued(overrides?: CallOverrides): Promise<[BigNumber]>;

    setPaused(
      _paused: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    totalIssuedSynths(overrides?: CallOverrides): Promise<[BigNumber]>;

    weth(overrides?: CallOverrides): Promise<[string]>;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  burn(
    amountIn: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  burnFeeRate(overrides?: CallOverrides): Promise<BigNumber>;

  calculateBurnFee(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calculateMintFee(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  capacity(overrides?: CallOverrides): Promise<BigNumber>;

  distributeFees(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  feesEscrowed(overrides?: CallOverrides): Promise<BigNumber>;

  getReserves(overrides?: CallOverrides): Promise<BigNumber>;

  isResolverCached(overrides?: CallOverrides): Promise<boolean>;

  lastPauseTime(overrides?: CallOverrides): Promise<BigNumber>;

  maxETH(overrides?: CallOverrides): Promise<BigNumber>;

  mint(
    amountIn: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mintFeeRate(overrides?: CallOverrides): Promise<BigNumber>;

  nominateNewOwner(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  rebuildCache(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  resolver(overrides?: CallOverrides): Promise<string>;

  resolverAddressesRequired(overrides?: CallOverrides): Promise<string[]>;

  sETHIssued(overrides?: CallOverrides): Promise<BigNumber>;

  sUSDIssued(overrides?: CallOverrides): Promise<BigNumber>;

  setPaused(
    _paused: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  totalIssuedSynths(overrides?: CallOverrides): Promise<BigNumber>;

  weth(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    burn(amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;

    burnFeeRate(overrides?: CallOverrides): Promise<BigNumber>;

    calculateBurnFee(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateMintFee(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    capacity(overrides?: CallOverrides): Promise<BigNumber>;

    distributeFees(overrides?: CallOverrides): Promise<void>;

    feesEscrowed(overrides?: CallOverrides): Promise<BigNumber>;

    getReserves(overrides?: CallOverrides): Promise<BigNumber>;

    isResolverCached(overrides?: CallOverrides): Promise<boolean>;

    lastPauseTime(overrides?: CallOverrides): Promise<BigNumber>;

    maxETH(overrides?: CallOverrides): Promise<BigNumber>;

    mint(amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;

    mintFeeRate(overrides?: CallOverrides): Promise<BigNumber>;

    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    rebuildCache(overrides?: CallOverrides): Promise<void>;

    resolver(overrides?: CallOverrides): Promise<string>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<string[]>;

    sETHIssued(overrides?: CallOverrides): Promise<BigNumber>;

    sUSDIssued(overrides?: CallOverrides): Promise<BigNumber>;

    setPaused(_paused: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;

    totalIssuedSynths(overrides?: CallOverrides): Promise<BigNumber>;

    weth(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    'Burned(address,uint256,uint256,uint256)'(
      account?: PromiseOrValue<string> | null,
      principal?: null,
      fee?: null,
      amountIn?: null
    ): BurnedEventFilter;
    Burned(
      account?: PromiseOrValue<string> | null,
      principal?: null,
      fee?: null,
      amountIn?: null
    ): BurnedEventFilter;

    'CacheUpdated(bytes32,address)'(name?: null, destination?: null): CacheUpdatedEventFilter;
    CacheUpdated(name?: null, destination?: null): CacheUpdatedEventFilter;

    'Minted(address,uint256,uint256,uint256)'(
      account?: PromiseOrValue<string> | null,
      principal?: null,
      fee?: null,
      amountIn?: null
    ): MintedEventFilter;
    Minted(
      account?: PromiseOrValue<string> | null,
      principal?: null,
      fee?: null,
      amountIn?: null
    ): MintedEventFilter;

    'OwnerChanged(address,address)'(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    'OwnerNominated(address)'(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    'PauseChanged(bool)'(isPaused?: null): PauseChangedEventFilter;
    PauseChanged(isPaused?: null): PauseChangedEventFilter;
  };

  estimateGas: {
    acceptOwnership(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    burn(
      amountIn: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    burnFeeRate(overrides?: CallOverrides): Promise<BigNumber>;

    calculateBurnFee(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateMintFee(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    capacity(overrides?: CallOverrides): Promise<BigNumber>;

    distributeFees(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    feesEscrowed(overrides?: CallOverrides): Promise<BigNumber>;

    getReserves(overrides?: CallOverrides): Promise<BigNumber>;

    isResolverCached(overrides?: CallOverrides): Promise<BigNumber>;

    lastPauseTime(overrides?: CallOverrides): Promise<BigNumber>;

    maxETH(overrides?: CallOverrides): Promise<BigNumber>;

    mint(
      amountIn: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mintFeeRate(overrides?: CallOverrides): Promise<BigNumber>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    rebuildCache(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    resolver(overrides?: CallOverrides): Promise<BigNumber>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<BigNumber>;

    sETHIssued(overrides?: CallOverrides): Promise<BigNumber>;

    sUSDIssued(overrides?: CallOverrides): Promise<BigNumber>;

    setPaused(
      _paused: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    totalIssuedSynths(overrides?: CallOverrides): Promise<BigNumber>;

    weth(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    burn(
      amountIn: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    burnFeeRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    calculateBurnFee(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateMintFee(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    capacity(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    distributeFees(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    feesEscrowed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getReserves(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isResolverCached(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastPauseTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mint(
      amountIn: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mintFeeRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rebuildCache(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    resolver(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sETHIssued(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sUSDIssued(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setPaused(
      _paused: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    totalIssuedSynths(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    weth(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
