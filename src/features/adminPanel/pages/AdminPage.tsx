import { useMemo, useState } from "react"
import { Shield, UserPlus, Users, Search, Mail, Lock, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Role = "ADMIN" | "USER"

type UserItem = {
  id: number
  firstName: string
  email: string
  role: Role
  createdAt: string
}

type RegisterForm = {
  firstName: string
  email: string
  password: string
  role: Role
}

const initialUsers: UserItem[] = [
  {
    id: 1,
    firstName: "Sergio",
    email: "sergio@example.com",
    role: "ADMIN",
    createdAt: "2026-04-15",
  },
  {
    id: 2,
    firstName: "Laura",
    email: "laura@example.com",
    role: "USER",
    createdAt: "2026-04-14",
  },
]

export default function AdminPanelPage() {
  const [users, setUsers] = useState<UserItem[]>(initialUsers)
  const [search, setSearch] = useState("")
  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    email: "",
    password: "",
    role: "USER",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterForm, string>>>({})
  const [successMessage, setSuccessMessage] = useState("")

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return users

    return users.filter((user) =>
      [user.firstName, user.email, user.role].some((value) =>
        value.toLowerCase().includes(term)
      )
    )
  }, [search, users])

  const stats = useMemo(() => {
    const admins = users.filter((user) => user.role === "ADMIN").length
    const standardUsers = users.filter((user) => user.role === "USER").length

    return {
      total: users.length,
      admins,
      standardUsers,
    }
  }, [users])

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof RegisterForm, string>> = {}

    if (!form.firstName.trim()) {
      nextErrors.firstName = "El nombre es obligatorio"
    }

    if (!form.email.trim()) {
      nextErrors.email = "El email es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "El email no es válido"
    }

    if (!form.password.trim()) {
      nextErrors.password = "La contraseña es obligatoria"
    } else if (form.password.length < 6) {
      nextErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    if (!form.role) {
      nextErrors.role = "El rol es obligatorio"
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (field: keyof RegisterForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
    setSuccessMessage("")
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    const exists = users.some(
      (user) => user.email.toLowerCase() === form.email.trim().toLowerCase()
    )

    if (exists) {
      setErrors((prev) => ({ ...prev, email: "Ya existe un usuario con ese email" }))
      return
    }

    const newUser: UserItem = {
      id: Date.now(),
      firstName: form.firstName.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setUsers((prev) => [newUser, ...prev])
    setForm({
      firstName: "",
      email: "",
      password: "",
      role: "USER",
    })
    setErrors({})
    setSuccessMessage("Usuario registrado correctamente")
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto grid max-w-7xl gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border bg-background p-3 shadow-sm">
              <Shield className="size-6" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Panel de administración</h1>
              <p className="text-sm text-muted-foreground">
                Registra usuarios y consulta el listado actual.
              </p>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Usuarios totales</p>
                <p className="mt-2 text-3xl font-semibold">{stats.total}</p>
              </div>
              <Users className="size-6" />
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Administradores</p>
                <p className="mt-2 text-3xl font-semibold">{stats.admins}</p>
              </div>
              <Shield className="size-6" />
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Usuarios estándar</p>
                <p className="mt-2 text-3xl font-semibold">{stats.standardUsers}</p>
              </div>
              <User className="size-6" />
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="size-5" />
                Registrar usuario
              </CardTitle>
              <CardDescription>
                Formulario de alta para nuevos usuarios del sistema.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    placeholder="Sergio"
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                  {errors.firstName ? (
                    <p className="text-sm text-red-500">{errors.firstName}</p>
                  ) : null}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="pl-9"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>
                  {errors.email ? (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  ) : null}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      value={form.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                  </div>
                  {errors.password ? (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  ) : null}
                </div>

                <div className="grid gap-2">
                  <Label>Rol</Label>
                  <Select
                    value={form.role}
                    onValueChange={(value: string) => handleChange("role", value as Role)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">USER</SelectItem>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role ? <p className="text-sm text-red-500">{errors.role}</p> : null}
                </div>

                <Button type="submit" className="mt-2 w-full">
                  Crear usuario
                </Button>

                {successMessage ? (
                  <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                    {successMessage}
                  </div>
                ) : null}
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="gap-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Usuarios registrados</CardTitle>
                  <CardDescription>Listado actual del sistema.</CardDescription>
                </div>

                <div className="relative w-full md:max-w-sm">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, email o rol"
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="overflow-hidden rounded-2xl border">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr className="border-b text-left">
                        <th className="px-4 py-3 font-medium">Nombre</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Rol</th>
                        <th className="px-4 py-3 font-medium">Fecha alta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b last:border-b-0">
                            <td className="px-4 py-3 font-medium">{user.firstName}</td>
                            <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                            <td className="px-4 py-3">
                              <span className="rounded-full border px-2 py-1 text-xs font-medium">
                                {user.role}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">{new Date(user.createdAt).toLocaleDateString("es-ES")}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">
                            No hay usuarios que coincidan con la búsqueda.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
