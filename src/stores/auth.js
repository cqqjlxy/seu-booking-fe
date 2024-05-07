import { defineStore } from "pinia";
import { computed, ref } from 'vue';
import axios from 'axios';
import { jwtDecode } from "jwt-decode"


export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false);
    const user = ref({
        username: '',
        token: '',
        refreshToken: ''
    });
    const alertTitle = ref('')
    const alertMessage = ref('')

    function checkTokenValidity(token) {
        if (!token) return false
        const decoded = jwtDecode(token)
        const currentTime = Date.now() / 1000
        return decoded.exp > currentTime
    }

    const isLoggedIn = computed(() => isAuthenticated.value);
    const getAlertTitle = computed(() => alertTitle.value)
    const getAlertMessage = computed(() => alertMessage.value)
    const getDisplayName = computed(() => user.value.username)

    function saveTokens({ access, refresh }) {
        localStorage.setItem('accessToken', access)
        localStorage.setItem('refreshToken', refresh)
        isAuthenticated.value = true;
    }

    function clearTokens() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        isAuthenticated.value = false;
    }

    function saveUsername(username) {
        localStorage.setItem('username', username)
    }

    function clearUsername() {
        localStorage.removeItem('username')
    }

    function clearAlert() {
        alertMessage.value = ''
        alertTitle.value = ''
    }

    // Initialize the store state
    function initializeAuth() {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const displayName = localStorage.getItem('username');
        user.value = {
            username: displayName,
            token: accessToken,
            refreshToken: refreshToken
        }
        if (accessToken && checkTokenValidity(accessToken)) {
            isAuthenticated.value = true
            user.value.token = accessToken
        } else if (refreshToken && checkTokenValidity(refreshToken)) {
            refreshTokenApiCall(refreshToken)
        } else {
            clearUsername()
            clearTokens()
        }
    }

    async function refreshTokenApiCall(refreshToken) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/token/refresh`, { refresh: refreshToken })
            saveTokens({
                access: response.data.access,
                refresh: refreshToken,
            })
            isAuthenticated.value = true
            user.value.token = response.data.access
        } catch (error) {
            if (error.response && error.response.status === 401) {

                clearTokens()
            }
        }
    }


    async function logIn(credentials) {
        return axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, credentials)
            .then(response => {
                saveTokens({
                    access: response.data.access,
                    refresh: response.data.refresh
                })
                saveUsername(response.data.displayName)
                user.value.username = response.data.displayName
                user.value.token = response.data.access
                user.value.refreshToken = response.data.refresh
                isAuthenticated.value = true
            })
            .catch(error => {
                if (error.response.status === 401 ) {
                    console.log(error)
                    alertTitle.value = 'Invalid Credentials'
                    alertMessage.value = '用户名或密码错误，请重试，如果你在学校系统中更改过密码，请用新密码登录'
                } else {
                    console.log(error)
                    alertTitle.value = 'Authentication Error'
                    alertMessage.value = '登录失败，请稍后再试或联系管理员18223031162'
                }
                clearTokens()
                throw error
            })
    }


    function logOut() {
        clearTokens()
        clearUsername()
        user.value = {
            username: '',
            token: '',
            refreshToken: ''
        }
    }

    async function register(credentials) {
        return axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, credentials)
            .then(response => {
                saveTokens({
                    access: response.data.access,
                    refresh: response.data.refresh
                });
                saveUsername(response.data.displayName)
                user.value.username = response.data.displayName
                user.value.token = response.data.access
                user.value.refreshToken = response.data.refresh
                isAuthenticated.value = true
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    alertTitle.value = 'Invalid Registration'
                    alertMessage.value = '用户名已存在，请重试'
                } else if (error.response && error.response.status === 401) {
                    alertTitle.value = 'Invalid Password'
                    alertMessage.value = '一卡通号和密码错误，请检查是否与学校一致'
                } else if (error.response && error.response.status === 502) {
                    alertTitle.value = 'Timeout'
                    alertMessage.value = '获取访问令牌超时，请重试'
                } else {
                    console.log(error)
                    alertTitle.value = 'Unknown Error'
                    alertMessage.value = '未知错误，请稍后再试或联系管理员'
                }
                clearTokens()
                throw error
            })
    }

    return { isAuthenticated, user, isLoggedIn, logIn, logOut, initializeAuth, clearAlert, getAlertTitle, getAlertMessage, getDisplayName, register, checkTokenValidity, refreshTokenApiCall };
});
