<script setup>
import Redeem from "./Redeem.vue"
import Topup from "./Topup.vue"
import { ref, watch } from 'vue'

const props = defineProps([
    'overlayVisible'
])
const overlayVisible = ref(props.overlayVisible)
const emit = defineEmits([
    'update:overlayVisible',
    'redeem-success'
])
const topupVisible = ref(false)

watch(() => props.overlayVisible, (newVal) => {
  overlayVisible.value = newVal
})
watch(overlayVisible, (newVal) => {
  emit('update:overlayVisible', newVal)
})

function handleTopupClick(newValue) {
  topupVisible.value = newValue
}


</script>

<template>
  <v-overlay
    v-model="overlayVisible"
    class="justify-center align-start"
    >
    <v-card
      width="90vw"
      rounded="lg"
      class="mt-10 pb-7"
      >
      <Redeem
        v-if="!topupVisible"
        @topup-click="handleTopupClick"
        @redeem-success="emit('redeem-success')"
      />
      <Topup
        v-if="topupVisible"
        @return-click="handleTopupClick"
      />

    </v-card>

  </v-overlay>
</template>

<style scoped>

</style>