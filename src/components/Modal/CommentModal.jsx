import { useParams } from "react-router-dom"
import { Button, Textarea } from "../"
import { Send, Star } from "../Icons/"
import { useForm } from "../../hooks"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import toast from "react-hot-toast"
import supabase from "../../supabaseClient"

const initialForm = {
  message: ''
}

export const CommentModal = ({ currentRestaurant, handleCloseModal, resetComments }) => {
  const { restaurantId } = useParams()
  const { user } = useContext(AuthContext)
  const { message, onInputChange } = useForm(initialForm)
  const [rating, setRating] = useState(0)

  const handleComment = async() => {
    if (message.length === 0 || rating === 0) {
      return toast.error('Completa todos los campos para continuar')
    }

    try {
      const { error } = await supabase.from('reviews').insert([
        { user_id: user.id, restaurant_id: restaurantId, stars: rating, comment: message }
      ])

      if (error) {
        return console.log(error)
      }

      resetComments()
      toast.success('Tu comentario fue subido con éxito', { duration: 7000 })
      handleCloseModal()
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-semibold">{ currentRestaurant.name }</h2>
      <p>Dejá un comentario para que otros miembros del sitio tengan más información a la hora de dedicidir donde ir a comer.</p>
      <Textarea value={message} name="message" onChange={onInputChange} className="h-32 resize-none mt-4" placeholder="Escribe tu comentario" />
      
      <div className="flex gap-2 mt-4">
        <Star onClick={() => setRating(1)} width={20} className={`${rating >= 1 ? 'fill-black' : ''} hover:fill-black cursor-pointer`} />
        <Star onClick={() => setRating(2)} width={20} className={`${rating >= 2 ? 'fill-black' : ''} hover:fill-black cursor-pointer`} />
        <Star onClick={() => setRating(3)} width={20} className={`${rating >= 3 ? 'fill-black' : ''} hover:fill-black cursor-pointer`} />
        <Star onClick={() => setRating(4)} width={20} className={`${rating >= 4 ? 'fill-black' : ''} hover:fill-black cursor-pointer`} />
        <Star onClick={() => setRating(5)} width={20} className={`${rating >= 5 ? 'fill-black' : ''} hover:fill-black cursor-pointer`} />
      </div>

      <Button className="w-fit mt-4" onClick={handleComment} icon={ <Send width={16} /> }>
        Comentar
      </Button>
    </div>
  )
}