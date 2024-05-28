import { useParams } from 'react-router-dom'

export const RestaurantPage = () => {
  const { restaurantId } = useParams()
  return (
    <div>{restaurantId}</div>
  )
}