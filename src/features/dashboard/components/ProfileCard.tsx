import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

type Profile = {
    firstName: string
    lastName: string
    secondName: string
} | undefined

type LatestData = {
    height: number
    age: number
    gender: string
} | undefined

type ProfileCardProps = {
    profile: Profile
    latestData: LatestData
}

const formatText = (text?: string) => {
    if (!text) return "-"
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const ProfileCard = ({ profile, latestData }: ProfileCardProps) => {
    return (
        <section className="mt-8 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
                {/* Resumen corporal */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">
                            Resumen corporal
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Vista rápida de tu estado actual.
                        </p>
                    </div>

                    <Button variant="outline">Ver más</Button>
                </div>

                <div className="mt-6 rounded-2xl border bg-background p-6">
                    <p className="text-sm text-muted-foreground">Peso actual</p>
                    <div className="mt-2 flex items-end gap-3">
                        <h2 className="text-4xl font-bold tracking-tight text-foreground">
                            74.2
                        </h2>
                        <span className="pb-1 text-base text-muted-foreground">kg</span>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                        Has bajado <span className="font-medium text-foreground">0.8 kg</span> respecto al registro anterior.
                    </p>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-xl border bg-background p-4">
                        <p className="text-xs text-muted-foreground">IMC</p>
                        <p className="mt-1 text-lg font-semibold text-foreground">26.9</p>
                    </div>

                    <div className="rounded-xl border bg-background p-4">
                        <p className="text-xs text-muted-foreground">Grasa corporal</p>
                        <p className="mt-1 text-lg font-semibold text-foreground">19.8%</p>
                    </div>

                    <div className="rounded-xl border bg-background p-4">
                        <p className="text-xs text-muted-foreground">Masa muscular</p>
                        <p className="mt-1 text-lg font-semibold text-foreground">32.4 kg</p>
                    </div>

                    <div className="rounded-xl border bg-background p-4">
                        <p className="text-xs text-muted-foreground">Cintura</p>
                        <p className="mt-1 text-lg font-semibold text-foreground">84 cm</p>
                    </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border bg-background p-4">
                        <p className="text-xs text-muted-foreground">Último registro</p>
                        <p className="mt-1 text-sm font-medium text-foreground">13/04/2026</p>
                    </div>

                    <div className="rounded-xl border bg-background p-4">
                        <p className="text-xs text-muted-foreground">Registro anterior</p>
                        <p className="mt-1 text-sm font-medium text-foreground">01/04/2026</p>
                    </div>
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
                            {`${profile?.firstName} ${profile?.lastName} ${profile?.secondName}`}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Tus datos base
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="rounded-xl border bg-background p-4">
                        <p className="text-xs text-muted-foreground">Altura</p>
                        <p className="mt-1 text-sm font-medium text-foreground"> {`${latestData?.height}`} m</p>
                    </div>

                    <div className="rounded-xl border bg-background p-4">
                        <p className="text-xs text-muted-foreground">Edad</p>
                        <p className="mt-1 text-sm font-medium text-foreground">{`${latestData?.age}`} años</p>
                    </div>

                    <div className="rounded-xl border bg-background p-4">
                        <p className="text-xs text-muted-foreground">Sexo</p>
                        <p className="mt-1 text-sm font-medium text-foreground">{formatText(latestData?.gender ?? "")}</p>
                    </div>

                    <Button className="w-full">Editar perfil</Button>
                </div>
            </div>
        </section>
    )

}