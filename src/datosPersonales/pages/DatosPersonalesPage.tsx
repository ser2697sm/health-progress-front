import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm, type SubmitHandler } from "react-hook-form";
import { registerDatosPersonalesAction } from "../actions/datosPersonales.action";
import { useNavigate } from "react-router";


type Inputs = {
    height: string;
    weight: string;
    gender: boolean;
    age: number;
};

export const DatosPersonalesPage = () => {
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
            const normalizedHeight = formData.height.replace(",", ".");

            const response = await registerDatosPersonalesAction(
                normalizedWeight,
                normalizedHeight,
                Number(formData.age),
                formData.gender
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
                        Datos Personales
                    </h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Completa tus datos personales básicos para tener un punto de partida
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <Field>
                        <FieldLabel htmlFor="height">Altura (m)</FieldLabel>
                        <Input
                            id="height"
                            type="text"
                            placeholder="1,66"
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, "");
                            }}
                            {...register("height", {
                                required: "La altura es requerida",
                                validate: (value) =>
                                    /^\d([,]\d{1,2})?$/.test(value) || "Formato válido: 1,66",
                            })}
                            className={cn({
                                "border-red-500": errors.height,
                            })}
                        />
                        {errors.height && (
                            <p className="text-red-500 text-sm">{errors.height.message}</p>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="weight">Peso (kg)</FieldLabel>
                        <Input
                            id="weight"
                            type="text"
                            placeholder="75,3"
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, "");
                            }}
                            {...register("weight", {
                                required: "El peso es obligatorio",
                                validate: (value) =>
                                    /^\d{1,3}([.,]\d{1})?$/.test(value) || "Formato válido: 75,3",
                            })}
                            className={cn({
                                "border-red-500": errors.weight,
                            })}
                        />
                        {errors.weight && (
                            <p className="text-red-500 text-sm">{errors.weight.message}</p>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="gender">Sexo</FieldLabel>
                        <select
                            id="gender"
                            className="w-full rounded-md border px-3 py-2 bg-background"
                            defaultValue=""
                            {...register("gender", {
                                required: "El sexo es obligatorio",
                            })}
                        >
                            <option value="" disabled>
                                Selecciona un género
                            </option>
                            <option value="HOMBRE">Hombre</option>
                            <option value="MUJER">Mujer</option>
                        </select>
                        {errors.gender && (
                            <p className="text-red-500 text-sm">{errors.gender.message}</p>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="age">Edad</FieldLabel>
                        <Input
                            id="age"
                            type="number"
                            placeholder="23"
                            onInput={(e) => {
                                if (e.currentTarget.value.length > 3) {
                                    e.currentTarget.value = e.currentTarget.value.slice(0, 3);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "-" || e.key === "e" || e.key === "E") {
                                    e.preventDefault();
                                }
                            }}
                            {...register("age", {
                                required: "La edad es obligatoria",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Edad mínima 1",
                                },
                                max: {
                                    value: 120,
                                    message: "Edad máxima 120",
                                },
                            })}
                            className={cn({
                                "border-red-500": errors.age,
                            })}
                        />
                        {errors.age && (
                            <p className="text-red-500 text-sm">{errors.age.message}</p>
                        )}
                    </Field>

                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                    )}

                    <Button type="submit" className="w-full">
                        Siguiente
                    </Button>
                </form>
            </div>
        </main>
    );
};