import { Bookmark, Comments, MapPin, Modal, Star, MessageCircle, CommentModal, FilledBookmark, Menu, PdfViewer } from '../components'
import { useModal } from '../hooks'
import { useState, useContext } from 'react'
import { AuthConstants, AuthContext } from '../context/AuthContext'
import { useRestaurant } from '../hooks/useRestaurant'
import { useParams } from 'react-router-dom'
import supabase from '../supabaseClient'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const RestaurantPage = () => {
  const { handleOpenLoginModal, status } = useContext(AuthContext)
  const { handleCloseModal: handleCloseCommentModal, isModalOpen: isCommentModalOpen, handleOpenModal: handleOpenCommentModal } = useModal(false)

  const { restaurantId } = useParams()
  const restaurantIdParsed = parseInt(restaurantId)

  const { fetchResenias, resenias, restaurant } = useRestaurant(restaurantIdParsed)
  const [menuUrl, setMenuUrl] = useState('')
  const [displayPdf, setDisplayPdf] = useState(false)

  const restaurantsSaved = JSON.parse(window.localStorage.getItem('restaurants-saved') ?? '[]') ?? []
  const isRestaurantSaved = restaurantsSaved.includes(restaurantIdParsed)
  const [_, setReRender] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadMenu = async () => {
      const path = `pdf/restaurant-${restaurantIdParsed}.pdf`
      const { data } = supabase
        .storage
        .from('restaurants_menus')
        .getPublicUrl(path)

      const url = data.publicUrl

      try {
        const res = await fetch(url, { method: 'HEAD', cache: 'no-store' })
        if (!cancelled) {
          if (res.ok) {
            setMenuUrl(url)
          } else {
            setMenuUrl(null)
          }
        }
      } catch (err) {
        if (!cancelled) setMenuUrl(null)
      }
    }

    loadMenu()
    return () => { cancelled = true }
  }, [restaurantIdParsed])


  const handleSaveRestaurant = () => {
    const currentRestaurantsSaved = JSON.parse(window.localStorage.getItem('restaurants-saved') ?? '[]') ?? []
    let updatedRestaurantsSaved

    if (isRestaurantSaved) {
      updatedRestaurantsSaved = currentRestaurantsSaved.filter(id => id !== restaurantIdParsed)
    } else {
      updatedRestaurantsSaved = [...currentRestaurantsSaved, restaurantIdParsed]
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

  const handleOpenRestaurantMenu = () => {
    if (menuUrl) {
      setDisplayPdf(true)
    } else {
      toast.error('El restaurant no tiene menú adjunto.')
    }
  }

  return (
    <section className="fade-in overflow-hidden flex flex-col gap-1 py-4">
      <PdfViewer pdfUrl={menuUrl} displayPdf={displayPdf} setDisplayPdf={setDisplayPdf} />
      <Modal isModalOpen={isCommentModalOpen} handleCloseModal={handleCloseCommentModal}>
        <CommentModal resetComments={handleResetComments} handleCloseModal={handleCloseCommentModal} currentRestaurant={restaurant} />
      </Modal>

      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{restaurant?.name}</h3>

        <div className="flex gap-3">
          <button onClick={handleOpenCommentModalIfLogin} className="outline-none" title="Comentar">
            <MessageCircle width={20} />
          </button>
          
          <button onClick={handleOpenRestaurantMenu} className="outline-none" title="Ver menú">
            <Menu width={20} />
          </button>
           
          <button onClick={handleSaveRestaurant} className="outline-none" title="Guardar">
            {isRestaurantSaved ? <FilledBookmark width={20} /> : <Bookmark width={20} />}
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <span className="text-black text-opacity-50 font-medium">{restaurant?.reviews_count} comentarios - </span>
        <Star width={16} color="#bbb" />
        <span className="text-black text-opacity-50 font-medium">{restaurant?.reviews_average?.toFixed(2)}</span>
      </div>

      <span className="text-black text-opacity-50 font-medium">$ {restaurant?.approximate_expense_average?.toFixed(2)} promedio / persona</span>

      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), center / cover no-repeat url(${restaurant.photo_url})`,
        }}
        className="p-3 mt-4 rounded-md shadow-lg"
      >
        <div className="flex gap-2 items-center pt-28">
          <MapPin width={16} color="#fff" />
          <h3 className="text-white font-semibold text-pretty text-sm">{restaurant?.address}</h3>
        </div>
      </div>

      <h3 className="font-medium mt-4">Comentarios de los usuarios</h3>
      <Comments comments={resenias} />
    </section>
  )
}

export default RestaurantPage