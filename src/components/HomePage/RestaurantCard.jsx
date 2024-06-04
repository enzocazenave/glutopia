import { useNavigate } from "react-router-dom"
import { Bookmark, FilledBookmark, Star } from "../Icons"
import { useState } from "react"

export const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  const handleNavigateRestaurantPage = () => {
    navigate(`/restaurante/${restaurant.idRestaurante}`, { state: restaurant })
  }

  const handleSaveRestaurant = (e) => {
    e.stopPropagation()
    setSaved((prevState) => !prevState)
  }

  return (
    <div 
      style={{ 
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${restaurant.foto})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
      className="p-3 rounded-md flex flex-col gap-16 hover:opacity-90 hover:cursor-pointer hover:scale-[1.01] transition-all shadow-lg"
      onClick={handleNavigateRestaurantPage}
    >
      <div className="flex justify-end">
        <button className="bg-transparent" onClick={handleSaveRestaurant} title="Guardar">
          {saved ? <FilledBookmark width={20} color="#fff" /> : <Bookmark width={20} color="#fff" />}
        </button>
      </div>

      <div>
        <h3 className="text-white font-semibold">{ restaurant.nombreRestaurante }</h3>
        
        <div className="flex gap-2">
          <span className="text-white text-opacity-60 font-medium">{ restaurant.reseniasTotales} comentarios - </span>
          <Star width={16} color="#bbb" />
          <span className="text-white text-opacity-60 font-medium">{ restaurant.puntuacionPromedio }</span>
        </div>
      </div>
    </div>
  )
}