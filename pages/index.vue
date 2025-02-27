<script setup lang="ts">
import OfferContainer from "~/components/OfferContainer.vue";
import { useCurrencyStore } from "#imports";

const currencyStore = useCurrencyStore();
if (!currencyStore.exchangeRateData) {
  await useAsyncData(() =>
    currencyStore.fetchExchangeRateData().then(() => {}),
  );
}
</script>

<template>
  <div>
    <OfferContainer />
  </div>
</template>
