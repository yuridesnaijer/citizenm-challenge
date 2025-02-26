<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useExchangeRate } from "#imports";

interface TOfferDetail {
  name: string;
  description: string;
  price: number;
}

interface TLocale {
  currency: string;
  language: string;
}

interface THotelOffer {
  name: string;
  description: string;
  image: string;
  locale: TLocale;
  offers: TOfferDetail[];
}

const props = defineProps<{
  hotelOffer: THotelOffer;
}>();

const currencyStore = useCurrencyStore();
const { activeCurrency } = storeToRefs(currencyStore);
const { convertCurrency } = useExchangeRate();

const lowestOffer = computed(() => {
  return props.hotelOffer.offers.reduce((prev, current) =>
    prev.price < current.price ? prev : current,
  );
});

const convertedCurrency = computed(() =>
  convertCurrency(
    lowestOffer.value.price,
    props.hotelOffer.locale.currency,
    activeCurrency.value,
  ),
);
</script>

<template>
  <div class="offer-card">
    <div>
      <NuxtImg
        class="offer-card__image"
        :src="hotelOffer.image"
        :alt="hotelOffer.name"
      />
      <div class="offer-card__content">
        <h2>
          {{ hotelOffer.name }}
        </h2>
        <p>{{ hotelOffer.description }}</p>
      </div>
    </div>
    <div class="offer-card__price-container">
      rooms available from
      <span class="offer-card__price-container__price">
        <ClientOnly>
          {{ convertedCurrency }}
          <template #fallback> ... </template>
        </ClientOnly>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.offer-card {
  display: flex;
  flex-direction: column;
  height: 27.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 19rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 1rem;
  justify-content: space-between;

  &__image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    max-width: 100%;
  }

  &__content {
    padding: 1rem;
  }

  &__price-container {
    padding: 1rem;
    margin: 0 1rem;
    background-color: #efefef;
    border-radius: 0.25rem;
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;

    &__price {
      height: 2.5rem;
      font-weight: bold;
      font-size: 1.25rem;
      white-space: nowrap;
    }
  }
}
</style>
