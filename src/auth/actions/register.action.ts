import { healthProgressApi } from "@/api/healthProgressApi";
import type { RegisterResponse } from "../interface/register.response";
import axios from "axios";

export const registerAction = async (firstName: string, lastName: string, secondName: string, email: string, password: string): Promise<RegisterResponse> => {

    try {
        const { data } = await healthProgressApi.post('/auth/register', {
            firstName,
            lastName,
            secondName,
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