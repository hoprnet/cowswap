import { TokenResult } from '@cow/common/hooks/useTokenSearch/useTokenSearch'
import styled from 'styled-components/macro'
import { TokenImage } from '../TokenImage'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.bg0};
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.blueLight1};
  }
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.5rem;
`
const Symbol = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text1};
  margin: 0;
`
const Name = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text1};
  margin: 0;
`
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-left: auto;
  margin-right: 0.5rem;
`
const Price = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text1};
  margin: 0;
`
const PercentageChange = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text1};
  margin: 0;
`

interface TokenRowProps {
  token: TokenResult
}

export function TokenRow({ token }: TokenRowProps) {
  return (
    <Container>
      <TokenImage src={token.project.logoUrl} tokenName={token.name} />
      <LeftContainer>
        <Symbol>{token.symbol}</Symbol>
        <Name>{token.name}</Name>
      </LeftContainer>
      <RightContainer>
        <Price>{`${token.market.price.currency} ${token.market.price.value}`}</Price>
        <PercentageChange>{token.market.pricePercentChange.value}</PercentageChange>
      </RightContainer>
    </Container>
  )
}
