<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrencyStore } from '../stores/currency'
import { Select } from 'ant-design-vue'

const router = useRouter()
const currencyStore = useCurrencyStore()

const handleCurrencyChange = (value: string) => {
  currencyStore.setBaseRate(value)
}
</script>

<template lang="pug">
header.header
  nav.nav
    router-link.nav-link(to="/") Главная
    router-link.nav-link(to="/convert") Конвертация
  Select.currency-select(
    v-model:value="currencyStore.baseRate"
    @change="handleCurrencyChange"
  )
    Select-Option(
      v-for="currency in currencyStore.availableCurrencies"
      :key="currency"
      :value="currency"
    ) {{ currency }}
</template>

<style lang="stylus">
.header
  display: flex
  justify-content: space-between
  align-items: center
  padding: 1rem 2rem
  background-color: #fff
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)

.nav
  display: flex
  gap: 1.5rem

.nav-link
  text-decoration: none
  color: #333
  font-weight: 500
  transition: color 0.2s
  
  &:hover
    color: #1890ff
  
  &.router-link-active
    color: #1890ff

.currency-select
  width: 100px
</style> 