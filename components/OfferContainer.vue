<script setup lang="ts">
import CurrencySelector from "~/components/CurrencySelector.vue";

const { data: offerData } = await useFetch("/api/offers");
const availableHotelsAmount = computed(() => offerData.value?.offers.length);
</script>

<template>
  <section class="offer-container">
    <h1>{{ availableHotelsAmount }} available hotels in Europe</h1>

    <CurrencySelector class="offer-container__currency-selector" />

    <div class="offer-container__offers">
      <OfferCard
        v-for="offer in offerData?.offers"
        :key="offer.name"
        :hotelOffer="offer"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.offer-container {
  max-width: 1280px;
  margin: 0 auto;

  &__offers {
    width: 100%;
    max-width: 1280px;
    gap: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-items: center;
    justify-content: center;
    align-self: center;
  }

  &__currency-selector {
    margin: 1rem 0;
  }
}
</style>
