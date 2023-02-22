import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Connector } from 'wagmi'
import styled from 'styled-components/macro'

type ConnectType = {
  connector: Connector
  name: string
  icon: string
}

const ConnectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid blue;
  border-radius: 5px;
  background: transparent;
  width: auto;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;

  img {
    margin-right: 5px;
    max-width: 30px;
  }
`

export const ConnectOption = ({ connector, name, icon }: ConnectType) => {
  const { connect } = useConnect({ connector })
  const { disconnect } = useDisconnect()
  const { isConnecting, isConnected, connector: c } = useAccount()

  const isThisConnected = isConnected && connector.id === c?.id
  const isThisConnecting = isConnecting && connector.id === c?.id

  return (
    <ConnectButton disabled={isConnecting} onClick={() => (isThisConnected ? disconnect() : connect())}>
      <img src={icon} alt={`${name} icon`} />
      <span>{isThisConnecting ? 'connecting' : isThisConnected ? 'disconnect' : `${name}`}</span>
    </ConnectButton>
  )
}
