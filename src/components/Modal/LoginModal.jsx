import { Button, Input } from "../"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useForm } from "../../hooks"
import toast from "react-hot-toast"
import supabase from "../../supabaseClient"

const initialForm = {
  email: '',
  password: ''
}

export const LoginModal = () => {
  const { handleCloseLoginModal, handleOpenRegisterModal, login } = useContext(AuthContext)
  const { email, password, onInputChange } = useForm(initialForm)
  
  const changeToRegisterModal = () => {
    handleCloseLoginModal()
    handleOpenRegisterModal()
  }

  const handleSubmit = async() => {
    if (email.length === 0 || password.length === 0) {
      return
    }
      
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ password, email })

      if (error) {
        toast.error('Credenciales incorrectas')
        return
      }

      login(data.user.id)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <img className="max-w-44 mx-auto" src="/logo.png" />
      <h2 className="text-2xl font-semibold text-center">Iniciar Sesión</h2>
      <p className="text-center text-pretty">Para disfrutar Glutopia al máximo requerimos de que inicies sesión. Accedé a la comunidad y aportá a la Comunidad Celíaca.</p>

      <Input placeholder="Correo electrónico" onChange={onInputChange} value={email} name="email" />
      <Input type="password" placeholder="Contraseña" onChange={onInputChange} value={password} name="password" />

      <Button onClick={handleSubmit}>
        Iniciar sesión
      </Button>

      <p className="text-center">No tengo una cuenta, <button onClick={changeToRegisterModal} className="text-blue-700 font-medium underline">creá una</button></p>
    </div>
  )
}