import { GaOptions, InitOptions } from 'react-ga4/types/ga4'

export enum AnalyticsContext {
  chainId = 'chainId',
  walletName = 'walletName',
  customBrowserType = 'customBrowserType',
  userAddress = 'userAddress',
  market = 'market',
  injectedWidgetAppId = 'injectedWidgetAppId',
}

export type EventOptions = {
  action: string
  category: string
  label?: string
  value?: number
  // nonInteraction?: boolean;
  // transport?: ('beacon' | 'xhr' | 'image');
}

export interface OutboundLinkParams {
  label: string
  hitCallback: () => unknown
}

export interface CowAnalytics {
  setUserAccount(account: string): void
  sendPageView(path?: string, params?: string[], title?: string): void
  sendEvent(event: string | EventOptions, params?: unknown): void
  sendTiming(timingCategory: string, timingVar: string, timingValue: number, timingLabel: string): void
  sendError(error: Error, errorInfo?: string): void
  outboundLink(params: OutboundLinkParams): void
  setContext(key: AnalyticsContext, value?: string): void
}
