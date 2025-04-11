<script setup lang="ts">
import { onMounted } from 'vue'
import { useCurrencyStore } from '../stores/currency'
import { Card, Spin } from 'ant-design-vue'

const currencyStore = useCurrencyStore()

onMounted(() => {
  currencyStore.fetchRates()
})
</script>

<template lang="pug">
.home
  h1.title Курсы валют
  Spin(:spinning="currencyStore.isLoading")
    .rates-grid
      Card.rate-card(
        v-for="currency in currencyStore.availableCurrencies"
        :key="currency"
        v-show="currency !== currencyStore.baseRate"
      )
        template(#title) {{ currency }}
        p.rate-value(v-if="currencyStore.rates[currency]")
          | 1 {{ currency }} = {{ currencyStore.getRate(currency) }} {{ currencyStore.baseRate }}
        p.error-text(v-else) Курс недоступен
  p.error-message(v-if="currencyStore.error") {{ currencyStore.error }}
</template>

<style lang="stylus">
.home
  padding: 2rem

.title
  margin-bottom: 2rem
  color: #333
  text-align: center

.rates-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: 1.5rem
  max-width: 1200px
  margin: 0 auto

.rate-card
  background: #fff
  transition: transform 0.2s
  
  &:hover
    transform: translateY(-5px)

.rate-value
  font-size: 1.2rem
  color: #1890ff
  margin: 0

.error-message
  text-align: center
  color: #ff4d4f
  margin-top: 1rem

.error-text
  color: #ff4d4f
  margin: 0
</style> 