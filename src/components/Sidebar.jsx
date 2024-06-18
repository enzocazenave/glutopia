import { NavLink } from 'react-router-dom'
import { AuthConstants, AuthContext } from '../context/AuthContext'
import { Button } from './DesignSystem'
import { useRef, useEffect, useContext } from 'react'

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const { status, handleOpenLoginModal, user } = useContext(AuthContext)

  const sidebar = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebar.current && !sidebar.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleOpenLoginModalFunction = () => {
    if (isOpen) {
      setIsOpen(false)
      handleOpenLoginModal()
      return
    }

    handleOpenLoginModal()
  }

  return (
    <aside ref={sidebar} className={`flex flex-col justify-between max-sm:fixed max-sm:bg-[#f7fcf5] max-sm:p-4 max-sm:pb-8 z-50 left-0 max-sm:h-full max-sm:border-r-2 border-green-500 max-sm:shadow-xl ${isOpen ? '' : 'max-sm:hidden'}`}>
      <div>
        <img className="mb-4 max-w-44" src="/logo.png" />
        <nav>
          <ul className="flex flex-col gap-2">
            <NavLink to="/" className={({ isActive }) => `${isActive ? 'font-semibold bg-green-300 p-2 rounded-md' : ''} hover:font-semibold transition-all`}>
              Inicio
            </NavLink>

            <NavLink to="/mapa" className={({ isActive }) => `${isActive ? 'font-semibold bg-green-300 p-2 rounded-md' : ''} hover:font-semibold transition-all `}>
              Mapa
            </NavLink>

            <NavLink to="/preguntas" className={({ isActive }) => `${isActive ? 'font-semibold bg-green-300 p-2 rounded-md' : ''} hover:font-semibold transition-all `}>
              Preguntas frecuentes
            </NavLink>
            
            {
              status === AuthConstants.AUTHENTICATED
                ? (
                  <>
                    <NavLink to="/comunidad" className={({ isActive }) => `${isActive ? 'font-semibold bg-green-300 p-2 rounded-md' : ''} hover:font-semibold transition-all `}>
                      Comunidad
                    </NavLink>
                    <NavLink to="/sugerir" className={({ isActive }) => `${isActive ? 'font-semibold bg-green-300 p-2 rounded-md' : ''} hover:font-semibold transition-all `}>
                      Sugerir restaurante
                    </NavLink>
                  </>
                )
                : null
            }
          </ul>
        </nav>
      </div>

      {
        status === AuthConstants.AUTHENTICATED
          ? (
            <NavLink to="/cuenta" className={({ isActive }) => `${isActive ? 'bg-green-300' : ''} flex items-center gap-2 hover:bg-green-100 hover:cursor-pointer p-2 rounded-md transition-colors`} >
              <img src="/user.png" className="w-6 h-6 rounded-full object-cover" />
              <span>{user.name}</span>
            </NavLink>
          )
          : <Button className="w-fit" onClick={handleOpenLoginModalFunction}>Iniciar sesión</Button>
      }

    </aside>
  )
}