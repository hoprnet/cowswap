import React from 'react'

import { Field } from 'legacy/state/types'

import { TradeWidget, useReceiveAmountInfo, useTradeConfirmState, useTradePriceImpact } from 'modules/trade'
import { useTradeQuote } from 'modules/tradeQuote'
import { SettingsTab, TradeRateDetails } from 'modules/tradeWidgetAddons'

import { useRateInfoParams } from 'common/hooks/useRateInfoParams'
import { CurrencyInfo } from 'common/pure/CurrencyInputPanel/types'

import { useTradeFlowContext } from '../../hooks/useTradeFlowContext'
import { useYieldDerivedState } from '../../hooks/useYieldDerivedState'
import { useYieldDeadlineState, useYieldRecipientToggleState, useYieldSettings } from '../../hooks/useYieldSettings'
import { useYieldWidgetActions } from '../../hooks/useYieldWidgetActions'
import { TradeButtons } from '../TradeButtons'
import { YieldConfirmModal } from '../YieldConfirmModal'

export function YieldWidget() {
  const { showRecipient } = useYieldSettings()
  const deadlineState = useYieldDeadlineState()
  const recipientToggleState = useYieldRecipientToggleState()
  const { isLoading: isRateLoading } = useTradeQuote()
  const priceImpact = useTradePriceImpact()
  const { isOpen: isConfirmOpen } = useTradeConfirmState()
  const widgetActions = useYieldWidgetActions()
  const receiveAmountInfo = useReceiveAmountInfo()

  const {
    inputCurrency,
    outputCurrency,
    inputCurrencyAmount,
    outputCurrencyAmount,
    inputCurrencyBalance,
    outputCurrencyBalance,
    inputCurrencyFiatAmount,
    outputCurrencyFiatAmount,
    recipient,
  } = useYieldDerivedState()
  const tradeFlowContext = useTradeFlowContext()

  const inputCurrencyInfo: CurrencyInfo = {
    field: Field.INPUT,
    currency: inputCurrency,
    amount: inputCurrencyAmount,
    isIndependent: true,
    balance: inputCurrencyBalance,
    fiatAmount: inputCurrencyFiatAmount,
    receiveAmountInfo: null,
  }
  const outputCurrencyInfo: CurrencyInfo = {
    field: Field.OUTPUT,
    currency: outputCurrency,
    amount: outputCurrencyAmount,
    isIndependent: true,
    balance: outputCurrencyBalance,
    fiatAmount: outputCurrencyFiatAmount,
    receiveAmountInfo,
  }
  const inputCurrencyPreviewInfo = {
    amount: inputCurrencyInfo.amount,
    fiatAmount: inputCurrencyInfo.fiatAmount,
    balance: inputCurrencyInfo.balance,
    label: inputCurrencyInfo.label,
  }

  const outputCurrencyPreviewInfo = {
    amount: outputCurrencyInfo.amount,
    fiatAmount: outputCurrencyInfo.fiatAmount,
    balance: outputCurrencyInfo.balance,
    label: outputCurrencyInfo.label,
  }

  const rateInfoParams = useRateInfoParams(inputCurrencyInfo.amount, outputCurrencyInfo.amount)

  const slots = {
    settingsWidget: <SettingsTab recipientToggleState={recipientToggleState} deadlineState={deadlineState} />,
    bottomContent: (
      <>
        <TradeRateDetails rateInfoParams={rateInfoParams} deadline={deadlineState[0]} />
        <TradeButtons isTradeContextReady={!!tradeFlowContext} />
      </>
    ),
  }

  const params = {
    compactView: false,
    recipient,
    showRecipient,
    isTradePriceUpdating: isRateLoading,
    priceImpact,
    disableQuotePolling: isConfirmOpen,
  }

  return (
    <TradeWidget
      disableOutput
      slots={slots}
      actions={widgetActions}
      params={params}
      inputCurrencyInfo={inputCurrencyInfo}
      outputCurrencyInfo={outputCurrencyInfo}
      confirmModal={
        tradeFlowContext ? (
          <YieldConfirmModal
            tradeFlowContext={tradeFlowContext}
            recipient={recipient}
            priceImpact={priceImpact}
            inputCurrencyInfo={inputCurrencyPreviewInfo}
            outputCurrencyInfo={outputCurrencyPreviewInfo}
          />
        ) : null
      }
    />
  )
}
