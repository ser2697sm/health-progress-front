import { healthProgressApi } from "@/api/healthProgressApi"
import type { AuthResponse } from "../interface/auth.response"
import axios from "axios"

export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {

    try {
        const { data } = await healthProgressApi.post('/auth/login', {
            email,
            password
        })
        console.log(data)
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message;
            throw new Error(message);
        }

        throw new Error("Error inesperado")
    }

}