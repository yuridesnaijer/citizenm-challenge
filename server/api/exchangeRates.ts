export interface TExchangeRate {
    base: string;
    rates: Record<string, number>;
}

export interface TExchangeRatesResponse {
    exchangeRates: TExchangeRate[]
}

export default defineEventHandler((event): TExchangeRatesResponse => {
    return {
        exchangeRates: [
            {
                "base": "EUR",
                "rates": {
                    "EUR": 1.0,
                    "GBP": 0.85,
                    "DKK": 7.44,
                    "USD": 1.18,
                    "JPY": 130.02
                }
            },
            {
                "base": "GBP",
                "rates": {
                    "EUR": 1.18,
                    "GBP": 1.0,
                    "DKK": 8.75,
                    "USD": 1.39,
                    "JPY": 152.32
                }
            },
            {
                "base": "DKK",
                "rates": {
                    "EUR": 0.13,
                    "GBP": 0.11,
                    "DKK": 1.0,
                    "USD": 0.16,
                    "JPY": 17.39
                }
            }
        ]

    }
})