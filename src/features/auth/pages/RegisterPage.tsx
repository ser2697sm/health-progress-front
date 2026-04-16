import { Link } from "react-router"
import { RegisterForm } from "../components/RegisterForm"

export const RegisterPage = () => {

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

        <RegisterForm />

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

