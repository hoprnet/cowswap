import { useAtomValue, useSetAtom } from 'jotai'
import React, { useCallback, useEffect } from 'react'

import { isFractionFalsy } from '@cowprotocol/common-utils'
import { BundleTxApprovalBanner, BundleTxSafeWcBanner, SmallVolumeWarningBanner } from '@cowprotocol/ui'
import { useIsSafeViaWc } from '@cowprotocol/wallet'
import { Currency, CurrencyAmount } from '@uniswap/sdk-core'

import styled from 'styled-components/macro'
import { Nullish } from 'types'

import { useInjectedWidgetParams } from 'modules/injectedWidget'
import { useLimitOrdersDerivedState } from 'modules/limitOrders/hooks/useLimitOrdersDerivedState'
import { useLimitOrdersFormState } from 'modules/limitOrders/hooks/useLimitOrdersFormState'
import { useRateImpact } from 'modules/limitOrders/hooks/useRateImpact'
import {
  limitOrdersWarningsAtom,
  updateLimitOrdersWarningsAtom,
} from 'modules/limitOrders/state/limitOrdersWarningsAtom'
import { SellNativeWarningBanner } from 'modules/trade/containers/SellNativeWarningBanner'
import { useGetTradeFormValidation } from 'modules/tradeFormValidation'
import { TradeFormValidation } from 'modules/tradeFormValidation/types'
import { useTradeQuote } from 'modules/tradeQuote'
import { useShouldZeroApprove } from 'modules/zeroApproval'

import { HIGH_FEE_WARNING_PERCENTAGE } from 'common/constants/common'
import { ZeroApprovalWarning } from 'common/pure/ZeroApprovalWarning'
import { calculatePercentageInRelationToReference } from 'utils/orderUtils/calculatePercentageInRelationToReference'

import { RateImpactWarning } from '../../pure/RateImpactWarning'

const FORM_STATES_TO_SHOW_BUNDLE_BANNER = [TradeFormValidation.ApproveAndSwap]

export interface LimitOrdersWarningsProps {
  feeAmount?: Nullish<CurrencyAmount<Currency>>
  isConfirmScreen?: boolean
  className?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 10px;
`

const StyledRateImpactWarning = styled(RateImpactWarning)`
  margin: 10px auto 0;
`

export function LimitOrdersWarnings(props: LimitOrdersWarningsProps) {
  const { feeAmount, isConfirmScreen = false, className } = props

  const { isRateImpactAccepted } = useAtomValue(limitOrdersWarningsAtom)
  const updateLimitOrdersWarnings = useSetAtom(updateLimitOrdersWarningsAtom)

  const localFormValidation = useLimitOrdersFormState()
  const primaryFormValidation = useGetTradeFormValidation()
  const rateImpact = useRateImpact()
  const { slippageAdjustedSellAmount, inputCurrency, inputCurrencyAmount, outputCurrency, outputCurrencyAmount } =
    useLimitOrdersDerivedState()
  const tradeQuote = useTradeQuote()
  const { banners: widgetBanners } = useInjectedWidgetParams()

  const isBundling = primaryFormValidation && FORM_STATES_TO_SHOW_BUNDLE_BANNER.includes(primaryFormValidation)

  const canTrade = localFormValidation === null && (primaryFormValidation === null || isBundling) && !tradeQuote.error

  const showRateImpactWarning =
    canTrade && inputCurrency && !isFractionFalsy(inputCurrencyAmount) && !isFractionFalsy(outputCurrencyAmount)

  const feePercentage = calculatePercentageInRelationToReference({ value: feeAmount, reference: inputCurrencyAmount })

  const showHighFeeWarning = feePercentage?.greaterThan(HIGH_FEE_WARNING_PERCENTAGE)

  const showApprovalBundlingBanner = !isConfirmScreen && isBundling
  const shouldZeroApprove = useShouldZeroApprove(slippageAdjustedSellAmount)
  const showZeroApprovalWarning = shouldZeroApprove && outputCurrency !== null // Show warning only when output currency is also present.

  const isSafeViaWc = useIsSafeViaWc()
  const showSafeWcBundlingBanner =
    !isConfirmScreen &&
    !showApprovalBundlingBanner &&
    isSafeViaWc &&
    primaryFormValidation === TradeFormValidation.ApproveRequired &&
    !widgetBanners?.hideSafeWebAppBanner

  // TODO: implement Safe App EthFlow bundling for LIMIT and disable the warning in that case
  const showNativeSellWarning = primaryFormValidation === TradeFormValidation.SellNativeToken

  const isVisible =
    rateImpact < 0 ||
    showHighFeeWarning ||
    showApprovalBundlingBanner ||
    showSafeWcBundlingBanner ||
    shouldZeroApprove ||
    showNativeSellWarning

  // Reset rate impact before opening confirmation screen
  useEffect(() => {
    if (isConfirmScreen) {
      updateLimitOrdersWarnings({ isRateImpactAccepted: false })
    }
  }, [updateLimitOrdersWarnings, isConfirmScreen])

  const onAcceptRateImpact = useCallback(
    (value: boolean) => {
      updateLimitOrdersWarnings({ isRateImpactAccepted: value })
    },
    [updateLimitOrdersWarnings],
  )

  return isVisible ? (
    <Wrapper className={className}>
      {showZeroApprovalWarning && <ZeroApprovalWarning currency={inputCurrency} />}
      {showRateImpactWarning && (
        <StyledRateImpactWarning
          withAcknowledge={isConfirmScreen}
          isAccepted={isRateImpactAccepted}
          rateImpact={rateImpact}
          inputCurrency={inputCurrency}
          onAcknowledgeChange={onAcceptRateImpact}
        />
      )}

      {/*// TODO: must be replaced by <NotificationBanner>*/}
      {showHighFeeWarning && <SmallVolumeWarningBanner feeAmount={feeAmount} feePercentage={feePercentage} />}
      {showApprovalBundlingBanner && <BundleTxApprovalBanner />}
      {showSafeWcBundlingBanner && <BundleTxSafeWcBanner />}
      {showNativeSellWarning && <SellNativeWarningBanner />}
    </Wrapper>
  ) : null
}
