<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useAuthStore } from "../stores/auth.js"


const emit = defineEmits(['return-click'])

const topupValue = ref('')
const selectedChoice = ref('')
const isCustomInputEnabled = ref(false)
const isValid = ref(false)
const totalPrice = ref('-')
const originalPrice = ref('-')
const isDiscount = ref(false)
const priceSetting = ref(
    {
      "unitPrice": "2",
      "priceRatio": {
        "1-2": "1",
        "3-5": "0.9",
        "6-10": "0.8",
        "11": "0.7",
      }
    }
)
const payLoading = ref(false)
const choices = [
  "1",
  "2",
  "3",
  "5",
  "9",
]


function onReturnClick() {
  emit('return-click', false)
}

const payLoad = () => {
  const authStore = useAuthStore()
  if (!authStore.checkTokenValidity(localStorage.getItem('accessToken'))) {
    authStore.logOut()
  }
  const access = localStorage.getItem('accessToken')
  const paymentData = {
    total_amount: totalPrice.value,
    subject: `${topupValue.value}场时`,
    topup_amount: topupValue.value
  };

  payLoading.value = true
  axios.post(`${import.meta.env.VITE_API_BASE_URL}/create-order`, paymentData, {
    headers: {
      Authorization: `Bearer ${access}`
    }
  })
      .then(response => {
        console.log(response.data)
        window.location.href = response.data['alipayUrl'].replace(/"/g, '').trim()
        payLoading.value = false
      })
      .catch(error => {
        console.error('Payment initiation failed:', error);
        payLoading.value = false
      });
};

function onSelect(choice) {
  selectedChoice.value = choice
  topupValue.value = choice
  isCustomInputEnabled.value = (choice === 'custom')
}

function onCustomInputFocus() {
  selectedChoice.value = 'custom'
}

function getPriceRatio(count) {
  const ranges = priceSetting.value.priceRatio;
  if (count >= 11) {
    return parseFloat(ranges["11"]);
  } else if (count >= 6) {
    return parseFloat(ranges["6-10"]);
  } else if (count >= 3) {
    return parseFloat(ranges["3-5"]);
  } else {
    return parseFloat(ranges["1-2"]);
  }
}

watch(topupValue, (newValue) => {
  if (newValue && Number.isInteger(parseFloat(newValue))) {
    const count = parseInt(newValue);
    const unitPrice = parseFloat(priceSetting.value.unitPrice);
    const originalPriceCalc = count * unitPrice;
    originalPrice.value = originalPriceCalc.toFixed(2);

    const ratio = getPriceRatio(count);
    const totalPriceCalc = originalPriceCalc * ratio;
    totalPrice.value = totalPriceCalc.toFixed(2);

    isValid.value = true;
    isDiscount.value = ratio !== 1;

  } else {
    isValid.value = false;
    totalPrice.value = '-';
    originalPrice.value = '-';
    isDiscount.value = false;
  }
})

</script>

<template>
  <v-row
    class="mx-3 my-5"
  >
  <v-icon
      icon="mdi-chevron-left"
      start size="1.8rem"
      @click="onReturnClick"
  ></v-icon>
  </v-row>
  <v-row
    class="mx-10"
    style="font-weight: bold; font-size: 1.5rem"
    >
    场时充值
  </v-row>
  <v-row
      class="justify-center"
  >
    <v-col
      cols="12"
      class="d-flex justify-center flex-wrap"
    >
      <v-btn
        :key="choice"
        v-for="choice in choices"
        variant="outlined"
        class="mx-1 mt-2 choice-btn w-25"
        :class="{ 'selected': selectedChoice === choice}"
        @click="onSelect(choice)"
        :elevation="selectedChoice === choice ? 0 : 2"
        style="border: #1a1a1a 1px solid; font-weight: bold;"
        >
        {{ choice }}场时
      </v-btn>
      <v-btn
          :key="'custom'"
          variant="outlined"
          class="mx-1 mt-2 choice-btn w-25"
          :class="{ 'selected': selectedChoice === 'custom'}"
          @click="onSelect('custom')"
          :elevation="selectedChoice === 'custom' ? 0 : 2"
          style="border: #1a1a1a 1px solid; font-weight: bold;"
      >
        自定场时
      </v-btn>
      <v-text-field
        v-model="topupValue"
        variant="outlined"
        class="w-25 mt-3 pb-0 mx-10 mt-3"
        @focus="onCustomInputFocus"
        density="compact"
        type="number"
        suffix="场时"
        :disabled="!isCustomInputEnabled"
        :label="!isCustomInputEnabled ? '' : '自定场时'"
        >
      </v-text-field>
    </v-col>
  </v-row>
  <v-row
    class="mx-3 justify-center"
    v-if="isValid"
  >
    <span
        style="font-size: 2rem; font-weight: bold; color: #1a1a1a"
    >
      CNY {{ totalPrice }}
    </span>
  </v-row>
  <v-row
      class="mx-3 justify-center"
      v-if="isValid && isDiscount"
  >
    <span
        style="font-size: 1rem; font-weight: bold; color: darkgray; text-decoration: darkgray;"
    >
      <s>CNY {{ originalPrice }}</s>
    </span>
  </v-row>
  <v-row
      class="mx-3 justify-center"
      v-if="isValid"
  >
    <v-btn
        variant="outlined"
        rounded="xl"
        style="font-weight: bold;"
        class="align-center mt-2 mb-2"
        elevation="2"
        size="large"
        @click="payLoad"
        :loading="payLoading"
      >
        <span
            class="d-flex align-center justify-center"
            style="width: 1.5rem; height: 1.5rem;"
        >
            <img
                src="https://vue-booking.oss-cn-hangzhou.aliyuncs.com/alipayround.svg"
                alt="alipay"
                style="width: 100%; height: 100%; object-fit: contain;"
            >
          </span>
      <span
        class="ml-2 mr-1"
        >
        支付宝
      </span>
    </v-btn>
  </v-row>
</template>


<style scoped>
.selected {
  color: #1a1a1a;
  background-color: #bbff2e;
}
</style>