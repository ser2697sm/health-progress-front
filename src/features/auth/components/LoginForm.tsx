import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { loginAction } from "../actions/login.action"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"

export const LoginForm = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")

    type LoginForm = {
        email: string
        password: string
    }

    const { register, handleSubmit } = useForm<LoginForm>()

    const onSubmit = async (data: LoginForm) => {

        const email = data.email
        const password = data.password

        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);
            console.log('redireccionando al home');
            navigate("/home");
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("No se pudo iniciar sesión")
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                    {...register("email", { required: true })}
                    type="email"
                    name="email"
                    onChange={(e) => {
                        setErrorMessage("")
                    }}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                />
            </Field>

            <Field>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <Input
                    {...register("password", { required: true })}
                    id="password"
                    type="password"
                    name="password"
                    onChange={(e) => {
                        setErrorMessage("")
                    }}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"

                />

            </Field>

            {errorMessage && (
                <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
                    {errorMessage}
                </div>
            )}

            <Button type="submit" className="w-full">
                Entrar
            </Button>
        </form>
    )
}