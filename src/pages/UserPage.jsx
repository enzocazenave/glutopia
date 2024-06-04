import { useContext } from 'react'
import { Button } from '../components/DesignSystem'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const UserPage = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
    logout()
  }

  return (
    <section>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Tu cuenta</h3>
        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </div>
    </section>
  )
}

export default UserPage