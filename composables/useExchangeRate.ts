import { useCurrencyStore } from "#imports";
import { storeToRefs } from "pinia";

const currencySymbolMap: { [key: string]: string } = {
  EUR: "€",
  GBP: "£",
  DKK: "kr ",
};

export const useExchangeRate = () => {
  const currencyStore = useCurrencyStore();
  const { exchangeRateData } = storeToRefs(currencyStore);

  const convertCurrency = (amount: number, from: string, to: string) => {
    if (to === "local") {
      return currencySymbolMap[from] + amount.toString(10);
    }

    const exchangeRatesToUse = exchangeRateData.value?.exchangeRates.find(
      (rate) => rate.base === from,
    );
    if (exchangeRatesToUse === undefined) {
      throw new Error("Exchange rate not found");
    }

    const convertedPrice = amount * exchangeRatesToUse?.rates[to];
    return currencySymbolMap[to] + convertedPrice.toFixed(2).toString();
  };

  return {
    convertCurrency,
  };
};
