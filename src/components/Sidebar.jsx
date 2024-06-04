import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthConstants, AuthContext } from '../context/AuthContext'
import { Button } from './DesignSystem'

export const Sidebar = () => {
  const { status, handleOpenLoginModal, user } = useContext(AuthContext)

  return (
    <aside className="flex flex-col justify-between">
      <div>
        <img className="mb-4 max-w-44" src="/logo.png" />
        <nav>
          <ul className="flex flex-col gap-2">
            <NavLink to="/" className={({ isActive }) => `${isActive ? 'font-semibold' : ''} hover:font-semibold transition-all`}>
              Inicio
            </NavLink>
            {
              status === AuthConstants.AUTHENTICATED
                ? (
                  <NavLink to="/comunidad" className={({ isActive }) => `${isActive ? 'font-semibold' : ''} hover:font-semibold transition-all`}>
                    Comunidad
                  </NavLink>
                )
                : null
            }

            <NavLink to="/mapa" className={({ isActive }) => `${isActive ? 'font-semibold' : ''} hover:font-semibold transition-all`}>
              Mapa
            </NavLink>
          </ul>
        </nav>
      </div>

      {
        status === AuthConstants.AUTHENTICATED
          ? (
            <NavLink to="/cuenta" className={({ isActive }) => `${isActive ? 'bg-slate-100' : ''} flex items-center gap-2 hover:bg-green-100 hover:cursor-pointer p-2 rounded-md transition-colors`} >
              <img src="/user.png" className="w-6 h-6 rounded-full object-cover" />
              <span>{ user.nombre }</span>
            </NavLink>
          )
          : <Button className="w-fit" onClick={handleOpenLoginModal}>Iniciar sesión</Button>
      }

    </aside>
  )
}