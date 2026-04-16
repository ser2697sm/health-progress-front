
import { Link } from "react-router"
import { LoginForm } from "../components/LoginForm"

export const LoginPage = () => {

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

                <LoginForm />

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
