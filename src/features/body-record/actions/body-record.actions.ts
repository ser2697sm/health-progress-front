import { healthProgressApi } from "@/api/healthProgressApi";
import axios from "axios";
import type { BodyRecordResponse } from "../types/body-record.response";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const createBodyRecord = async (weight: string): Promise<BodyRecordResponse> => {
    try {
        const { data } = await healthProgressApi.post('/body-record/create', {
            weight
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
