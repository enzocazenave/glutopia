import { useEffect, useState } from "react"
import supabase from "../supabaseClient"
import { useNavigate } from "react-router-dom"

export const useRestaurant = (restaurantId) => {
  const [resenias, setResenias] = useState([])
  const [restaurant, setRestaurant] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchResenias()
    fetchRestaurant()
  }, [restaurantId])

  const fetchResenias = async () => {
    try {
      setLoading(true)
      const { data, error: errorWhenFetchingReviews } = await supabase.from('reviews').select('*, users(name)').eq('restaurant_id', restaurantId)

      if (errorWhenFetchingReviews) {
        return console.log(errorWhenFetchingReviews)
      }

      setResenias(data.reverse())
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRestaurant = async () => {
    try {
      setLoading(true)
      const { data: restaurant, error: errorWhenFetchingRestaurant } = await supabase
        .rpc('get_restaurants_full_data')
        .select()
        .eq('id', restaurantId)
        .single()

      if (errorWhenFetchingRestaurant) {
        return navigate('/')
      }

      setRestaurant(restaurant)
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    restaurant,
    resenias,
    loading,
    fetchResenias
  }
}