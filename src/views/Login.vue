<script setup>
import Footer from "/src/components/Footer.vue"
import { ref, watch } from 'vue'
import { useAuthStore } from "../stores/auth.js"
import { useRouter } from "vue-router"


const authStore = useAuthStore()
const router = useRouter()
const userName = ref('')
const password = ref('')
const loginLoading = ref(false)
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

async function login() {
  loginLoading.value = true
  alertVisible.value = false
  try {
    await authStore.logIn({
      username: userName.value,
      password: password.value,

    })
    router.push('/').catch(err => {
      console.error('Router error:', err)
    })
  } catch (e) {
    alertMessage.value = authStore.getAlertMessage
    alertTitle.value = authStore.getAlertTitle
    authStore.clearAlert()
    alertVisible.value = true
  } finally {
    loginLoading.value = false
  }
}

function onClickRegister() {
  router.push('/register').catch(err => {
    console.error('Router error:', err)
  })
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
        <v-col>
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
              LOGIN
            </v-card-title>
            <v-row
                v-if="loginLoading"
                class="mx-1 justify-center my-2 mb-4"
            >
              <span
                  style="font-size: 1rem; color: #1a1a1a"
                  class="text-center"
              >
              正在获取访问令牌...<br>请耐心等待20s，不要刷新页面！
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
                  color="#1a1a1a"
                  :rules="userNameRules"
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
                  color="#1a1a1a"
                  @click:append-inner="showPassword = !showPassword"
              >
              </v-text-field>

              <v-btn
                  v-if="false"
                  variant="plain"
                  class="pt-0"
                  size="x-small"
                  rounded="xl"
                  color="#1a1a1a"
              >Change Password</v-btn>


              <v-btn
                  class="my-3"
                  block
                  rounded="xl"
                  @click="login"
                  :loading="loginLoading"
                  color="#1a1a1a"
                  elevation="1"
                  height="3rem"
              >Login</v-btn>

              <v-btn
                  v-if="false"
                  class="my-3"
                  block
                  rounded="xl"
                  variant="outlined"
                  elevation="1"
                  height="2.5rem"
                  color="#1a1a1a"
                  @click="onClickRegister"
              >Register</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>


    </v-hover>
  </v-container>
  <Footer/>
</template>

<style scoped>

</style>