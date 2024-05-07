<script setup>
import Footer from "/src/components/Footer.vue"
import { ref, watch } from 'vue'
import { useAuthStore } from "../stores/auth.js";
import { useRouter } from "vue-router";


const authStore = useAuthStore()
const router = useRouter()
const userName = ref('')
const password = ref('')
const registerLoading = ref(false)
const alertVisible = ref(false)
const showPassword = ref(false)
const alertMessage = ref('未知错误')
const alertTitle = ref('Unknown error')
const userNameRules = [
  v => !!v || '请输入一卡通号',
  v => v.length === 9 || '一卡通号长度为9位'
]

const passwordRules = [
  v => !!v || '请输入密码',
]

async function register() {
  if (userName.value === '' || password.value === '') {
    alertMessage.value = '请输入一卡通号和密码'
    alertTitle.value = 'Empty Credentialsl'
    alertVisible.value = true
    return
  }
  registerLoading.value = true
  alertVisible.value = false
  try {
    await authStore.register({
      username: userName.value,
      password: password.value
    })
  } catch (e) {
    alertMessage.value = authStore.getAlertMessage
    alertTitle.value = authStore.getAlertTitle
    authStore.clearAlert()
    alertVisible.value = true
  } finally {
    registerLoading.value = false
  }
}

watch(() => authStore.isLoggedIn, (newVal) => {
  if (newVal) {
    router.push('/').catch(err => {
      console.error('Router error:', err)
    })
  }
})

</script>

<template>
  <v-container class="fill-height">
    <v-hover v-slot="{ isHovering, props }">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-alert
              v-if="alertVisible"
              :text="alertMessage"
              :title="alertTitle"
              type="error"
              dense
              closable
              class="my-4"
          ></v-alert>
          <v-card
              class="mx-auto pa-12 pb-8"
              max-width="448"
              v-bind="props"
              :elevation="isHovering ? 7 : 3"
              rounded="lg"
              min-width="350"
          >
            <v-card-title class="text-h5 d-inline-flex align-start justify-start" color="#1a1a1a">
              REGISTER
            </v-card-title>
            <v-row
              v-if="registerLoading"
              class="mx-1 justify-center my-2"
            >
              <span
                  style="font-size: 1rem; color: #1a1a1a"
                  class="text-center"
              >
              首次注册需要与学校系统通信<br>请耐心等待20s，不要刷新页面！
            </span>
            </v-row>
            <v-form ref="form" fast-fail @submit.prevent>
              <v-text-field
                  class="my-3"
                  v-model="userName"
                  label="一卡通号"
                  variant="outlined"
                  outlined
                  required
                  :rules="userNameRules"
                  color="#1a1a1a"
              >
              </v-text-field>
              <v-text-field
                  class="my-3"
                  v-model="password"
                  :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                  label="Password"
                  variant="outlined"
                  outlined
                  required
                  :type="showPassword ? 'text' : 'password'"
                  :rules="passwordRules"
                  @click:append-inner="showPassword = !showPassword"
                  color="#1a1a1a"
              >
              </v-text-field>

              <v-btn
                  class="my-3"
                  block
                  rounded="xl"
                  @click="register"
                  :loading="registerLoading"
                  elevation="1"
                  height="3rem"
                  color="#1a1a1a"
              >Register</v-btn>

            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-hover>
  </v-container>
  <Footer />
</template>

<style scoped>

</style>