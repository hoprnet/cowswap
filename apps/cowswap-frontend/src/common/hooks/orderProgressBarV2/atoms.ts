import { atom } from 'jotai'

import { deepEqual } from '@cowprotocol/common-utils'

import {
  OrderProgressBarState,
  OrderProgressBarStepName,
  OrdersProgressBarCountdown,
  OrdersProgressBarState
} from './types'

/**
 * Base Atom for orders progress bar state
 */
export const ordersProgressBarStateAtom = atom<OrdersProgressBarState>({})

/**
 * Derived atom exposing only the countdown
 */
export const ordersProgressBarCountdown = atom(
  (get) => {
    const fullState = get(ordersProgressBarStateAtom)

    return Object.keys(fullState).reduce<OrdersProgressBarCountdown>((acc, orderId) => {
      const countdown = fullState[orderId].countdown
      if (countdown) {
        acc[orderId] = countdown
      }
      return acc
    }, {})
  },
  (get, set, countdowns: OrdersProgressBarCountdown) => {
    const fullState = { ...get(ordersProgressBarStateAtom) }
    Object.keys(countdowns).forEach((orderId) => {
      fullState[orderId].countdown = countdowns[orderId]
    })
    set(ordersProgressBarStateAtom, fullState)
  }
)

type UpdateOrderProgressBarCountdownParams = {
  orderId: string
  value: number | null
}

/**
 * Derived write-only atom for updating a single countdown at a time
 */
export const updateOrderProgressBarCountdown = atom(
  null,
  (get, set, { orderId, value }: UpdateOrderProgressBarCountdownParams) => {
    const fullState = get(ordersProgressBarStateAtom)

    const singleOrderState = { ...fullState[orderId] }
    const currentValue = singleOrderState.countdown

    if (currentValue === value) {
      return
    }

    if (value === null) {
      delete singleOrderState.countdown
    } else {
      singleOrderState.countdown = value
    }

    set(ordersProgressBarStateAtom, { ...fullState, [orderId]: singleOrderState })
  }
)

type UpdateOrderProgressBarStepNameParams = {
  orderId: string
  value: OrderProgressBarStepName
}

/**
 * Derived write-only atom for updating a single progressBarStepName at a time
 */
export const updateOrderProgressBarStepName = atom(
  null,
  (get, set, { orderId, value }: UpdateOrderProgressBarStepNameParams) => {
    const fullState = get(ordersProgressBarStateAtom)

    const singleOrderState = { ...fullState[orderId] }
    const currentValue = singleOrderState.progressBarStepName

    if (currentValue === value) {
      return
    }

    singleOrderState.progressBarStepName = value

    set(ordersProgressBarStateAtom, { ...fullState, [orderId]: singleOrderState })
  }
)

type UpdateOrderProgressBarBackendInfoParams = {
  orderId: string
  value: Pick<OrderProgressBarState, 'backendApiStatus' | 'solverCompetition'>
}

/**
 * Derived write-only atom for updating a single order backendApiStatus and solverCompetition
 */
export const updateOrderProgressBarBackendInfo = atom(
  null,
  (get, set, { orderId, value: { backendApiStatus, solverCompetition } }: UpdateOrderProgressBarBackendInfoParams) => {
    const fullState = get(ordersProgressBarStateAtom)

    const singleOrderState = { ...fullState[orderId] }
    const currentBackendApiStatus = singleOrderState.backendApiStatus
    const currentSolverCompetition = singleOrderState.solverCompetition

    if (
      currentBackendApiStatus === backendApiStatus &&
      // Both are empty
      (currentSolverCompetition === solverCompetition ||
        // Both are not empty, can compare with deepEqual
        (currentSolverCompetition && solverCompetition && deepEqual(currentSolverCompetition, solverCompetition)))
    ) {
      return
    }

    set(ordersProgressBarStateAtom, {
      ...fullState,
      [orderId]: { ...singleOrderState, backendApiStatus, solverCompetition },
    })
  }
)
