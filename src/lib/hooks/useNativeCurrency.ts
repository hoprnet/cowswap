import { NativeCurrency, Token } from '@uniswap/sdk-core'
import { useWeb3React } from '@cow/common/hooks/useWeb3React'
import { SupportedChainId } from '@src/constants/chains'
import { nativeOnChain } from 'constants/tokens'
import { useMemo } from 'react'

export default function useNativeCurrency(): NativeCurrency | Token {
  const { chainId } = useWeb3React()
  return useMemo(
    () =>
      chainId
        ? nativeOnChain(chainId)
        : // display mainnet when not connected
          nativeOnChain(SupportedChainId.MAINNET),
    [chainId]
  )
}
