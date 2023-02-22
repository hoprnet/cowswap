import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { useMemo } from 'react'
import { useAccount, useChainId } from 'wagmi'

export const useWeb3React = () => {
  const params = useWeb3ReactCore()

  const { address: account, isConnected: isActive, isConnecting: isActivating, connector } = useAccount()
  const chainId = useChainId()

  console.log('chain id', chainId, params.chainId)

  return useMemo(() => {
    const output = { ...params, account, isActive, isActivating, chainId }

    return output
  }, [params, account, isActive, isActivating, chainId])
}
