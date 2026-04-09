import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerDatosPersonalesAction } from "@/datosPersonales/actions/datosPersonales.action";
import { cn } from "@/lib/utils";
import { useForm, type SubmitHandler } from "react-hook-form";
export const NewRecordModal = () => {
    type Inputs = {
        height: string;
        weight: string;
        gender: boolean;
        age: number;
    };
    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        try {
            setErrorMessage("");
            const {
                register,
                handleSubmit,
                formState: { errors },
            } = useForm<Inputs>();

            const normalizedWeight = formData.weight.replace(",", ".");
            const normalizedHeight = formData.height.replace(",", ".");

            const response = await registerDatosPersonalesAction(
                normalizedWeight,
                normalizedHeight,
                Number(formData.age),
                formData.gender
            );

            // console.log("Respuesta API:", response);

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("No se pudieron guardar los datos");
            }
        }
    };
    function handleSubmit(onSubmit: SubmitHandler<{ height: string; weight: string; gender: boolean; age: number; }>): import("react").SubmitEventHandler<HTMLFormElement> | undefined {
        throw new Error("Function not implemented.");
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Nuevo registro</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nuevo registro</DialogTitle>
                </DialogHeader>

                {/* Aquí tu contenido */}
                <form className="space-y-5">
                    <Field>
                        <FieldLabel htmlFor="weight">Peso (kg)</FieldLabel>
                        <Input
                            id="weight"
                            type="text"
                            placeholder="75,3"
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, "");
                            }}
                        />
                    </Field>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">Pliegues (mm)</h1>
                    <Field>
                        <FieldLabel htmlFor="weight">Bicipital</FieldLabel>
                        <Input
                            id="weight"
                            type="text"
                            placeholder="75,3"
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, "");
                            }}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="weight">Tricipital</FieldLabel>
                        <Input
                            id="weight"
                            type="text"
                            placeholder="75,3"
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, "");
                            }}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="weight">abdominal</FieldLabel>
                        <Input
                            id="weight"
                            type="text"
                            placeholder="75,3"
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, "");
                            }}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="weight">Supraespinoso</FieldLabel>
                        <Input
                            id="weight"
                            type="text"
                            placeholder="75,3"
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, "");
                            }}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="weight">Pierna</FieldLabel>
                        <Input
                            id="weight"
                            type="text"
                            placeholder="75,3"
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, "");
                            }}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="weight">Muslo</FieldLabel>
                        <Input
                            id="weight"
                            type="text"
                            placeholder="75,3"
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, "");
                            }}
                        />
                    </Field>
                    <Button type="submit" className="w-full">
                        Guardar Registro
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function setErrorMessage(arg0: string) {
    throw new Error("Function not implemented.");
}
