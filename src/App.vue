<script setup lang="ts">
import { createPinia } from 'pinia'
import AppHeader from './components/AppHeader.vue'
import { onMounted } from 'vue'
import { useCurrencyStore } from './stores/currency'

const pinia = createPinia()
const currencyStore = useCurrencyStore()

onMounted(() => {
  currencyStore.fetchRates()
})
</script>

<template lang="pug">
.app
  AppHeader
  main.main
    router-view
</template>

<style lang="stylus">
body
  margin: 0
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  background-color: #f0f2f5

.app
  min-height: 100vh
  display: flex
  flex-direction: column

.main
  flex: 1
</style>
