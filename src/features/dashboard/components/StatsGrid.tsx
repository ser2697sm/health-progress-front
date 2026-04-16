import { cn } from "@/lib/utils"
import { Flame, Dumbbell, TrendingUp, Activity } from "lucide-react"

type LatestData = {
    weight: number
    imc: number
} | undefined

type StatsGridProps = {
    latestData: LatestData
}

export const StatsGrid = ({ latestData }: StatsGridProps) => {
    const stats = [
        {
            title: "Entrenos",
            value: latestData ? `${latestData.weight} kg` : "-",
            subtitle: "Último registro",
            icon: Dumbbell,
        },
        {
            title: "Progreso (30 días)",
            value: latestData ? `${latestData.imc}` : "-",
            subtitle: "Calculado automáticamente",
            icon: Activity,
        },
        {
            title: "Racha",
            value: "4",
            subtitle: "Esta semana",
            icon: Flame,
        },
        {
            title: "Objetivo",
            value: "-1,2 kg",
            subtitle: "Últimos 30 días",
            icon: TrendingUp,
        },
    ]

    return (
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
                                <Icon className="size-5 text-foreground" children={undefined} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}