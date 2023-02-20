import { useWeb3React } from '@cow/common/hooks/useWeb3React'
import { GP_VAULT_RELAYER } from 'constants/index'
import { useMemo } from 'react'

export function useTradeSpenderAddress(): string | undefined {
  const { chainId } = useWeb3React()

  return useMemo(() => (chainId ? GP_VAULT_RELAYER[chainId] : undefined), [chainId])
}
