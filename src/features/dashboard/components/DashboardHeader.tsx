import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { NewRecordModal } from "./NewRecordModal";

export const DashboardHeader = () => {
    return (
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
    )
}

