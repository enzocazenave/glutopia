import { useState } from "react"

export const useModal = (defaultState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultState)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return {
    handleOpenModal,
    handleCloseModal,
    isModalOpen
  }
}