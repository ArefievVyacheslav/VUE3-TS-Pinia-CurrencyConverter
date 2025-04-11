import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

interface RatesResponse {
  [key: string]: number
}

export const useCurrencyStore = defineStore('currency', () => {
  const baseRate = ref('RUB')
  const rates = ref<RatesResponse>({})
  const isLoading = ref(false)
  const error = ref('')

  const availableCurrencies = ['USD', 'EUR', 'RUB']

  const fetchRates = async () => {
    try {
      isLoading.value = true
      error.value = ''
      const response = await axios.get<RatesResponse>('https://status.neuralgeneration.com/api/currency')
      const requiredRates: RatesResponse = {}

      availableCurrencies.forEach(currency => {
        if (response.data[currency]) {
          requiredRates[currency] = response.data[currency]
        }
      })

      if (!requiredRates.USD) requiredRates.USD = 91.45
      if (!requiredRates.EUR) requiredRates.EUR = 101.74
      if (!requiredRates.RUB) requiredRates.RUB = 1
      rates.value = requiredRates
    } catch (e) {
      error.value = 'Ошибка при загрузке курсов валют'
      rates.value = {
        USD: 91.45,
        EUR: 101.74,
        RUB: 1
      }
    } finally {
      isLoading.value = false
    }
  }

  const convertAmount = (amount: number, fromCurrency: string, toCurrency: string): number => {
    if (!rates.value || !amount) return 0

    const fromRate = rates.value[fromCurrency] || 0
    const toRate = rates.value[toCurrency] || 0

    if (!fromRate || !toRate) return 0

    // Конвертация через базовую валюту (RUB)
    const amountInRub = amount * fromRate
    const result = amountInRub / toRate

    return Number(result.toFixed(2))
  }

  const setBaseRate = (currency: string) => {
    if (availableCurrencies.includes(currency)) {
      baseRate.value = currency
    }
  }

  const getRate = computed(() => (currency: string) => {
    if (!rates.value || !rates.value[currency] || !rates.value[baseRate.value]) return 0
    return Number((rates.value[currency] / rates.value[baseRate.value]).toFixed(2))
  })

  return {
    baseRate,
    rates,
    isLoading,
    error,
    availableCurrencies,
    fetchRates,
    convertAmount,
    setBaseRate,
    getRate
  }
})
