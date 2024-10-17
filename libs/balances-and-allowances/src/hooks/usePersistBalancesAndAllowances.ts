import { useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { useEffect, useMemo } from 'react'

import { ERC_20_INTERFACE } from '@cowprotocol/abis'
import { usePrevious } from '@cowprotocol/common-hooks'
import { getIsNativeToken } from '@cowprotocol/common-utils'
import { COW_PROTOCOL_VAULT_RELAYER_ADDRESS, SupportedChainId } from '@cowprotocol/cow-sdk'
import { MultiCallOptions, useMultipleContractSingleData } from '@cowprotocol/multicall'
import { BigNumber } from '@ethersproject/bignumber'

import { SWRConfiguration } from 'swr'

import { AllowancesState, allowancesFullState } from '../state/allowancesAtom'
import { balancesAtom, BalancesState } from '../state/balancesAtom'

const MULTICALL_OPTIONS = {}

export interface PersistBalancesAndAllowancesParams {
  account: string | undefined
  chainId: SupportedChainId
  tokenAddresses: string[]
  balancesSwrConfig: SWRConfiguration
  allowancesSwrConfig: SWRConfiguration
  setLoadingState?: boolean
  multicallOptions?: MultiCallOptions
}

export function usePersistBalancesAndAllowances(params: PersistBalancesAndAllowancesParams) {
  const {
    account,
    chainId,
    tokenAddresses,
    setLoadingState,
    balancesSwrConfig,
    allowancesSwrConfig,
    multicallOptions = MULTICALL_OPTIONS,
  } = params

  const prevAccount = usePrevious(account)
  const setBalances = useSetAtom(balancesAtom)
  const setAllowances = useSetAtom(allowancesFullState)

  const resetBalances = useResetAtom(balancesAtom)
  const resetAllowances = useResetAtom(allowancesFullState)

  const spender = COW_PROTOCOL_VAULT_RELAYER_ADDRESS[chainId]

  const balanceOfParams = useMemo(() => (account ? [account] : undefined), [account])
  const allowanceParams = useMemo(() => (account && spender ? [account, spender] : undefined), [account, spender])

  const { isLoading: isBalancesLoading, data: balances } = useMultipleContractSingleData<{ balance: BigNumber }>(
    tokenAddresses,
    ERC_20_INTERFACE,
    'balanceOf',
    balanceOfParams,
    multicallOptions,
    balancesSwrConfig,
  )

  const { isLoading: isAllowancesLoading, data: allowances } = useMultipleContractSingleData<[BigNumber]>(
    tokenAddresses,
    ERC_20_INTERFACE,
    'allowance',
    allowanceParams,
    multicallOptions,
    allowancesSwrConfig,
  )

  // Set balances loading state
  useEffect(() => {
    if (!setLoadingState) return

    setBalances((state) => ({ ...state, isLoading: isBalancesLoading }))
  }, [setBalances, isBalancesLoading, setLoadingState])

  // Set allwoances loading state
  useEffect(() => {
    if (!setLoadingState) return

    setAllowances((state) => ({ ...state, isLoading: isAllowancesLoading }))
  }, [setAllowances, isAllowancesLoading, setLoadingState])

  // Set balances to the store
  useEffect(() => {
    if (!balances || !balances.length) return

    const balancesState = tokenAddresses.reduce<BalancesState['values']>((acc, address, index) => {
      if (getIsNativeToken(chainId, address)) return acc

      acc[address.toLowerCase()] = balances[index]?.balance
      return acc
    }, {})

    setBalances((state) => {
      return {
        ...state,
        values: { ...state.values, ...balancesState },
        ...(setLoadingState ? { isLoading: false } : {}),
      }
    })
  }, [balances, tokenAddresses, setBalances, chainId, setLoadingState])

  // Set allowances to the store
  useEffect(() => {
    if (!allowances || !allowances.length) return

    const allowancesState = tokenAddresses.reduce<AllowancesState['values']>((acc, address, index) => {
      acc[address.toLowerCase()] = allowances[index]?.[0]
      return acc
    }, {})

    setAllowances((state) => {
      return {
        ...state,
        values: { ...state.values, ...allowancesState },
        ...(setLoadingState ? { isLoading: false } : {}),
      }
    })
  }, [allowances, tokenAddresses, setAllowances, setLoadingState])

  // Reset states when wallet is not connected
  useEffect(() => {
    if (prevAccount && prevAccount !== account) {
      resetBalances()
      resetAllowances()
    }
  }, [account, prevAccount, resetAllowances, resetBalances])
}
