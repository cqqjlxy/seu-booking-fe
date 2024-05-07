<script setup>
import { ref, watch } from 'vue'
const today = new Date();
const minDate = ref(
    `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`
)

const props = defineProps([
  'modelValue',
  'overlayVisible'
])
const emit = defineEmits([
  'update:modelValue',
  'update:overlayVisible'
])

const datePicker = ref(props.modelValue)
const overlayVisible = ref(props.overlayVisible)

watch(datePicker, (newVal) => {
  emit('update:modelValue', newVal)
})

watch(overlayVisible, (newVal) => {
  emit('update:overlayVisible', newVal)
})

watch(() => props.modelValue, (newVal) => {
  datePicker.value = newVal
})

watch(() => props.overlayVisible, (newVal) => {
  overlayVisible.value = newVal
})

</script>

<template>
  <v-overlay v-model="overlayVisible" class="justify-center align-center">
    <v-date-picker
        elevation="20"
        rounded="lg"
        :min="minDate"
        v-model="datePicker"
        @update:modelValue="overlayVisible = false"
    ></v-date-picker>
  </v-overlay>
</template>

<style scoped>

</style>