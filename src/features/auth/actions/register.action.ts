import { healthProgressApi } from "@/api/healthProgressApi";
import type { RegisterResponse } from "../types/register.response";

export const registerAction = async (firstName: string, lastName: string, secondName: string, email: string, password: string): Promise<RegisterResponse> => {
    const { data } = await healthProgressApi.post('/auth/register', {
        firstName,
        lastName,
        secondName,
        email,
        password
    })

    return data;
}