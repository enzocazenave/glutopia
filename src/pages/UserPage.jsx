import { useContext } from 'react'
import { Button } from '../components/DesignSystem'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const UserPage = () => {
  const { logout, user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
    logout()
  }

  return (
    <section className="fade-in flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Tu cuenta</h3>
        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </div>

      <div>
        <h4 className='font-semibold text-sm'>Nombre y apellido</h4>
        <p>{user.name}</p>
      </div>

      <div>
        <h4 className='font-semibold text-sm'>Correo electrónico</h4>
        <p>{user.email}</p>
      </div>
    </section>
  )
}

export default UserPage