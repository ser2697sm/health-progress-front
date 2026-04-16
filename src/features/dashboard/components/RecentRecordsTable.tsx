import { Button } from "@/components/ui/button"
import type { DashboardResponse } from "../types/dashboard.response"

type RecordItem = DashboardResponse["generalData"][number]

type RecentRecordsTableProps = {
    records: RecordItem[]
}

export const RecentRecordsTable = ({ records }: RecentRecordsTableProps) => {
    return (
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
                        {records.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-muted-foreground">
                                    No hay datos todavía
                                </td>
                            </tr>
                        ) : (
                            records.map((item, index) => (
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
    )
}