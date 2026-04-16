import { createBrowserRouter } from "react-router";
//import { AuthLayout } from "./auth/layouts/AuthLayout";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import { PersonalDataPage } from "./features/personal-data/pages/PersonalDataPage";
import { DashboardPage } from "./features/dashboard/pages/DashBoardPage";
import { BodyRecordPage } from "./features/body-record/pages/BodyRecordPage";
import AdminPanelPage from "./features/adminPanel/pages/AdminPage";

export const appRouter = createBrowserRouter([

    //Auth
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '/admin',
        element: <AdminPanelPage />
    },
    {
        path: '/register',
        element: <RegisterPage />

    },
    {
        path: '/bodyRecord',
        element: <BodyRecordPage />
    },
    //Datos Personales
    {
        path: '/datosPersonales',
        element: <PersonalDataPage />
    },
    {
        path: '/home',
        element: <DashboardPage />
    },

])