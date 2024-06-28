import { Suspense, useContext, useState } from "react"
import { Sidebar, AdsSpace, Button } from "./"
import { AuthConstants, AuthContext } from "../context/AuthContext"
import { useRef } from "react"

const SidebarMobile = ({ isOpen, setIsOpen, menuRef }) => {
  const { status, handleOpenLoginModal } = useContext(AuthContext)

  const handleClick = (e) => {
    if (!isOpen) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  return (
    <header className="sm:hidden flex justify-between items-center flex-[0]">
      <img className="max-w-24" src="/logo.png" />

      <div className="flex gap-2 items-center justify-center">
        {(status === AuthConstants.NOT_AUTHENTICATED)
          ? <Button className="w-fit text-xs p-1" onClick={handleOpenLoginModal}>Iniciar sesión</Button>
          : null
        }
        <button ref={menuRef} onClick={handleClick}>
          <svg
            className="w-8 h-8 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
    </header>
  )
}

export const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef(null)
  const menuRef = useRef(null)

  return (
    <main className="grid grid-cols-[16rem_auto_20rem] max-w-[1280px] mx-auto py-4 gap-4 h-screen px-4 max-[1100px]:grid-cols-[16rem_auto] max-sm:grid-cols-1 max-sm:grid-rows-[auto_1fr]">
      <SidebarMobile isOpen={isOpen} setIsOpen={setIsOpen} sidebarRef={sidebarRef} menuRef={menuRef} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} sidebarRef={sidebarRef} menuRef={menuRef} />

      <Suspense fallback={<h2>Cargando...</h2>}>
        {children}
      </Suspense>

      <AdsSpace />
    </main>
  )
}