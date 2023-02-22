import { InjectedConnector } from 'wagmi/connectors/injected'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { LedgerConnector } from 'wagmi/connectors/ledger'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { TrustWalletConnector } from './TrustWalletConnector'
import { TallyHoWalletConnector } from './TallyHoWalletConnector'
import { mainnet, gnosis, goerli } from 'wagmi/chains'
import { Buffer } from 'buffer'

// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer
}

export const injected = new InjectedConnector({
  chains: [mainnet, gnosis, goerli],
})

export const coinbase = new CoinbaseWalletConnector({
  chains: [mainnet, gnosis, goerli],
  options: {
    appName: 'wagmi.sh',
    jsonRpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/yourAlchemyId',
  },
})

export const ledger = new LedgerConnector({
  chains: [mainnet, gnosis, goerli],
})

export const walletConnect = new WalletConnectConnector({
  options: {
    qrcode: true,
  },
})

export const trustWallet = new TrustWalletConnector({
  chains: [mainnet, gnosis, goerli],
})

export const tallyHoWallet = new TallyHoWalletConnector({
  chains: [mainnet, gnosis, goerli],
})
