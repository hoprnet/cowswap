import { useMemo } from 'react'

import { EnrichedOrder } from '@cowprotocol/cow-sdk'
import { GP_ORDER_UPDATE_INTERVAL } from '@cowswap/common-const'
import { isBarnBackendEnv } from '@cowswap/common-utils'
import { useWalletInfo } from '@cowswap/wallet'

import useSWR from 'swr'

import { getOrders } from 'api/gnosisProtocol'

import { useApiOrders } from './useApiOrders'
import { useSWROrdersRequest } from './useSWROrdersRequest'

// Fetch PROD orders only when current env is not prod
// We need them for TWAP, because WatchTower creates orders only on Prod
export function useSWRProdOrders(): EnrichedOrder[] {
  const { chainId } = useWalletInfo()
  const requestParams = useSWROrdersRequest()
  const apiOrders = useApiOrders()

  const { data: loadedProdOrders = [] } = useSWR<EnrichedOrder[]>(
    ['prod-orders', requestParams, chainId],
    () => {
      if (!chainId || !requestParams) return []
      if (!isBarnBackendEnv) return []

      return getOrders(requestParams, { chainId, env: 'prod' })
    },
    { refreshInterval: GP_ORDER_UPDATE_INTERVAL }
  )

  return useMemo(() => {
    return isBarnBackendEnv ? loadedProdOrders : apiOrders
  }, [apiOrders, loadedProdOrders])
}
