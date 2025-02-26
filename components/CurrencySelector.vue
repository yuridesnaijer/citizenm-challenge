<script setup lang="ts">
import { useCurrencyStore } from "#imports";
import { storeToRefs } from "pinia";
const currencyStore = useCurrencyStore();
const { activeCurrency, selectableCurrencies } = storeToRefs(currencyStore);

const handleCurrencyChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;

  currencyStore.updateCurrency(target.value);
};
</script>

<template>
  <div>
    <label for="currency">Currency: </label>
    <select @change="handleCurrencyChange" name="currency" id="currency-select">
      <option
        :selected="currency === activeCurrency"
        v-for="currency in selectableCurrencies"
        :key="currency"
        :value="currency"
      >
        {{ currency }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss"></style>
