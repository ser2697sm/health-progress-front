import { useEffect, useState } from "react"
import type { DashboardResponse } from "../types/dashboard.response"
import { DashboardAction } from "../actions/dashboard.action"
import { DashboardHeader } from "../components/DashboardHeader"
import { StatsGrid } from "../components/StatsGrid"
import { ProfileCard } from "../components/ProfileCard"
import { RecentRecordsTable } from "../components/RecentRecordsTable"
export const DashboardPage = () => {
    // const [data, setData] = useState<DatosPersonalesResponseGet[]>([]);
    const [data, setData] = useState<DashboardResponse>();
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const result = await consultDatosPersonalesAction();
    //             setData(result); // 👈 guardas los datos
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     getData();
    // }, [])

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await DashboardAction();
                setData(result); // 👈 guardas los datos
            } catch (error) {
                console.error(error);
            }
        };

        getData();
    }, [])

    const latestData = data?.generalData[0]

    return (
        <main className="min-h-screen bg-background px-4 py-8">
            <div className="mx-auto w-full max-w-6xl">
                {/* Seccion: Titulo + nuevos registros */}
                <DashboardHeader />

                {/* Seccion: Cajas contenedoras de Peso Actual, imc,entrenos y progreso */}
                <StatsGrid latestData={latestData} />

                {/* Seccion: Perfil */}
                <ProfileCard profile={data?.profile} latestData={latestData} />

                {/* Seccion: Últimos registros */}
                {/*TODO: mejorar el */}
                <RecentRecordsTable records={data?.generalData ?? []} />
            </div>
        </main>
    )
}