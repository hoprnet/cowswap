import { ParsedOrder } from '@cow/modules/limitOrders/containers/OrdersWidget/hooks/useLimitOrdersList'
import { formatSmart } from 'utils/format'
import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import * as styledEl from './styled'
import tryParseCurrencyAmount from 'lib/utils/tryParseCurrencyAmount'

export type Props = { order: ParsedOrder }

export function FeeField({ order }: Props): JSX.Element | null {
  const { executedFeeAmount, inputToken, sellToken } = order

  let formattedExecutedFee: string | undefined = executedFeeAmount?.toString(10) || ''
  let quoteSymbol: string | undefined = sellToken
  let executedFeeCurrency: CurrencyAmount<Token> | undefined

  if (sellToken) {
    executedFeeCurrency = tryParseCurrencyAmount(executedFeeAmount?.toFixed(inputToken.decimals), inputToken)
    formattedExecutedFee = formatSmart(executedFeeCurrency)
    quoteSymbol = inputToken.symbol
  }

  return (
    <styledEl.Value>
      {!quoteSymbol || !formattedExecutedFee ? (
        <span>-</span>
      ) : (
        <span title={`${executedFeeCurrency?.toExact()} ${quoteSymbol}`}>
          {formattedExecutedFee} {quoteSymbol}
        </span>
      )}
    </styledEl.Value>
  )
}
