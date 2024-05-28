import { Bookmark, Star } from "../Icons"

export const RestaurantCard = ({ restaurant }) => {
  return (
    <div 
      style={{ 
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${restaurant.srcImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
      className="p-3 rounded-md flex flex-col gap-16 hover:opacity-80 hover:cursor-pointer"
    >
      <div className="flex justify-end">
        <button className="bg-transparent">
          <Bookmark width={20} color="#fff" />
        </button>
      </div>

      <div>
        <h3 className="text-white font-semibold">{ restaurant.name }</h3>
        
        <div className="flex gap-2">
          <span className="text-white text-opacity-60 font-medium">{ restaurant.commentaries} comentarios - </span>
          <Star width={16} color="#fff" />
          <span className="text-white text-opacity-60 font-medium">{ restaurant.stars }</span>
        </div>
      </div>
    </div>
  )
}