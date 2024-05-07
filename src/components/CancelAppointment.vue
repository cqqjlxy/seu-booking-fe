<script setup>
import { ref, watch } from 'vue'
import { useCourtInfo } from "../stores/courtInfo.js"
import axios from "axios"

const store = useCourtInfo()
const props = defineProps({
  courtInfo: Object,
  cancelVisible: Boolean
})
const emits = defineEmits(['return-click', 'cancel-success'])

const submitLoading = ref(false)
const displayAppointmentInfo = ref(true)
const displayStatus = ref(false)
const courtInfo = ref(props.courtInfo)
const cancelCourtName = store.courtName[courtInfo.value.courtNo]


watch(() => props.courtInfo, (newVal) => {
  courtInfo.value = newVal
})

function onReturnClick() {
  emits('return-click', false)
}

async function onClickSubmit() {
  submitLoading.value = true
  const response = await cancelAppointment(courtInfo.value.appointmentID)
  if (response.data === "success") {
    submitLoading.value = false
    displayStatus.value = true
    setTimeout(() => {
      emits('cancel-success', false)
    }, 1000)
  }
}

async function cancelAppointment(appointmentID) {
  const access = localStorage.getItem('accessToken')
  return axios.post(`${import.meta.env.VITE_API_BASE_URL}/cancel-appointments`, {
    appointment_id: appointmentID
  }, {
    headers: {
      Authorization: `Bearer ${access}`
    }
  })
      .then(response => {
        return response
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          console.log(error)
        } else if (error.response && error.response.status === 401) {
          console.log(error)
        } else if (error.response && error.response.status === 502) {
          console.log(error)
        } else {
          console.log(error)
        }

        throw error
      })
}


</script>

<template>
  <v-card
      min-width="300"
      rounded="lg"
      elevation="16"
      v-if="displayAppointmentInfo && !displayStatus"
  >
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
        class="justify-center mt-3"
    >
      <span
          style="font-size:1.5rem; font-weight: bold"
      >
        {{ cancelCourtName }}
      </span>
    </v-row>
    <v-row
        class="justify-center"
    >
      <span
          style="font-size:1.5rem"
      >
        {{ courtInfo.startTime }}
      </span>
    </v-row>
    <v-row
    >
      <v-col class="text-center align-center mb-4">
        <v-btn
            class="ms-auto"
            text="取消预约"
            rounded
            size="large"
            variant="flat"
            color="#b00020"
            style="font-size: 1.2rem"
            :loading="submitLoading"
            @click="onClickSubmit"
        ></v-btn>
      </v-col>
    </v-row>
  </v-card>
  <v-row>
    <v-card
        v-if="displayStatus"
        class="mx-auto d-flex justify-center align-center"
        elevation="16"
        width="300px"
        height="300px"
        rounded="lg"
    >
      <div class="py-12 text-center">
        <v-icon
            class="mb-6"
            color="success"
            icon="mdi-check-circle-outline"
            size="96"
        ></v-icon>
        <div class="text-h4 font-weight-bold">取消成功</div>
      </div>
    </v-card>
  </v-row>
</template>

<style scoped>

</style>