import axios from 'axios'
import { useAuthStore } from "../stores/auth.js";


export async function sendAppointment(timeSlotId, startTime, resourceId, timeStamp) {
    const authStore = useAuthStore()
    if (!authStore.checkTokenValidity(localStorage.getItem('accessToken'))) {
        authStore.logOut()
    }
    const access = localStorage.getItem('accessToken')
    return axios.post(`${import.meta.env.VITE_API_BASE_URL}/send-appointment`,{
        time_slot_id: timeSlotId,
        kssj: startTime,
        resource_id: resourceId,
        time_stamp: timeStamp
    }, {
        headers: {
            Authorization: `Bearer ${access}`
        }
    })
        .then(response => {
            return response
        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
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