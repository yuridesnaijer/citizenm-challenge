import { defineStore } from "pinia";
import type {
  TExchangeRate,
  TExchangeRatesResponse,
} from "~/server/api/exchangeRates";

export const useCurrencyStore = defineStore(
  "currencyStore",
  () => {
    const activeCurrency = useState("active-currency", () => "local");
    const exchangeRateData = ref<TExchangeRatesResponse | null>();
    const selectableCurrencies = computed(() => {
      return [
        "local",
        ...(exchangeRateData.value?.exchangeRates.map((rate: TExchangeRate) => {
          return rate.base;
        }) || []),
      ];
    });

    const fetchExchangeRateData = async () => {
      exchangeRateData.value = await $fetch("/api/exchangeRates");
    };

    const updateCurrency = (selectedCurrency: string) => {
      activeCurrency.value = selectedCurrency;
    };

    return {
      updateCurrency,
      fetchExchangeRateData,
      selectableCurrencies,
      activeCurrency,
      exchangeRateData,
    };
  },
  {
    persist: {
      pick: ["activeCurrency"],
    },
  },
);
