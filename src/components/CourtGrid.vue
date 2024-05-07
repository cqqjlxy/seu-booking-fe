<script setup>
import { computed, ref, watch } from 'vue'
import { useCourtInfo } from "../stores/courtInfo.js"

const store = useCourtInfo()
const props = defineProps({
  selectedTimestamp: Number,
  appointmentSuccess: Boolean,
})
const emits = defineEmits([
  'update:selected',
])

const courtNo = computed(() => store.courtNo)
const timeSlotNo = computed(() => store.timeSlot)
const courtInfo = computed(() => store.courtInfo)
const selectedTimestamp = ref(new Date().getTime())
const courtGridLoading = ref(false)
const appointmentSuccess = ref(props.appointmentSuccess)
const selected = ref({
  courtId: '',
  timeSlot: ''
})

refreshCourtGrid()

watch(() => props.selectedTimestamp, (newVal) => {
  selectedTimestamp.value = newVal
  refreshCourtGrid()
})

watch(() => props.appointmentSuccess, (newVal) => {
  appointmentSuccess.value = !appointmentSuccess.value
  refreshCourtGrid()
  appointmentSuccess.value = !appointmentSuccess.value
})

watch(selected, (newVal) => {
  emits('update:selected', newVal)
})

function onClick(n, m) {
  selected.value = {
    courtId: n,
    timeSlot: m
  }
}

function checkCourtAvailability(courtNo, timeslotNo) {
  if (courtInfo.value[courtNo]["slots"][timeslotNo + ":00"]["canAppointmentNumber"] === 1) {
    return true
  } else {
    return false
  }
}

async function refreshCourtGrid() {
  courtGridLoading.value = true
  await store.fetchCourtInfo(selectedTimestamp.value)
  courtGridLoading.value = false
}


</script>

<template>
  <v-skeleton-loader
      type="table"
      v-if="courtGridLoading"
  >
  </v-skeleton-loader>
  <v-row v-for="n in courtNo" :key="n" class="mx-auto my-auto py-1 justify-space-around" v-if="!courtGridLoading">
    <v-col cols="auto" class="align-content-center">
      <v-chip
          color="#1a1a1a"
          variant="flat"
          class="px-6 py-5"
          style="font-size: medium; font-weight: bold;"
      >
        {{ n }}
      </v-chip>
    </v-col>
    <v-col cols="8" class="align-content-center">
      <v-row class="justify-space-around">
        <v-card
            v-for="m in timeSlotNo"
            :key="m"
            variant="flat"
            rounded="sm"
            class="mx-1 mb-1 mt-1 text-center align-content-center"
            :class="checkCourtAvailability(n, m) ? 'slot-card-available' : 'slot-card-occupied'"
            width="30px"
            height="30px"
            :elevation="checkCourtAvailability(n, m) ? 2 : 0"
            @click="!checkCourtAvailability(n, m) ? null : onClick(n, m)"
        >
          {{ m }}
        </v-card>
      </v-row>
    </v-col>
    <v-divider class="mt-1"></v-divider>
  </v-row>
</template>

<style scoped>
.slot-card-available {
  color: #1a1a1a;
  background-color: #bbff2e;
  border: #1a1a1a 2.5px solid;
}

.slot-card-occupied {
  color: #1a1a1a;
  background-color: whitesmoke;
  border: darkgray 3px dotted;
}
</style>