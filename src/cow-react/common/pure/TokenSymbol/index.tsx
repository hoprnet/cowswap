// import { formatSymbol } from '@cow/utils/format'
import { Currency } from '@uniswap/sdk-core'
import styled from 'styled-components/macro'

type WrapperProps = {
  $maxWidth?: string
}

const Wrapper = styled.span<WrapperProps>`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inherit;
  ${({ $maxWidth }) => ($maxWidth ? `max-width: ${$maxWidth};` : '')}
`

export type Props = {
  token: Pick<Currency, 'symbol' | 'name'> | undefined | null
  length?: number
}

export function TokenSymbol({ token, length }: Props) {
  const { symbol, name } = token || {}

  if (!symbol || !name) {
    return null
  }

  const fullSymbol = symbol || name
  // const abbreviateSymbol = formatSymbol(fullSymbol, length)

  return (
    <Wrapper title={fullSymbol} $maxWidth={'100px'}>
      {fullSymbol}
    </Wrapper>
  )
}
