import { useWeb3React } from '@cow/common/hooks/useWeb3React'
import { isSupportedChainId } from 'lib/hooks/routing/clientSideSmartOrderRouter'

export default function useAutoRouterSupported(): boolean {
  const { chainId } = useWeb3React()
  return isSupportedChainId(chainId)
}
