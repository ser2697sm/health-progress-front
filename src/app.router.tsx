import { createBrowserRouter, Navigate } from "react-router";
//import { AuthLayout } from "./auth/layouts/AuthLayout";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { AuthLayout } from "./auth/layouts/AuthLayout";
import { DatosPersonalesPage } from "./datosPersonales/pages/DatosPersonalesPage";
import { Dashboard } from "./Dashboard/pages/DashBoard";

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/login" />
            },
            {
                path: '/login',
                element: <LoginPage />

            },
            {
                path: '/register',
                element: <RegisterPage />

            }
        ]
    },
    //Datos Personales
    {
        path: '/datosPersonales',
        element: <DatosPersonalesPage />
    },
    {
        path: '/home',
        element: <Dashboard />
    },

])