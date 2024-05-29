import { useEffect } from "react"

export const Modal = ({ isModalOpen, handleCloseModal, children }) => {
  useEffect(() => {
    if (isModalOpen) {
      const handleEscapeKey = (e) => {
        if (e.key === 'Escape') {
          handleCloseModal()
        }
      }

      document.addEventListener('keydown', handleEscapeKey)

      return () => {
        document.removeEventListener('keydown', handleEscapeKey)
      }
    }
  }, [isModalOpen])

  if (!isModalOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  return (
    <div 
      className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-40 flex items-center justify-center z-50" 
      onClick={handleOverlayClick}
    >
      <div className={`bg-white p-4 rounded-md max-w-md w-full shadow-md relative`}>
        <button className="absolute top-3 right-3 cursor-pointer" onClick={handleCloseModal}>
          &times;
        </button>

        <div className="">
          { children }
        </div>
      </div>
    </div>
  )
}