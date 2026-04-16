import { healthProgressApi } from "@/api/healthProgressApi"
import type { DashboardResponse } from "../types/dashboard.response"
import axios from "axios"

const getAuthHeaders = () => {
    const token = localStorage.getItem("token")

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const DashboardAction = async (): Promise<DashboardResponse> => {
    try {
        const { data } = await healthProgressApi.get('/dashboard/loadDashboard', getAuthHeaders())
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message;
            throw new Error(message);
        }
        throw new Error("Error inexperado")
    }
}