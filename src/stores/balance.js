import { getBalance } from "../services/getBalance.js";
import { defineStore } from "pinia";
import {computed, ref} from 'vue'


export const useBalanceStore = defineStore('balance', () => {
    const balance = ref('0')

    async function fetchBalance() {
        const response = await getBalance()
        balance.value = response.data.balance
    }

    const getBalanceValue = computed(() => balance.value)
    return { balance, fetchBalance, getBalanceValue }
})