import { useParams, useLocation } from 'react-router-dom'
import { Bookmark, Comments, MapPin, Modal, Star, MessageCircle, CommentModal, FilledBookmark } from '../components'
import { useModal } from '../hooks'
import { useState } from 'react'

const RestaurantPage = () => {
  const { handleCloseModal: handleCloseCommentModal, isModalOpen: isCommentModalOpen, handleOpenModal: handleOpenCommentModal } = useModal(false)
  const { restaurantId } = useParams()
  const { state: currentRestaurant } = useLocation()
  const [saved, setSaved] = useState(currentRestaurant.saved)

  const handleSaveRestaurant = () => {
    setSaved((prevState) => !prevState)
  }

  return (
    <section>
      <Modal isModalOpen={isCommentModalOpen} handleCloseModal={handleCloseCommentModal}>
        <CommentModal currentRestaurant={currentRestaurant} />
      </Modal>

      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{currentRestaurant.name}</h3>

        <div className="flex gap-3">
          <button onClick={handleOpenCommentModal} className="outline-none" title="Comentar">
            <MessageCircle width={20} />
          </button>
          <button onClick={handleSaveRestaurant} className="outline-none" title="Guardar">
            { saved ? <FilledBookmark width={20} /> : <Bookmark width={20} /> }
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <span className="text-black text-opacity-50 font-medium">{currentRestaurant.comments} comentarios - </span>
        <Star width={16} color="#bbb" />
        <span className="text-black text-opacity-50 font-medium">{currentRestaurant.stars}</span>
      </div>

      <div 
        style={{ 
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${currentRestaurant.srcImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
        className="p-3 mt-4 rounded-md shadow-lg"
      >
        <div className="flex gap-2 items-end">
          <MapPin width={20} color="#fff" />
          <h3 className="text-white font-semibold pt-28">{ currentRestaurant.address }</h3>
        </div>
      </div>

      <h3 className="font-medium mt-4">Comentarios de los usuarios</h3>
      <Comments />
    </section>
  )
}

export default RestaurantPage