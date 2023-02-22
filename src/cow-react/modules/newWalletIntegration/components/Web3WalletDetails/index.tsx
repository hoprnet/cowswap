import { ConnectOption } from '../ConnectOption'
import CoinbaseIcon from 'assets/icons/coinbase.svg'
import MetamaskIcon from 'assets/icons/metamask.png'
import WalletConnectIcon from 'assets/icons/walletconnect.svg'
import LedgerIcon from 'assets/icons/ledger.svg'
import TrustWalletIcon from 'assets/icons/trustWallet.png'
import TallyHoWallet from 'assets/icons/tallyho.svg'
import { injected, coinbase, walletConnect, ledger, trustWallet, tallyHoWallet } from './connectors'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
  display: grid;
  max-width: 400px;
  grid-template-columns: 1fr 1fr;
`

export const WalletDetails = () => {
  return (
    <Wrapper>
      <ConnectOption icon={MetamaskIcon} connector={injected} name={'Injected'} />
      <ConnectOption icon={CoinbaseIcon} connector={coinbase} name={'Coinbase'} />
      <ConnectOption icon={LedgerIcon} connector={ledger} name={'Ledger'} />
      <ConnectOption icon={WalletConnectIcon} connector={walletConnect} name={'WalletConnect'} />
      <ConnectOption icon={TrustWalletIcon} connector={trustWallet} name={'Trust wallet'} />
      <ConnectOption icon={TallyHoWallet} connector={tallyHoWallet} name={'TallyHo wallet'} />
    </Wrapper>
  )
}
