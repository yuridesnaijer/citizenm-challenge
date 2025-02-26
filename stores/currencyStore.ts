import { defineStore } from "pinia";
import type {
  TExchangeRate,
  TExchangeRatesResponse,
} from "~/server/api/exchangeRates";

export const useCurrencyStore = defineStore(
  "currencyStore",
  () => {
    const activeCurrency = ref("local");
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
      const { data } = await useFetch("/api/exchangeRates");
      exchangeRateData.value = data.value;
      return data;
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
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ["activeCurrency"],
    },
  },
);
