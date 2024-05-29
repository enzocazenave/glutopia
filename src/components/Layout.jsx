import { Suspense } from "react"
import { useModal } from "../hooks"
import { Sidebar, AdsSpace, Modal, LoginModal, RegisterModal } from "./"

export const Layout = ({ children }) => {
  const { handleCloseModal: handleCloseLoginModal, isModalOpen: isLoginModalOpen } = useModal(false)
  const { handleCloseModal: handleCloseRegisterModal, isModalOpen: isRegisterModalOpen } = useModal(false)

  return (
    <main className="grid grid-cols-[16rem_auto_20rem] max-w-[1280px] mx-auto py-4 gap-4 h-screen px-4">
      <Modal isModalOpen={isLoginModalOpen} handleCloseModal={handleCloseLoginModal}>
        <LoginModal />
      </Modal>
      <Modal isModalOpen={isRegisterModalOpen} handleCloseModal={handleCloseRegisterModal}>
        <RegisterModal />
      </Modal>
      
      <Sidebar />
      
      <Suspense fallback={<h2>Cargando...</h2>}>
        { children }
      </Suspense>

      <AdsSpace />
    </main>
  )
}