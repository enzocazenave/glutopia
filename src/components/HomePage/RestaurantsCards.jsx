import { useRestaurant } from "../../hooks/useRestaurants"
import { Loading } from "../"
import { RestaurantCard } from "./"

export const RestaurantsCards = () => {

  const { restaurants, loading } = useRestaurant()

  return (
    <div className="mt-4 flex flex-col gap-2">
      { loading ? <Loading /> : null }
      {restaurants.map(restaurant => <RestaurantCard key={restaurant.idRestaurante} restaurant={restaurant} />)}
    </div>
  )
}