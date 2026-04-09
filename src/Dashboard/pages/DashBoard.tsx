import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils"
import { Activity, Dumbbell, Scale, Search, TrendingUp, User } from "lucide-react"
import { useEffect, useState } from "react"
import { DashboardAction } from "../actions/Dashboard.action"
import type { DashboardResponse } from "../interfaces/Dasboard.response"
import { NewRecordModal } from "./NewModal"
export const Dashboard = () => {
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

    const stats = [
        {
            title: "Peso actual",
            value: latestData ? `${latestData.weight} kg` : "-",
            subtitle: "Último registro",
            icon: Scale,
        },
        {
            title: "IMC",
            value: latestData ? `${latestData.imc}` : "-",
            subtitle: "Calculado automáticamente",
            icon: Activity,
        },
        {
            title: "Entrenos",
            value: "4",
            subtitle: "Esta semana",
            icon: Dumbbell,
        },
        {
            title: "Progreso",
            value: "-1,2 kg",
            subtitle: "Últimos 30 días",
            icon: TrendingUp,
        },
    ]

    const formatText = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };
    return (
        <main className="min-h-screen bg-background px-4 py-8">
            <div className="mx-auto w-full max-w-6xl">
                <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                            Dashboard
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Visualiza tu progreso físico y tus últimos registros de forma rápida.
                        </p>
                    </div>

                    <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                        <div className="relative w-full sm:w-72">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Buscar registros..."
                                className="pl-9"
                            />
                        </div>
                        {/* Modal Nuevo registro*/}
                        <NewRecordModal />
                    </div>
                </header>

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon

                        return (
                            <div
                                key={stat.title}
                                className={cn(
                                    "rounded-2xl border bg-card p-5 shadow-sm transition-all",
                                    "hover:shadow-md"
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                                        <h2 className="mt-2 text-2xl font-semibold text-foreground">
                                            {stat.value}
                                        </h2>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {stat.subtitle}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border bg-background p-2">
                                        <Icon className="size-5 text-foreground" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>

                <section className="mt-8 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                    <div className="rounded-2xl border bg-card p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    Evolución reciente
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Resumen de tus últimos cambios registrados.
                                </p>
                            </div>

                            <Button variant="outline">Ver más</Button>
                        </div>

                        <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-dashed bg-background">
                            <p className="text-sm text-muted-foreground">
                                Aquí puedes poner una gráfica de peso / IMC / medidas
                            </p>
                        </div>
                    </div>

                    {/* PERFIL */}
                    <div className="rounded-2xl border bg-card p-6 shadow-sm">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-xl border bg-background p-2">
                                <User className="size-5 text-foreground" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    {`${data?.profile.firstName} ${data?.profile.lastName} ${data?.profile.secondName}`}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Tus datos base
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-xl border bg-background p-4">
                                <p className="text-xs text-muted-foreground">Altura</p>
                                <p className="mt-1 text-sm font-medium text-foreground">{data?.generalData[0].height} m</p>
                            </div>

                            <div className="rounded-xl border bg-background p-4">
                                <p className="text-xs text-muted-foreground">Edad</p>
                                <p className="mt-1 text-sm font-medium text-foreground">{data?.generalData[0].age} años</p>
                            </div>

                            <div className="rounded-xl border bg-background p-4">
                                <p className="text-xs text-muted-foreground">Sexo</p>
                                <p className="mt-1 text-sm font-medium text-foreground">{formatText(data?.generalData[0].gender ?? "")}</p>
                            </div>

                            <Button className="w-full">Editar perfil</Button>
                        </div>
                    </div>
                </section>

                {/* Seccion: Últimos registros */}
                {/*TODO: mejorar el */}
                <section className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">
                                Últimos registros
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Consulta tus entradas más recientes.
                            </p>
                        </div>

                        <Button variant="outline">Exportar</Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[520px] border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-left text-sm text-muted-foreground">
                                    <th className="pb-2 font-medium">Fecha</th>
                                    <th className="pb-2 font-medium">Peso</th>
                                    <th className="pb-2 font-medium">IMC</th>
                                    <th className="pb-2 font-medium">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.generalData.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-6 text-muted-foreground">
                                            No hay datos todavía
                                        </td>
                                    </tr>
                                ) : (
                                    data?.generalData.map((item, index) => (
                                        <tr key={index} className="rounded-xl">
                                            <td className="rounded-l-xl border bg-background px-4 py-3 text-sm text-foreground">
                                                {new Date(item.recordedAt).toLocaleDateString("es-ES", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric"
                                                })}
                                            </td>
                                            <td className="border bg-background px-4 py-3 text-sm text-foreground">
                                                {item.weight}
                                            </td>
                                            <td className="border bg-background px-4 py-3 text-sm text-foreground">
                                                {item.imc}
                                            </td>
                                            <td className="rounded-r-xl border bg-background px-4 py-3 text-sm">
                                                <Button variant="ghost" size="sm">
                                                    Ver detalle
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    )
}