import { Link } from "react-router-dom"
import { Button, Input } from "../"

export const LoginModal = () => {
  return (
    <div className="flex flex-col gap-2">
      <img className="max-w-44 mx-auto" src="/logo.png" />
      <h2 className="text-2xl font-semibold text-center">Iniciar Sesión</h2>
      <p className="text-center text-pretty">Para disfrutar Glutopia al máximo requerimos de que inicies sesión. Accedé a la comunidad y aportá a la Comunidad Celíaca.</p>

      <Input placeholder="Correo electrónico" />
      <Input placeholder="Contraseña" />

      <Button>
        Iniciar sesión
      </Button>

      <p className="text-center">No tengo una cuenta, <Link to="/" className="text-blue-700 font-medium underline">creá una</Link></p>
    </div>
  )
}