import { healthProgressApi } from "@/api/healthProgressApi";
import type { DatosPersonalesResponse } from "../types/datosPersonales.response";
import axios from "axios";
import type { DatosPersonalesResponseGet } from "../types/datosPersonalesGet.response";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const registerDatosPersonalesAction = async (height: string, age: number, genger: Boolean): Promise<DatosPersonalesResponse> => {
    try {
        const { data } = await healthProgressApi.post('/generalData/register', {
            height,
            age,
            genger
        },
            getAuthHeaders()
        )

        console.log(data);
        return data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message;
            throw new Error(message);
        }

        throw new Error("Error inesperado")
    };
}

export const consultDatosPersonalesAction = async (): Promise<DatosPersonalesResponseGet[]> => {

    try {
        const { data } = await healthProgressApi.get('/generalData/consultar', getAuthHeaders())
        return data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message;
            throw new Error(message);
        }

        throw new Error("Error inesperado")
    }
}
