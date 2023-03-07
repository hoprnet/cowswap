export interface TokenResult {
  name: string
  symbol: string
  decimals: number
  id: string
  project: {
    logoUrl: string
  }
  market: {
    price: {
      value: number
      currency: string
    }
    pricePercentChange: {
      value: number
    }
  }
}

export function useTokenSearch(): TokenResult[] {
  return []
}
