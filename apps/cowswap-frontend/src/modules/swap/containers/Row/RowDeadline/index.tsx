import { useMemo } from 'react'

import { useUserTransactionTTL } from 'legacy/state/user/hooks'

import { RowDeadlineContent } from 'modules/swap/pure/Row/RowDeadline'
import { useIsEoaEthFlow } from 'modules/trade'
import { useIsWrapOrUnwrap } from 'modules/trade/hooks/useIsWrapOrUnwrap'

import useNativeCurrency from 'lib/hooks/useNativeCurrency'

export function RowDeadline() {
  const [userDeadline] = useUserTransactionTTL()
  const isEoaEthFlow = useIsEoaEthFlow()
  const nativeCurrency = useNativeCurrency()
  const isWrapOrUnwrap = useIsWrapOrUnwrap()

  const props = useMemo(() => {
    const displayDeadline = Math.floor(userDeadline / 60) + ' minutes'
    return {
      userDeadline,
      symbols: [nativeCurrency.symbol],
      displayDeadline,
      isEoaEthFlow,
      isWrapOrUnwrap,
    }
  }, [isEoaEthFlow, isWrapOrUnwrap, nativeCurrency.symbol, userDeadline])

  if (!isEoaEthFlow || isWrapOrUnwrap) {
    return null
  }

  return <RowDeadlineContent {...props} />
}
