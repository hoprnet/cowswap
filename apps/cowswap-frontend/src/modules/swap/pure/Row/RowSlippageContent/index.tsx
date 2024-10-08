import { SupportedChainId } from '@cowprotocol/cow-sdk'
import { Command } from '@cowprotocol/types'
import { HoverTooltip, LinkStyledButton, RowFixed, UI } from '@cowprotocol/ui'
import { Percent } from '@uniswap/sdk-core'

import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'

import { StyledRowBetween, TextWrapper } from 'modules/swap/pure/Row/styled'
import { RowStyleProps } from 'modules/swap/pure/Row/types'
import { StyledInfoIcon, TransactionText } from 'modules/swap/pure/styled'

import { getNativeSlippageTooltip, getNonNativeSlippageTooltip } from 'common/utils/tradeSettingsTooltips'

export const ClickableText = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;

  > div {
    display: inline-block;
  }
`

const DefaultSlippage = styled.span`
  display: inline-flex;
  color: var(${UI.COLOR_TEXT_OPACITY_70});
  text-decoration: strikethrough;
  font-size: 0.8em;

  a {
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: var(${UI.COLOR_TEXT});
    }
  }
`

const SUGGESTED_SLIPPAGE_TOOLTIP =
  'Based on recent volatility for the selected token pair, this is the suggested slippage for ensuring quick execution of your order.'

export interface RowSlippageContentProps {
  chainId: SupportedChainId
  toggleSettings: Command
  displaySlippage: string
  isEoaEthFlow: boolean
  symbols?: (string | undefined)[]
  wrappedSymbol?: string
  styleProps?: RowStyleProps
  allowedSlippage: Percent
  showSettingOnClick?: boolean
  slippageLabel?: React.ReactNode
  slippageTooltip?: React.ReactNode
  isSlippageModified: boolean
  setAutoSlippage?: Command // todo: make them optional
  smartSlippage?: string
  isSmartSlippageApplied: boolean
}

// TODO: RowDeadlineContent and RowSlippageContent are very similar. Refactor and extract base component?

export function RowSlippageContent(props: RowSlippageContentProps) {
  const {
    chainId,
    showSettingOnClick,
    toggleSettings,
    displaySlippage,
    isEoaEthFlow,
    symbols,
    slippageLabel,
    slippageTooltip,
    styleProps,
    isSlippageModified,
    setAutoSlippage,
    smartSlippage,
    isSmartSlippageApplied,
  } = props

  const tooltipContent =
    slippageTooltip || (isEoaEthFlow ? getNativeSlippageTooltip(chainId, symbols) : getNonNativeSlippageTooltip())

  // In case the user happened to set the same slippage as the suggestion, do not show the suggestion
  const suggestedEqualToUserSlippage = smartSlippage && smartSlippage === displaySlippage

  const displayDefaultSlippage = isSlippageModified &&
    setAutoSlippage &&
    smartSlippage &&
    !suggestedEqualToUserSlippage && (
      <DefaultSlippage>
        <LinkStyledButton onClick={setAutoSlippage}>(Suggested: {smartSlippage})</LinkStyledButton>
        <HoverTooltip wrapInContainer content={SUGGESTED_SLIPPAGE_TOOLTIP}>
          <StyledInfoIcon size={16} />
        </HoverTooltip>
      </DefaultSlippage>
    )

  return (
    <StyledRowBetween {...styleProps}>
      <RowFixed>
        <TextWrapper>
          {showSettingOnClick ? (
            <ClickableText onClick={toggleSettings}>
              <SlippageTextContents
                isEoaEthFlow={isEoaEthFlow}
                slippageLabel={slippageLabel}
                isDynamicSlippageSet={isSmartSlippageApplied}
              />
            </ClickableText>
          ) : (
            <SlippageTextContents
              isEoaEthFlow={isEoaEthFlow}
              slippageLabel={slippageLabel}
              isDynamicSlippageSet={isSmartSlippageApplied}
            />
          )}
        </TextWrapper>
        <HoverTooltip wrapInContainer content={tooltipContent}>
          <StyledInfoIcon size={16} />
        </HoverTooltip>
      </RowFixed>
      <TextWrapper textAlign="right">
        {showSettingOnClick ? (
          <ClickableText onClick={toggleSettings}>
            {displaySlippage}
            {displayDefaultSlippage}
          </ClickableText>
        ) : (
          <span>
            {displaySlippage}
            {displayDefaultSlippage}
          </span>
        )}
      </TextWrapper>
    </StyledRowBetween>
  )
}

type SlippageTextContentsProps = {
  isEoaEthFlow: boolean
  slippageLabel?: React.ReactNode
  isDynamicSlippageSet: boolean
}

function SlippageTextContents({ isEoaEthFlow, slippageLabel, isDynamicSlippageSet }: SlippageTextContentsProps) {
  return (
    <TransactionText>
      <Trans>{slippageLabel || 'Slippage tolerance'}</Trans>
      {isEoaEthFlow && <i>(modified)</i>}
      {isDynamicSlippageSet && <i>(dynamic)</i>}
    </TransactionText>
  )
}
