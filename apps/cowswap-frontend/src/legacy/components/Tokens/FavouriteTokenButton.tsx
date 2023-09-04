import { MouseEventHandler, useCallback, useMemo } from 'react'

import { ButtonStar } from '@cowswap/ui'
import { Token } from '@uniswap/sdk-core'

import styled from 'styled-components/macro'

import useTheme from 'legacy/hooks/useTheme'
import { useFavouriteTokens, useToggleFavouriteToken } from 'legacy/state/user/hooks'

export const StyledButtonStar = styled(ButtonStar)`
  z-index: 9;
`

type FavouriteTokenButtonParams = {
  tokenData: Token
}

export default function FavouriteTokenButton({ tokenData }: FavouriteTokenButtonParams) {
  const favouriteTokens = useFavouriteTokens()
  const theme = useTheme()

  const toggleFavouriteToken = useToggleFavouriteToken()

  const handleFavouriteToken: MouseEventHandler = useCallback(
    (event) => {
      event.preventDefault()
      toggleFavouriteToken(tokenData)
    },
    [toggleFavouriteToken, tokenData]
  )

  const isFavouriteToken = useMemo(
    () => favouriteTokens.some((t: Token) => t.address === tokenData.address),
    [favouriteTokens, tokenData]
  )

  return (
    <StyledButtonStar
      stroke={theme.text1}
      fill={isFavouriteToken ? theme.text1 : undefined}
      onClick={handleFavouriteToken}
    />
  )
}
