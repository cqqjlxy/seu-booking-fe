<script setup>
import {ref, watch} from 'vue';
import QRcodeDisplay from "./QRcodeDisplay.vue"
import axios from "axios";
import CancelAppointment from "./CancelAppointment.vue"


const props = defineProps([
  'overlayVisible',
  'appointments'
])
const emit = defineEmits([
  'update:overlayVisible',
  'cancel-success'
])

const appointments = ref(props.appointments)
const overlayVisible = ref(props.overlayVisible)
const QRcodeDisplayVisible = ref(false)
const displayAppointmentId = ref('')
const displayStartTime = ref('')
const displayCourtNo = ref('')
const qrCodeBtnLoading = ref(false)
const qrBase64 = ref('')
const cancelVisible = ref(false)
const cancelCourtInfo = ref({})

watch(() => props.overlayVisible, (newVal) => {
  overlayVisible.value = newVal
})

watch(overlayVisible, (newVal) => {
  emit('update:overlayVisible', newVal)
})

watch(() => props.appointments, (newVal) => {
  appointments.value = newVal
})

function handleReturnClick(newValue) {
  QRcodeDisplayVisible.value = newValue
  cancelVisible.value = newValue
}

async function onQrClick(appointment) {
  displayAppointmentId.value = appointment.appointmentID
  displayCourtNo.value = appointment.courtNo
  displayStartTime.value = appointment.startTime
  qrCodeBtnLoading.value = true
  await fetchQRCode()
  QRcodeDisplayVisible.value = true
  qrCodeBtnLoading.value = false
}

async function fetchQRCode() {
  const apiURL = 'https://fc.cqqjlxy.cn/generate-qr';
  const requestData = {
    appointmentId: displayAppointmentId.value,
    time: displayStartTime.value
  }

  return axios.post(apiURL, requestData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
      .then(response => {
        qrBase64.value = response.data;
      })
      .catch(error => {
        console.error('Error fetching QR code:', error)
      })
}

function onCancelClick(appointment) {
  cancelCourtInfo.value = appointment
  cancelVisible.value = true
}

function handleCancelSuccess() {
  cancelVisible.value = false
  emit('cancel-success', true)
}

</script>

<template>
  <v-overlay
    v-model="overlayVisible"
    class="justify-center align-start mt-6"
    >
    <v-card
      width="90vw"
      min-height="100px"
      elevation="20"
      rounded="lg"
      class="overflow-y-auto"
      v-if="!QRcodeDisplayVisible && !cancelVisible"
    >
      <v-row>
        <v-col
            class="mt-6 mb-2 mx-8"
            style="font-size: 1.6rem; font-weight: bold; color: #1a1a1a;"
        >
          我的预约
        </v-col>
      </v-row>
      <v-row
        class="mx-2 my-3 py-3 align-center flex-nowrap justify-space-around"
        v-for="appointment in appointments"
        >
        <v-chip
          variant="flat"
          color="#1a1a1a"
          style="font-weight: bold; font-size: medium"
        >
          {{ appointment.courtNo }}
        </v-chip>
        <v-chip
          variant="text"
          color="#1a1a1a"
          style="font-weight: bold;font-size: large"
          >
          {{ appointment.startTime }}
        </v-chip>
        <v-btn
            rounded="large"
            color="#bbff2e"
            variant="flat"
            class="pa-0"
            icon="mdi-qrcode"
            :loading="qrCodeBtnLoading && displayAppointmentId === appointment.appointmentID"
            @click="onQrClick(appointment)"
          >
        </v-btn>
        <v-btn
          variant="flat"
          icon="mdi-close"
          rounded="xl"
          color="#b00020"
          class="px-1"
          density="compact"
          @click="onCancelClick(appointment)"
          ></v-btn>
      </v-row>
    </v-card>
    <QRcodeDisplay
      v-if="QRcodeDisplayVisible"
      @return-click="handleReturnClick"
      :start-time="displayStartTime"
      :qr-base64="qrBase64"
      :court-no="displayCourtNo"
    />
    <CancelAppointment
      v-if="cancelVisible"
      :court-info="cancelCourtInfo"
      @return-click="handleReturnClick"
      @cancel-success="handleCancelSuccess"
      />

  </v-overlay>
</template>

<style scoped>

</style>