import { Link } from "react-router-dom"
import { Input } from "../DesignSystem"

export const RegisterModal = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl text-center">Glutopía</h1>
      <h1 className="text-2xl font-semibold text-center">Crear cuenta</h1>
      <p className="text-center text-pretty">Para disfrutar Glutopia al máximo requerimos de que inicies sesión. Accedé a la comunidad y aportá a la Comunidad Celíaca.</p>

      <Input placeholder="Correo electrónico" />
      <Input placeholder="Nombre" />
      <Input placeholder="Apellido" />
      <Input placeholder="Contraseña" />

      <button className="bg-black text-white rounded-md p-2 hover:bg-opacity-85 transition-colors">
        Crear cuenta
      </button>

      <p className="text-center">Tengo una cuenta, <Link to="/" className="text-blue-700 font-medium underline">iniciá sesión</Link></p>
    </div>
  )
}