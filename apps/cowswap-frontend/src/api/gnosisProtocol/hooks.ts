import { EnrichedOrder } from '@cowprotocol/cow-sdk'
import { GP_ORDER_UPDATE_INTERVAL } from '@cowswap/common-const'
import { useWalletInfo } from '@cowswap/wallet'

import useSWR from 'swr'

import { useSWROrdersRequest } from 'modules/orders/hooks/useSWROrdersRequest'

import { getOrders } from './api'

export function useGpOrders(): EnrichedOrder[] {
  const { chainId } = useWalletInfo()

  const requestParams = useSWROrdersRequest()

  // Fetch orders for the current environment
  const { data: currentEnvOrders } = useSWR<EnrichedOrder[]>(
    ['orders', requestParams, chainId],
    () => {
      if (!chainId || !requestParams) return []

      return getOrders(requestParams, { chainId })
    },
    { refreshInterval: GP_ORDER_UPDATE_INTERVAL }
  )

  return currentEnvOrders || []
}
