import { Link } from "react-router-dom"
import { Button, Input } from "../DesignSystem"

export const RegisterModal = () => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl text-center">Glutopía</h3>
      <h2 className="text-2xl font-semibold text-center">Crear cuenta</h2>
      <p className="text-center text-pretty">Para disfrutar Glutopia al máximo requerimos de que inicies sesión. Accedé a la comunidad y aportá a la Comunidad Celíaca.</p>

      <Input placeholder="Correo electrónico" />
      <Input placeholder="Nombre" />
      <Input placeholder="Apellido" />
      <Input placeholder="Contraseña" />

      <Button>
        Crear cuenta
      </Button>

      <p className="text-center">Tengo una cuenta, <Link to="/" className="text-blue-700 font-medium underline">iniciá sesión</Link></p>
    </div>
  )
}