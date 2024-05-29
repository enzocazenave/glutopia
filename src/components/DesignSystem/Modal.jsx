export const Modal = ({ isModalOpen, handleCloseModal, size, children }) => {
  if (!isModalOpen) return null

  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className={`bg-white p-4 rounded-md max-w-${size} w-full shadow-md relative`}>
        <button className="absolute top-3 right-3 cursor-pointer" onClick={handleCloseModal}>
          &times;
        </button>

        <div className="mt-3">
          { children }
        </div>
      </div>
    </div>
  )
}