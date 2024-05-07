import { defineStore } from "pinia";
import {computed, ref} from 'vue'
import { getAppointments } from "../services/getAppointmentDetails.js";


export const useAppointmentDetail = defineStore('appointmentDetail', () => {
    const appointments = ref([{appointmentID: "1212", startTime: "", courtNo: ""}])

    async function fetchAppointmentDetails() {
        const response = await getAppointments()
        const mapped = response.data.map(item => ({
            appointmentID: item.id,
            startTime: formatDateTime(item.appointment_date, item.start_time),
            courtNo: formatCourtNo(item.resources_number)
        }))
        appointments.value = mapped
    }

    function formatDateTime(timestamp, startTime) {
        const date = new Date(timestamp + (8 * 60 * 60 * 1000)); // Convert UTC timestamp to UTC+8
        const formattedDate = date.toISOString().split('T')[0]; // Get yyyy-mm-dd part
        return `${formattedDate} ${startTime}`; // Combine with startTime
    }

    function formatCourtNo(resourcesNumber) {
        const prefix = resourcesNumber.slice(0, 3);
        const number = parseInt(resourcesNumber.slice(3), 10);
        if (prefix === 'JLH' && number >= 1 && number <= 9) {
            return `A${number}`;
        } else if (prefix === 'JLH' && number >= 10) {
            return `B${number - 9}`
        } else if (prefix.startsWith('WX')) {
            return `C${number}`;
        }
        return resourcesNumber; // Default return original if no matching pattern
    }
    const getAppointmentsValue = computed(() => appointments.value)
    return { getAppointmentsValue, fetchAppointmentDetails }
})
