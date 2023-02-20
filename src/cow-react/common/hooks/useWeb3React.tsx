import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { useAccount } from 'wagmi'

export const useWeb3React = () => {
  const params = useWeb3ReactCore()
  const { address: account, isConnected: isActive, isConnecting: isActivating, connector } = useAccount()

  const output = { ...params, account, isActive, isActivating }

  return output
}
