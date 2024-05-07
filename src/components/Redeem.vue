<script setup>
import { ref } from 'vue'
import { redeem } from '/src/services/redeem.js'


const emit = defineEmits(['topup-click', 'redeem-success'])
const redeemLoading = ref(false)
const codeInput = ref('')
const alertMessage = ref('')
const alertVisible = ref(false)
const alertType = ref('error')
const alertTitle = ref('')
const redeemCodeRules = [
  v => !!v || '请输入Token',
  v => v.length === 20 || 'Token长度为20位'
]

function onTopupClick() {
  const topupVisible = true
  emit('topup-click', topupVisible)
}

async function onRedeemClick() {
  redeemLoading.value = true
  try {
    const response = await redeem(codeInput.value)
    if (response.status === 200) {
      alertTitle.value = 'Success'
      alertMessage.value = '兑换成功'
      alertType.value = 'success'
      alertVisible.value = true
      emit('redeem-success')
    }
  } catch(e) {
    if (e.response.status === 400) {
      alertTitle.value = 'Error'
      alertMessage.value = 'Token无效'
      alertType.value = 'error'
      alertVisible.value = true
    }
  } finally {
    redeemLoading.value = false
  }
}

</script>

<template>
  <v-alert
      v-if="alertVisible"
      :type="alertType"
      :title="alertTitle"
      :text="alertMessage"
      dense
      closable
      class="my-4 mx-3"
  ></v-alert>
  <v-row
    class="mx-4 my-5"
    >
    <span
        style="font-size: 1.6rem; font-weight: bold; color: #1a1a1a;"
      >兑换码兑换</span>
  </v-row>
  <V-row
    class="mx-4 my-2"
    >
    <v-text-field
        variant="outlined"
        label="Token"
        :rules="redeemCodeRules"
        v-model="codeInput"
    >
    </v-text-field>
    <v-btn
        class="mb-2 mt-2"
        block
        rounded="xl"
        @click="onRedeemClick"
        :loading="redeemLoading"
        color="#1a1a1a"
        elevation="0"
        height="3.5rem"
    >兑换</v-btn>
    <v-btn
        class="mt-3"
        variant="outlined"
        block
        rounded="xl"
        @click="onTopupClick"
        color="#1a1a1a"
        height="3rem"
    >充值</v-btn>
  </v-row>
</template>

<style scoped>

</style>