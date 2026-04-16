import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react"
import { registerAction } from "../actions/register.action";

export const RegisterForm = () => {

    const navigate = useNavigate();
    //Estado: Mostrar o ocultar la contraseña
    const [showPassword, setShowPassword] = useState(false)
    type RegisterForm = {
        firstName: string
        lastName: string
        secondName: string
        email: string
        password: string
    }

    type BackendErrorResponse = {
        message: string
        status: number
        timestamp: string
        errors?: Record<string, string>
    }

    const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterForm>({
        mode: "onBlur",
        reValidateMode: "onChange"
    });

    const onSubmit = async (formData: RegisterForm) => {

        const { firstName, lastName, secondName, email, password } = formData;

        try {
            const data = await registerAction(firstName, lastName, secondName, email, password);
            localStorage.setItem('token', data.token);
            console.log('redireccionando al home');
            navigate("/datosPersonales");
        } catch (error: any) {
            const backendData = error.response?.data as BackendErrorResponse | undefined
            const backendErrors = backendData?.errors

            if (backendErrors) {
                Object.entries(backendErrors).forEach(([field, message]) => {
                    if (field in formData) {
                        setError(field as keyof RegisterForm, {
                            type: "server",
                            message,
                        })
                    }
                })
                return
            }

            setError("root", {
                type: "server",
                message: backendData?.message || "Ha ocurrido un error interno",
            })
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <Field>
                <FieldLabel htmlFor="name">Nombre</FieldLabel>
                <Input
                    {...register("firstName", { required: "El nombre es obligatorio", })}
                    type="text"
                    placeholder="Sergio"
                />
            </Field>
            {errors.firstName && (
                <p className="mt-2 text-sm text-red-500">{errors.firstName.message}</p>
            )}

            <Field>
                <FieldLabel htmlFor="surname1">Primer apellido</FieldLabel>
                <Input
                    {...register("lastName", { required: "El primer apellido es obligatorio" })}
                    type="text"
                    placeholder="Martínez"
                />
            </Field>
            {errors.lastName && (
                <p className="mt-2 text-sm text-red-500">{errors.lastName.message}</p>
            )}

            <Field>
                <FieldLabel htmlFor="surname2">Segundo apellido</FieldLabel>
                <Input
                    {...register("secondName", { required: "El segundo apellido es obligatorio" })}
                    type="text"
                    placeholder="García"
                />
            </Field>
            {errors.secondName && (
                <p className="mt-2 text-sm text-red-500">{errors.secondName.message}</p>
            )}

            <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                    {...register("email", {
                        required: "El primer email es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Introduce un email válido",
                        },
                    })}
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                />

            </Field>
            {errors.email && (
                <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
            )}

            <Field>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>

                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        className="pr-10"
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener al menos 6 caracteres",
                            },
                        })}
                    />

                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </Field>

            {errors.password && (
                <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
            )}

            <Button type="submit" className="w-full">
                Crear cuenta
            </Button>
        </form>
    )
}