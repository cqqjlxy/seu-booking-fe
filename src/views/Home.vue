<script setup>
import { ref, onMounted, provide } from 'vue'
import { useRouter } from "vue-router";
import { useAppointmentDetail } from "../stores/appointmentInfo.js"
import { useAuthStore } from "../stores/auth.js";
import { useBalanceStore } from "../stores/balance.js"
import DatePicker from "../components/DatePicker.vue"
import CourtGrid from "../components/CourtGrid.vue"
import MyCourts from "../components/MyCourts.vue"
import Balance from "../components/Balance.vue"
import SubmitAppointment from "../components/SubmitAppointment.vue"


const authStore = useAuthStore()
const appointmentDetailStore = useAppointmentDetail()
const balanceStore = useBalanceStore()
const usernameLoading = ref(false)
const router = useRouter()
const appointments = ref([])
const courtBalance = ref('')
const datePicker = ref(new Date())
const bookedOverlay = ref(false)
const redeemOverlay = ref(false)
const datePickerOverlay = ref(false)
const selected = ref({
  courtId: 'A1',
  timeSlot: '09',
})
const appointmentSuccess = ref(false)
const selectedTimestamp = ref(new Date(datePicker.value).getTime())
const isLogoutClicked = ref(false)
const userName = authStore.getDisplayName


onMounted(async () => {
  try {
    authStore.initializeAuth()
    await balanceStore.fetchBalance()
    courtBalance.value = balanceStore.getBalanceValue
    await appointmentDetailStore.fetchAppointmentDetails()
    appointments.value = appointmentDetailStore.getAppointmentsValue
  } catch (error) {
    console.error('Failed to fetch balance:', error)
  }
})


function formatDate(date) {
  const d = new Date(date)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')} ${weekDays[d.getDay()]}`;
}

function formatDateForBooking(date) {
  const d = new Date(date)
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
}

function handleSelected(newVal) {
  selected.value = newVal
}

function updateDate(newVal) {
  datePicker.value = newVal
  selectedTimestamp.value = new Date(datePicker.value).getTime()
}

function handleLogoutClick() {
  isLogoutClicked.value = false
  authStore.logOut()
  router.push('/login').catch(err => {
    console.error('Router error:', err)
  })
}

async function onMyCourtsClick() {
  usernameLoading.value = true
  await appointmentDetailStore.fetchAppointmentDetails()
  appointments.value = appointmentDetailStore.getAppointmentsValue
  usernameLoading.value = false
  bookedOverlay.value = !bookedOverlay.value
}

async function handleCancelSuccess() {
  bookedOverlay.value = false
  await appointmentDetailStore.fetchAppointmentDetails()
  appointments.value = appointmentDetailStore.getAppointmentsValue
}

async function handleRedeemSuccess() {
  await balanceStore.fetchBalance()
  courtBalance.value = balanceStore.getBalanceValue
}

async function handelAppointmentSuccess() {
  appointmentSuccess.value = !appointmentSuccess.value
  await balanceStore.fetchBalance()
  courtBalance.value = balanceStore.getBalanceValue
}

provide('datePicker', datePicker)

</script>

  <template>
    <v-container>
      <v-overlay
        v-model="isLogoutClicked"
        class="justify-center align-center"
        >
        <v-card
            width="200px"
            height="210px"
        >
          <v-card-title
            style="font-size: 1.5rem;"
          >Logout</v-card-title>
          <v-card-text
            class="text-center mt-4"
            style="font-size: 1.2rem;"
          >
            退出账户
          </v-card-text>
          <v-row
              class="justify-center my-2"
          >
            <v-btn
                class="px-10"
                color="error"
                elevation="2"
                rounded
                @click="handleLogoutClick"
            >
              退出
          </v-btn>
          </v-row>
          <v-row
            class="justify-center mt-3"
          >
            <v-btn
                class="px-10"
                variant="outlined"
                rounded
                elevation="1"
                @click="isLogoutClicked = false"
            >
              取消
            </v-btn>
          </v-row>
        </v-card>
      </v-overlay>
      <MyCourts
        v-model:overlay-visible="bookedOverlay"
        :appointments="appointments"
        @cancel-success="handleCancelSuccess"
        />
      <Balance
        v-model:overlay-visible="redeemOverlay"
        @redeem-success="handleRedeemSuccess"
      />
      <DatePicker
          v-model:modelValue="datePicker"
          @update:model-value="updateDate"
          v-model:overlay-visible="datePickerOverlay"
      />
      <SubmitAppointment
          :selected="selected"
          :booking-date="formatDateForBooking(datePicker)"
          @appointment-success="handelAppointmentSuccess"
        />
      <v-row class="my-auto mx-auto flex-nowrap" justify="space-between">
        <v-col
          cols="auto"
        >
          <v-btn
              variant="flat"
              color="#1a1a1a"
              elevation="2"
              @click="onMyCourtsClick"
              :loading="usernameLoading"
              rounded
              style="font-size: 1rem"
              class="text-center align-center justify-center"
          >
            <v-icon icon="mdi-account-circle-outline" start></v-icon>
            {{ userName }}
          </v-btn>
          <v-btn
              variant="flat"
              icon="mdi-exit-to-app"
              rounded="xl"
              color="#b00020"
              class="px-1 ml-2"
              density="compact"
              elevation="2"
              @click="isLogoutClicked = true"
          ></v-btn>
        </v-col>
        <v-col
            cols="auto"
        >
          <v-chip
              size="large"
              variant="outlined"
              @click="redeemOverlay = ! redeemOverlay"
              color="#1a1a1a"
              style="border: #1a1a1a 2.5px solid"
              elevation="2"
          >
            <v-icon icon="mdi-clock-time-eight" start color="#1a1a1a"></v-icon>
            场时余额：{{ courtBalance }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row class="mx-auto my-auto align-center mt-1">
        <v-icon
            icon="mdi-calendar-clock"
            class="my-2"
            @click="datePickerOverlay = !datePickerOverlay"
        ></v-icon>
        <v-chip
            variant="text"
            style="font-weight: bold; font-size: medium"
            @click="datePickerOverlay = !datePickerOverlay"
            class="pa-1"
        >
          {{ formatDate(datePicker) }}
        </v-chip>
      </v-row>

      <v-card
          class="overflow-y-auto rounded-lg display-card py-1"
          variant="outlined"
      >

      <CourtGrid
          @update:selected="handleSelected"
          :selected-timestamp="selectedTimestamp"
          :appointment-success="appointmentSuccess"
      />
      </v-card>

    </v-container>
  </template>


<style scoped>
.display-card {
  border: 3px solid #1a1a1a;
}

</style>