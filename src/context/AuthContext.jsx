import { useState, createContext, useEffect } from "react"
import { LoginModal, Modal, RegisterModal } from "../components"
import { useModal } from '../hooks'
import toast from "react-hot-toast"

export const AuthConstants = {
  AUTHENTICATED: 'authenticated',
  NOT_AUTHENTICATED: 'not_authenticated',
  CHECKING: 'checking',
  TOKEN_LOCAL_STORAGE_KEY: 'token',
  USER_LOCAL_STORAGE_KEY: 'userId'
}

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const { handleCloseModal: handleCloseLoginModal, isModalOpen: isLoginModalOpen, handleOpenModal: handleOpenLoginModal } = useModal(false)
  const { handleCloseModal: handleCloseRegisterModal, isModalOpen: isRegisterModalOpen, handleOpenModal: handleOpenRegisterModal } = useModal(false)

  const [status, setStatus] = useState(AuthConstants.NOT_AUTHENTICATED)
  const [user, setUser] = useState({})

  useEffect(() => {
    validateToken()
  }, [])

  const login = (user, validation = false) => {
    setStatus(AuthConstants.AUTHENTICATED)
    setUser(user)

    if (!validation) {
      window.localStorage.setItem(AuthConstants.TOKEN_LOCAL_STORAGE_KEY, user.token)
      window.localStorage.setItem(AuthConstants.USER_LOCAL_STORAGE_KEY, user.userId)
    }

    if (isLoginModalOpen || isRegisterModalOpen) {
      handleCloseRegisterModal()
      handleCloseLoginModal()
      toast((c) => <span>Bienvenido a <b>Glutopía</b> {user.nombre}!</span>, { duration: 7000, icon: '👋' })
    }
  }
  
  const validateToken = async() => {
    const userId = window.localStorage.getItem(AuthConstants.USER_LOCAL_STORAGE_KEY)

    if (
      !window.localStorage.getItem(AuthConstants.TOKEN_LOCAL_STORAGE_KEY) || 
      !userId
    ) {
      return logout(true)
    }
    
    try {
      const responseUser = await fetch(`http://localhost:8081/usuarios/get/${userId}`)
      const data = await responseUser.json()

      login(data, true)
    } catch(error) {
      console.log(error)
    }
  }

  const logout = (withValidation = false) => {
    setStatus(AuthConstants.NOT_AUTHENTICATED)
    window.localStorage.removeItem(AuthConstants.TOKEN_LOCAL_STORAGE_KEY)
    window.localStorage.removeItem(AuthConstants.USER_LOCAL_STORAGE_KEY)
    
    if (!withValidation) {
      toast.success('Has cerrado sesión', { duration: 7000 })
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        status, 
        user, 
        login, 
        logout, 
        handleOpenLoginModal, 
        handleOpenRegisterModal,
        handleCloseLoginModal,
        handleCloseRegisterModal,
        validateToken
      }}
    >
      <Modal isModalOpen={isLoginModalOpen} handleCloseModal={handleCloseLoginModal}>
        <LoginModal />
      </Modal>
      <Modal isModalOpen={isRegisterModalOpen} handleCloseModal={handleCloseRegisterModal}>
        <RegisterModal />
      </Modal>
      {children}
    </AuthContext.Provider>
  )
}