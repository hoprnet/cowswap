import { Chain, ConnectorNotFoundError, Ethereum, UserRejectedRequestError } from '@wagmi/core'
import { Address } from 'abitype'
import { getAddress } from 'ethers/lib/utils.js'

import { InjectedConnector, InjectedConnectorOptions } from '@wagmi/core'

type Window = typeof window & {
  tallyHo: Ethereum
  ethereum: Ethereum
}

export class TallyHoWalletConnector extends InjectedConnector {
  readonly id = 'tallyHo'
  readonly ready = true

  constructor({
    chains,
    options: options_,
  }: {
    chains?: Chain[]
    options?: InjectedConnectorOptions
  } = {}) {
    const options = {
      name: 'TallyHo Wallet',
      shimDisconnect: true,
      getProvider() {
        function isTallyWallet(ethereum?: any) {
          const isTally = !!ethereum?.isTally || !!ethereum?.isTally
          if (!isTally) return
          return ethereum
        }

        if (typeof window === 'undefined') return

        return (
          isTallyWallet(window.ethereum) ||
          (window as Window).tallyHo ||
          window.ethereum?.providers?.find(isTallyWallet)
        )
      },
      ...options_,
    }
    super({ chains, options })
  }

  async connect(config?: { chainId?: number | undefined } | undefined) {
    try {
      const provider = await this.getProvider()

      if (!provider) {
        window.open('https://chrome.google.com/webstore/detail/tally-ho/eajafomhmkipbjmfmhebemolkcicgfmd/', '_blank')
        throw new ConnectorNotFoundError()
      }

      let account: Address | null = null

      if (provider.on) {
        provider.on('connect', this.connect)
        provider.on('accountsChanged', this.onAccountsChanged)
        provider.on('chainChanged', this.onChainChanged)
        provider.on('disconnect', this.onDisconnect)
      }

      const id = await this.getChainId()
      const unsupported = this.isChainUnsupported(id)

      try {
        await provider.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        })
        account = await this.getAccount()
      } catch (error) {
        if (this.isUserRejectedRequestError(error)) {
          throw new UserRejectedRequestError(error)
        }
      }

      if (!account) {
        const accounts = await provider.request({
          method: 'eth_requestAccounts',
        })
        account = getAddress(accounts[0] as string)
      }

      if (config?.chainId && id !== config?.chainId) {
        this.switchChain(config.chainId)
      }

      return {
        account,
        chain: { id, unsupported },
        provider,
      }
    } catch (error) {
      if (this.isUserRejectedRequestError(error)) {
        throw new UserRejectedRequestError(error)
      }
      throw error
    }
  }
}
