import { useCallback, useMemo, useState } from 'react'

import { Command } from '@cowprotocol/types'
import { Badge } from '@cowprotocol/ui'
import type { TradeType } from '@cowprotocol/widget-lib'

import { Trans } from '@lingui/macro'
import IMAGE_CARET from 'assets/icon/caret.svg'
import SVG from 'react-inlinesvg'
import { useLocation } from 'react-router-dom'

import { useInjectedWidgetParams } from 'modules/injectedWidget'
import { ModalHeader } from 'modules/tokensList/pure/ModalHeader'

import { Routes, RoutesValues } from 'common/constants/routes'
import { useMenuItems } from 'common/hooks/useMenuItems'

import * as styledEl from './styled'

import { useTradeRouteContext } from '../../hooks/useTradeRouteContext'
import { useGetTradeStateByRoute } from '../../hooks/useTradeState'
import { getDefaultTradeRawState, TradeUrlParams } from '../../types/TradeRawState'
import { addChainIdToRoute, parameterizeTradeRoute } from '../../utils/parameterizeTradeRoute'

interface MenuItemConfig {
  route: RoutesValues
  label: string
  badge?: string
}

const TRADE_TYPE_TO_ROUTE: Record<TradeType, string> = {
  swap: Routes.SWAP,
  limit: Routes.LIMIT_ORDER,
  advanced: Routes.ADVANCED_ORDERS,
  yield: Routes.YIELD,
}

interface TradeWidgetLinksProps {
  isDropdown?: boolean
}

export function TradeWidgetLinks({ isDropdown = false }: TradeWidgetLinksProps) {
  const tradeContext = useTradeRouteContext()
  const location = useLocation()
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const { enabledTradeTypes } = useInjectedWidgetParams()
  const menuItems = useMenuItems()
  const getTradeStateByType = useGetTradeStateByRoute()

  const enabledItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (!enabledTradeTypes?.length) return true

      return enabledTradeTypes.some((type: TradeType) => TRADE_TYPE_TO_ROUTE[type] === item.route)
    })
  }, [menuItems, enabledTradeTypes])

  const enabledItemsCount = enabledItems.length

  const handleMenuItemClick = useCallback(
    (_item?: MenuItemConfig) => {
      if (enabledItemsCount === 1) return
      setDropdownVisible(false)
    },
    [enabledItemsCount],
  )

  const menuItemsElements = useMemo(() => {
    return enabledItems.map((item) => {
      const isItemYield = item.route === Routes.YIELD
      const chainId = tradeContext.chainId

      const isCurrentPathYield = location.pathname.startsWith(addChainIdToRoute(Routes.YIELD, chainId))
      const itemTradeState = getTradeStateByType(item.route)

      const routePath = isItemYield
        ? addChainIdToRoute(item.route, chainId)
        : parameterizeTradeRoute(
            isCurrentPathYield
              ? ({
                  chainId,
                  inputCurrencyId:
                    itemTradeState.inputCurrencyId || (chainId && getDefaultTradeRawState(+chainId).inputCurrencyId),
                  outputCurrencyId: itemTradeState.outputCurrencyId,
                } as TradeUrlParams)
              : tradeContext,
            item.route,
            !isCurrentPathYield,
          )

      const isActive = location.pathname.startsWith(routePath.split('?')[0])

      return (
        <MenuItem
          key={item.label}
          routePath={routePath}
          item={item}
          isActive={isActive}
          onClick={() => handleMenuItemClick(item)}
          isDropdownVisible={isDropdown && isDropdownVisible}
        />
      )
    })
  }, [
    isDropdown,
    isDropdownVisible,
    enabledItems,
    tradeContext,
    location.pathname,
    handleMenuItemClick,
    getTradeStateByType,
  ])

  const singleMenuItem = menuItemsElements.length === 1

  const selectedMenuItem = menuItemsElements.find((item) => item.props.isActive) || menuItemsElements[0]

  return isDropdown ? (
    <>
      <styledEl.MenuItem
        onClick={() => !singleMenuItem && setDropdownVisible(!isDropdownVisible)}
        isDropdownVisible={isDropdownVisible}
      >
        <styledEl.Link to={selectedMenuItem.props.routePath || '#'}>
          {selectedMenuItem.props.item.label}
          {!singleMenuItem ? <SVG src={IMAGE_CARET} title="select" /> : null}
        </styledEl.Link>
      </styledEl.MenuItem>

      {isDropdownVisible && (
        <styledEl.SelectMenu>
          <ModalHeader onBack={handleMenuItemClick}>Trading mode</ModalHeader>
          <styledEl.TradeWidgetContent>{menuItemsElements}</styledEl.TradeWidgetContent>
        </styledEl.SelectMenu>
      )}
    </>
  ) : (
    <styledEl.Wrapper>{menuItemsElements}</styledEl.Wrapper>
  )
}

const MenuItem = ({
  routePath,
  item,
  isActive,
  onClick,
  isDropdownVisible,
}: {
  routePath: string
  item: MenuItemConfig
  isActive: boolean
  onClick: Command
  isDropdownVisible: boolean
}) => (
  <styledEl.MenuItem isActive={isActive} onClick={onClick} isDropdownVisible={isDropdownVisible}>
    <styledEl.Link to={routePath}>
      <Trans>{item.label}</Trans>
      {!isActive && item.badge && (
        <Badge type="information">
          <Trans>{item.badge}</Trans>
        </Badge>
      )}
    </styledEl.Link>
  </styledEl.MenuItem>
)
