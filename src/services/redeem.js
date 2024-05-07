import axios from 'axios'
import { useAuthStore } from "../stores/auth.js";


export async function redeem(codeInput) {
    const authStore = useAuthStore()
    if (!authStore.checkTokenValidity(localStorage.getItem('accessToken'))) {
        authStore.logOut()
    }
    const access = localStorage.getItem('accessToken')
    return axios.post(`${import.meta.env.VITE_API_BASE_URL}/redeem`, {code: codeInput},{
        headers: {
            Authorization: `Bearer ${access}`
        }
    })
    .then(response => {
        return response
    })
    .catch(error => {
        if (error.response && error.response.status === 401) {
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