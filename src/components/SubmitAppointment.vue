<script setup>
import { computed, ref, watch, inject } from 'vue'
import { useCourtInfo } from '../stores/courtInfo.js'
import { sendAppointment } from "../services/sendAppointment.js";


const store = useCourtInfo()
const emit = defineEmits([
  'appointment-success',
])
const props = defineProps({
  selected: Object,
  bookingDate: String,
})

const today = new Date();
const bookingDate = ref(
    `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`
)
const overlayVisible = ref(false)
const selected = ref(props.selected)
const selectedCourtName = computed(() => store.courtName[selected.value.courtId])
const displayTime = ref('')
const submitLoading = ref(false)
const bookingSuccess = ref(false)
const alertVisible = ref(false)
const alertMessage = ref('未知错误')
const datePicker = inject("datePicker")


watch(() => props.selected, (newVal) => {
  selected.value = newVal
  displayTime.value = selected.value.timeSlot + ':00 - ' + (parseInt(selected.value.timeSlot) + 1).toString() + ':00'
  bookingSuccess.value = false
  overlayVisible.value = true

})

watch(() => props.bookingDate, (newVal) => {
  bookingDate.value = newVal
})


async function onClickSubmit() {
  submitLoading.value = true
  const timestamp = new Date(datePicker.value).getTime()
  try {
    await sendAppointment(
        store.courtInfo[selected.value.courtId]["slots"][selected.value.timeSlot + ':00']["id"],
        selected.value.timeSlot + ':00',
        store.courtInfo[selected.value.courtId]["resource_id"],
        timestamp)
    bookingSuccess.value = true
    submitLoading.value = false
    alertVisible.value = false
    emit('appointment-success')
  } catch (e) {
    if (e.response && e.response.status === 400) {
      alertMessage.value = e.response.data.toString()
      alertVisible.value = true
      submitLoading.value = false
    }
    else {
      console.log(e)
      alertMessage.value = "未知错误，请联系管理员。" + e
      alertVisible.value = true
      submitLoading.value = false
    }
  }
}

</script>

<template>
  <v-overlay
    v-model="overlayVisible"
    class="justify-center align-center"
  >
    <v-alert
      type="error"
      closable
      v-model="alertVisible"
      class="mb-2"
      :text="alertMessage"
    >

    </v-alert>
    <v-card
      min-width="300"
      rounded="lg"
      elevation="16"
      v-if="!bookingSuccess"
      >
      <v-row
          class="justify-center mt-3"
      >
        <span
            style="font-size:1.5rem; font-weight: bold"
        >
          {{ selectedCourtName }}
        </span>
      </v-row>
      <v-row
        class="justify-center"
      >
        <span
            style="font-size:1.5rem"
        >
          {{ bookingDate }}
        </span>
      </v-row>
      <v-row
          class="justify-center"
      >
      <span
          style="font-size:1.5rem"
      >
          {{ displayTime }}
        </span>
      </v-row>
      <v-row
      >
        <v-col class="text-center align-center mb-4">
          <v-btn
              class="ms-auto"
              text="提交预约"
              rounded
              size="large"
              variant="flat"
              color="#1f1f1f"
              style="font-size: 1.2rem"
              :loading="submitLoading"
              @click="onClickSubmit"
          ></v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-card
          v-if="bookingSuccess"
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
          <div class="text-h4 font-weight-bold">预约成功</div>
        </div>
      </v-card>
    </v-row>

  </v-overlay>
</template>

<style scoped>

</style>