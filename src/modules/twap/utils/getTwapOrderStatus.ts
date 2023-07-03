import { Order, PENDING_STATES } from 'legacy/state/orders/actions'

import { TwapOrderExecutionInfo, TwapOrderStatus, TWAPOrderStruct } from '../types'

export function getTwapOrderStatus(
  order: TWAPOrderStruct,
  isExecuted: boolean,
  executionDate: Date | null,
  auth: boolean | undefined,
  discreteOrder: Order | undefined,
  executionInfo: TwapOrderExecutionInfo
): TwapOrderStatus {
  const isFulfilled = executionInfo.executedSellAmount === (BigInt(order.partSellAmount) * BigInt(order.n)).toString()

  if (isFulfilled) return TwapOrderStatus.Fulfilled

  if (isTwapOrderExpired(order, executionDate)) return TwapOrderStatus.Expired

  if (!isExecuted) return TwapOrderStatus.WaitSigning

  if (auth === false) return TwapOrderStatus.Cancelled

  if (discreteOrder && PENDING_STATES.includes(discreteOrder.status)) return TwapOrderStatus.Pending

  return TwapOrderStatus.Scheduled
}

export function isTwapOrderExpired(order: TWAPOrderStruct, executionDate: Date | null): boolean {
  if (!executionDate) return false

  const startTime = Math.ceil(executionDate.getTime() / 1000)
  const { n: numOfParts, t: timeInterval } = order
  const endTime = startTime + timeInterval * numOfParts
  const nowTimestamp = Math.ceil(Date.now() / 1000)

  return nowTimestamp > endTime
}
