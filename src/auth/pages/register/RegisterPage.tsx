import { registerAction } from "@/auth/actions/register.action"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router"

export const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()


    const formData = new FormData(event.target as HTMLFormElement);
    setErrorMessage("")
    const name = formData.get("name") as string
    const surname1 = formData.get("surname1") as string
    const surname2 = formData.get("surname2") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      console.log({ name, surname1, surname2, email, password })
      const data = await registerAction(name, surname1, surname2, email, password);
      localStorage.setItem("token", data.token)
      console.log("Respuesta register:", data);
      console.log("Token:", data.token);
      localStorage.setItem("token", data.token);
      console.log("Token guardado:", localStorage.getItem("token"));
      navigate("/datosPersonales")

    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("No se pudo iniciar sesión")
      }
    }
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Crea tu cuenta
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Completa tus datos para empezar en Health Progress
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <Field>
            <FieldLabel htmlFor="name">Nombre</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Sergio"
              required

            />
          </Field>

          <Field>
            <FieldLabel htmlFor="surname1">Primer apellido</FieldLabel>
            <Input
              id="surname1"
              name="surname1"
              type="text"
              placeholder="Martínez"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="surname2">Segundo apellido</FieldLabel>
            <Input
              id="surname2"
              name="surname2"
              type="text"
              placeholder="García"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />

          </Field>

          <Field>
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </Field>

          <Button type="submit" className="w-full">
            Crear cuenta
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-foreground underline underline-offset-4 hover:text-foreground/80"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  )
}

