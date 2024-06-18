import { Button, Input } from "../DesignSystem"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useForm } from "../../hooks"
import supabase from "../../supabaseClient"

const initialForm = {
  email: '',
  password: '',
  name: '',
  surname: ''
}

export const RegisterModal = () => {
  const { email, password, name, surname, onInputChange } = useForm(initialForm)
  const { handleCloseRegisterModal, handleOpenLoginModal, login } = useContext(AuthContext)
  

  const changeToLoginModal = () => {
    handleCloseRegisterModal()
    handleOpenLoginModal()
  }

  const handleSubmit = async () => {
    if (email.length === 0 || password.length === 0 || name.length === 0 || surname.length === 0) {
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({ email, password })

      if (error) {
        toast.error('Credenciales incorrectas')
        return
      }

      await supabase.from('users').insert([
        { id: data.user.id, name: `${name} ${surname}`, email }
      ])

      login(data.user.id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <img className="max-w-44 mx-auto" src="/logo.png" />
      <h2 className="text-2xl font-semibold text-center">Crear cuenta</h2>
      <p className="text-center text-pretty">Para disfrutar Glutopia al máximo requerimos de que inicies sesión. Accedé a la comunidad y aportá a la Comunidad Celíaca.</p>

      <Input name="email" value={email} onChange={onInputChange} placeholder="Correo electrónico" />
      <Input name="name" value={name} onChange={onInputChange} placeholder="Nombre" />
      <Input name="surname" value={surname} onChange={onInputChange} placeholder="Apellido" />
      <Input type="password" name="password" value={password} onChange={onInputChange} placeholder="Contraseña" />

      <Button onClick={handleSubmit}>
        Crear cuenta
      </Button>

      <p className="text-center">Tengo una cuenta, <button onClick={changeToLoginModal} className="text-blue-700 font-medium underline">iniciá sesión</button></p>
    </div>
  )
}