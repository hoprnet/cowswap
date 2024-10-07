import { atom } from 'jotai/index'
import { atomWithStorage } from 'jotai/utils'

import { atomWithPartialUpdate } from '@cowprotocol/common-utils'
import { getJotaiIsolatedStorage } from '@cowprotocol/core'
import { OrderKind, SupportedChainId } from '@cowprotocol/cow-sdk'

import { DEFAULT_TRADE_DERIVED_STATE, TradeDerivedState } from 'modules/trade/types/TradeDerivedState'
import { ExtendedTradeRawState, getDefaultTradeRawState } from 'modules/trade/types/TradeRawState'

export interface YieldDerivedState extends TradeDerivedState {}

export interface YieldRawState extends ExtendedTradeRawState {}

export function getDefaultYieldState(chainId: SupportedChainId | null): YieldRawState {
  return {
    ...getDefaultTradeRawState(chainId),
    inputCurrencyAmount: null,
    outputCurrencyAmount: null,
    orderKind: OrderKind.SELL,
  }
}

export const { atom: yieldRawStateAtom, updateAtom: updateYieldRawStateAtom } = atomWithPartialUpdate(
  atomWithStorage<YieldRawState>('yieldStateAtom:v0', getDefaultYieldState(null), getJotaiIsolatedStorage()),
)

export const yieldDerivedStateAtom = atom<YieldDerivedState>({
  ...DEFAULT_TRADE_DERIVED_STATE,
})
