import styled from 'styled-components/macro'
import { TokenResult } from '@cow/common/hooks/useTokenSearch/useTokenSearch'
import { SearchCategoryHeader } from '../SearchCategoryHeader'
import { TokenRow } from '../TokenRow'

type TokenListCategoryType = 'recent-searches' | 'your-tokens' | 'tokens'

interface TokenListCategory {
  type: TokenListCategoryType
  list: TokenResult[]
}

interface TokenListProps {
  data: TokenListCategory[]
}

const Container = styled.div``
const CategoryContainer = styled.div``

const RecentSearchesHeader = styled(SearchCategoryHeader).attrs({
  title: 'Recent searches',
  icon: 'clock',
})``
const YourTokensHeader = styled(SearchCategoryHeader).attrs({
  title: 'Your tokens',
  icon: 'upwards-ticker',
})``
const TokensHeader = styled(SearchCategoryHeader).attrs({
  title: 'Tokens',
  icon: 'upwards-ticker',
})``

function CategoryHeader({ type }: { type: TokenListCategoryType }) {
  switch (type) {
    case 'recent-searches':
      return <RecentSearchesHeader />
    case 'your-tokens':
      return <YourTokensHeader />
    case 'tokens':
      return <TokensHeader />
    default:
      return <></>
  }
}

export function TokenList({ data }: TokenListProps) {
  return (
    <Container>
      {data.map(({ type, list }) => (
        <CategoryContainer key={type}>
          <CategoryHeader type={type} />
          {list.map((token) => (
            <TokenRow key={token.id} token={token} />
          ))}
        </CategoryContainer>
      ))}
    </Container>
  )
}
