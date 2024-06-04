import { RestaurantCard } from "./"

export const RestaurantsCards = ({ restaurants, setExecuteEffect }) => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      {restaurants.map(restaurant => (
        <RestaurantCard 
          key={restaurant.idRestaurante} 
          restaurant={restaurant} 
          setExecuteEffect={setExecuteEffect}
        />
      ))}
    </div>
  )
}