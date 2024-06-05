import { useLocation } from 'react-router-dom'
import { Bookmark, Comments, MapPin, Modal, Star, MessageCircle, CommentModal, FilledBookmark } from '../components'
import { useModal } from '../hooks'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthConstants, AuthContext } from '../context/AuthContext'
import { useResenias } from '../hooks/useResenias'

const RestaurantPage = () => {
  const { handleOpenLoginModal, status } = useContext(AuthContext)
  const { handleCloseModal: handleCloseCommentModal, isModalOpen: isCommentModalOpen, handleOpenModal: handleOpenCommentModal } = useModal(false)
  const { state: currentRestaurant } = useLocation()
  const { getReseniasPorRestaurant, fetchResenias } = useResenias()
  const restaurantsSaved = JSON.parse(window.localStorage.getItem('restaurants-saved') ?? '[]') ?? []
  const isRestaurantSaved = restaurantsSaved.includes(currentRestaurant.idRestaurante)
  const [_, setReRender] = useState(false)

  const handleSaveRestaurant = () => {
    const currentRestaurantsSaved = JSON.parse(window.localStorage.getItem('restaurants-saved') ?? '[]') ?? []
    let updatedRestaurantsSaved

    if (isRestaurantSaved) {
      updatedRestaurantsSaved = currentRestaurantsSaved.filter(id => id !== currentRestaurant.idRestaurante)
    } else {
      updatedRestaurantsSaved = [...currentRestaurantsSaved, currentRestaurant.idRestaurante]
    }
    
    window.localStorage.setItem('restaurants-saved', JSON.stringify(updatedRestaurantsSaved))
    setReRender(prev => !prev)
  }

  const handleOpenCommentModalIfLogin = () => {
    if (status !== AuthConstants.AUTHENTICATED) {
      return handleOpenLoginModal()
    }

    handleOpenCommentModal()
  } 

  const handleResetComments = () => {
    fetchResenias()
  }

  return (
    <section className="fade-in overflow-hidden flex flex-col gap-1">
      <Modal isModalOpen={isCommentModalOpen} handleCloseModal={handleCloseCommentModal}>
        <CommentModal resetComments={handleResetComments} handleCloseModal={handleCloseCommentModal} currentRestaurant={currentRestaurant} />
      </Modal>

      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{currentRestaurant.nombreRestaurante}</h3>

        <div className="flex gap-3">
          <button onClick={handleOpenCommentModalIfLogin} className="outline-none" title="Comentar">
            <MessageCircle width={20} />
          </button>
          <button onClick={handleSaveRestaurant} className="outline-none" title="Guardar">
            { isRestaurantSaved ? <FilledBookmark width={20} /> : <Bookmark width={20} /> }
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <span className="text-black text-opacity-50 font-medium">{currentRestaurant.reseniasTotales} comentarios - </span>
        <Star width={16} color="#bbb" />
        <span className="text-black text-opacity-50 font-medium">{currentRestaurant.puntuacionPromedio}</span>
      </div>

      <div 
        style={{ 
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${currentRestaurant.foto})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
        className="p-3 mt-4 rounded-md shadow-lg"
      >
        <div className="flex gap-2 items-center pt-28">
          <MapPin width={16} color="#fff" />
          <h3 className="text-white font-semibold text-pretty text-sm">{ currentRestaurant.direccion }, { currentRestaurant.ciudad }, { currentRestaurant.provincia }</h3>
        </div>
      </div>

      <h3 className="font-medium mt-4">Comentarios de los usuarios</h3>
      <Comments comments={getReseniasPorRestaurant(currentRestaurant.idRestaurante)} />
    </section>
  )
}

export default RestaurantPage