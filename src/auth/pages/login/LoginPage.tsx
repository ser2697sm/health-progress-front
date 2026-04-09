import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { loginAction } from "@/auth/actions/login.action"
import { Link, useNavigate } from "react-router"



export const LoginPage = () => {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        setErrorMessage("")
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

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
    return (<>
        <main className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Bienvenido a Health Progress
                    </h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Introduce tus credenciales para poder continuar
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
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

                <p className="text-center text-sm text-muted-foreground mt-6">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register" className="text-foreground underline underline-offset-4 hover:text-foreground/80">
                        Registrate
                    </Link>
                </p>
            </div>
        </main>
    </>

    )
}
