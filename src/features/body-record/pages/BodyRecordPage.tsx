import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { createBodyRecord } from "../actions/body-record.actions";

type Inputs = {
    weight: string;
};

export const BodyRecordPage = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();


    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        try {
            setErrorMessage("");
            const normalizedWeight = formData.weight.replace(",", ".");

            const response = await createBodyRecord(
                normalizedWeight,
            );
            // console.log("Respuesta API:", response);

            navigate("/home");
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("No se pudieron guardar los datos");
            }
        }
    };



    return (
        <main className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Peso
                    </h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Completa tus peso para tener un punto de partida
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <Field>
                        <FieldLabel htmlFor="weight">Peso (Kg)</FieldLabel>
                        <Input
                            id="weight"
                            type="text"
                            placeholder="56"
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, "");
                            }}
                            {...register("weight", {
                                required: "El peso es requerida",
                                /*validate: (value) => /^\d([,]\d{1,2})?$/.test(value) || "Formato válido: 1,66",*/
                            })}
                            className={cn({
                                "border-red-500": errors.weight,
                            })}
                        />
                        {errors.weight && (
                            <p className="text-red-500 text-sm">{errors.weight.message}</p>
                        )}
                    </Field>

                    <Button type="submit" className="w-full">
                        Siguiente
                    </Button>
                </form>
            </div>
        </main>
    )
}

