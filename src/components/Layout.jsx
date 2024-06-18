import { Suspense } from "react"
import { Sidebar, AdsSpace } from "./"
import { useState } from "react"

const SidebarMobile = ({ isOpen, setIsOpen }) => {

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true)
    }
  }

  return (
    <header className="sm:hidden flex justify-between items-center flex-[0]">
      <img className="max-w-24" src="/logo.png" />
      <button className={`p-1 bg-green-500 rounded ${isOpen ? 'invisible' : ''}`} onClick={handleClick}>
        <svg
          className="w-6 h-6 text-black"
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
    </header>
  )
}

export const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="grid grid-cols-[16rem_auto_20rem] max-w-[1280px] mx-auto py-4 gap-4 h-screen px-4 max-[1100px]:grid-cols-[16rem_auto] max-sm:grid-cols-1 max-sm:grid-rows-[auto_1fr]">
      <SidebarMobile isOpen={isOpen} setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <Suspense fallback={<h2>Cargando...</h2>}>
        {children}
      </Suspense>

      <AdsSpace />
    </main>
  )
}