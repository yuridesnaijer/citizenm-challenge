<script setup lang="ts">
import OfferContainer from "~/components/OfferContainer.vue";
import { useCurrencyStore } from "#imports";

const currencyStore = useCurrencyStore();
await useAsyncData(() => currencyStore.fetchExchangeRateData());
</script>

<template>
  <div>
    <OfferContainer />
  </div>
</template>
