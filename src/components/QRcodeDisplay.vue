<script setup>
import { computed } from 'vue'
import { useCourtInfo } from "../stores/courtInfo.js"

const store = useCourtInfo()
const emit = defineEmits(['return-click'])
const props = defineProps({
  courtNo: String,
  startTime: String,
  qrBase64: String,
})
const courtName = computed(() => store.courtName[props.courtNo])


function onReturnClick() {
  emit('return-click', false)
}

</script>

<template>
  <v-card
      rounded="lg"
      width="90vw"
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
      class="justify-center"
      >
      <span
        style="font-size: 1.6rem; font-weight: bold"
      >
        {{ courtName }}
      </span>
      <br>
    </v-row>
    <v-row
        class="justify-center mt-4;"
    >
      <span
          style="font-size: 1.6rem; font-weight: bold"
      >
        {{ props.startTime }}
      </span>
    </v-row>
    <v-row
      class="mx-3 mb-5 justify-center"
    >
      <v-img
        :src="'data:image/png;base64,'+ props.qrBase64"
        cover
      />
    </v-row>
  </v-card>
</template>

<style scoped>

</style>