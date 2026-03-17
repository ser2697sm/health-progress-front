import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"

export const HealthProgressApp = () => {
    return <RouterProvider router={appRouter} />
}