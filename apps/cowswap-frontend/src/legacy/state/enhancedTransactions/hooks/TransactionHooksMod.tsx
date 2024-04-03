import { useMemo } from 'react'

import { useWalletInfo } from '@cowprotocol/wallet'

import { useAppSelector } from '../../hooks'
import { EnhancedTransactionDetails } from '../reducer'

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: EnhancedTransactionDetails } {
  const { chainId } = useWalletInfo()

  const state = useAppSelector((state) => state.transactions)

  return chainId ? state[chainId] ?? {} : {}
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: EnhancedTransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(tokenAddress: string | undefined, spender: string | undefined): boolean {
  const allTransactions = useAllTransactions()

  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash]
        if (!tx || tx.receipt || tx.replacementType) return false

        const approval = tx.approval
        if (!approval) return false

        return (
          approval.spender.toLowerCase() === spender.toLowerCase() &&
          approval.tokenAddress.toLowerCase() === tokenAddress &&
          isTransactionRecent(tx)
        )
      }),
    [allTransactions, spender, tokenAddress]
  )
}
