<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useCurrencyStore } from '../stores/currency'
import { Select, Input, Card } from 'ant-design-vue'
import type { SelectProps } from 'ant-design-vue'

const currencyStore = useCurrencyStore()

const fromCurrency = ref(currencyStore.baseRate)
const toCurrency = ref(currencyStore.availableCurrencies.find(c => c !== currencyStore.baseRate) || 'USD')
const fromAmount = ref<string>('')
const toAmount = ref<string>('')

const handleFromAmountChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  if (!value || isNaN(Number(value))) {
    toAmount.value = ''
    return
  }
  
  const result = currencyStore.convertAmount(
    Number(value),
    fromCurrency.value,
    toCurrency.value
  )
  toAmount.value = result.toString()
}

const handleToAmountChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  if (!value || isNaN(Number(value))) {
    fromAmount.value = ''
    return
  }
  
  const result = currencyStore.convertAmount(
    Number(value),
    toCurrency.value,
    fromCurrency.value
  )
  fromAmount.value = result.toString()
}

watch([fromCurrency, toCurrency], () => {
  if (fromAmount.value) {
    handleFromAmountChange({ target: { value: fromAmount.value } } as any)
  }
})

onMounted(() => {
  currencyStore.fetchRates()
})
</script>

<template lang="pug">
.convert
  h1.title Конвертация валют
  Card.converter-card
    .converter-row
      Select.currency-select(
        v-model:value="fromCurrency"
      )
        Select-Option(
          v-for="currency in currencyStore.availableCurrencies"
          :key="currency"
          :value="currency"
        ) {{ currency }}
      Input.amount-input(
        v-model:value="fromAmount"
        placeholder="Введите сумму"
        @input="handleFromAmountChange"
        type="number"
        :min="0"
      )
    
    .converter-row
      Select.currency-select(
        v-model:value="toCurrency"
      )
        Select-Option(
          v-for="currency in currencyStore.availableCurrencies"
          :key="currency"
          :value="currency"
        ) {{ currency }}
      Input.amount-input(
        v-model:value="toAmount"
        placeholder="Введите сумму"
        @input="handleToAmountChange"
        type="number"
        :min="0"
      )
</template>

<style lang="stylus">
.convert
  padding: 2rem

.title
  margin-bottom: 2rem
  color: #333
  text-align: center

.converter-card
  max-width: 600px
  margin: 0 auto

.converter-row
  display: flex
  gap: 1rem
  margin-bottom: 1rem
  
  &:last-child
    margin-bottom: 0

.currency-select
  width: 120px

.amount-input
  flex: 1
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button
    -webkit-appearance: none
    margin: 0
</style> 