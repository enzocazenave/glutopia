import { useState, createContext, useEffect } from "react"
import { LoginModal, Modal, RegisterModal } from "../components"
import { useModal } from '../hooks'
import toast from "react-hot-toast"
import supabase from "../supabaseClient"

export const AuthConstants = {
  AUTHENTICATED: 'authenticated',
  NOT_AUTHENTICATED: 'not_authenticated',
  CHECKING: 'checking',
}

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const { handleCloseModal: handleCloseLoginModal, isModalOpen: isLoginModalOpen, handleOpenModal: handleOpenLoginModal } = useModal(false)
  const { handleCloseModal: handleCloseRegisterModal, isModalOpen: isRegisterModalOpen, handleOpenModal: handleOpenRegisterModal } = useModal(false)

  const [status, setStatus] = useState(AuthConstants.CHECKING)
  const [user, setUser] = useState({})

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        return await logout(true)
      }

      const currentTime = Math.floor(Date.now() / 1000)

      if (session.expires_at && session.expires_at < currentTime) {
        return await logout(true)
      }

      await login(session.user.id)
    }

    checkSession()
  }, [])

  const login = async (id) => {
    try {
      setStatus(AuthConstants.AUTHENTICATED)
      const { data, error } = await supabase.from('users').select().eq('id', id).single()
      if (error) throw error
      setUser(data)
  
      if (isLoginModalOpen || isRegisterModalOpen) {
        handleCloseRegisterModal()
        handleCloseLoginModal()
        toast((c) => <span>Bienvenido a <b>Glutopía</b> {data.name}!</span>, { duration: 7000, icon: '👋' })
      }
    } catch(error) {
      console.error("Error fetching user data:", error)
      setStatus(AuthConstants.NOT_AUTHENTICATED)
    }
  }

  const logout = async (withValidation = false) => {
    await supabase.auth.signOut()
    setUser({})
    setStatus(AuthConstants.NOT_AUTHENTICATED)
    
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