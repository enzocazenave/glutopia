import { useEffect, useState } from "react"
import supabase from "../supabaseClient"

export const useRestaurant = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)

/*
 {
        "id": 1,
        "name": "La Panera Rosa",
        "address": "Pierina Dealessi 1360, Puerto Madero, CABA",
        "photo_url": "https://www.lapanerarosa.com.ar/images/galeria/1/img0016.jpg",
        "reviews_count": 5,
        "reviews_average": 4.4000000000000000
    }
*/

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.rpc('get_restaurants_full_data')

      if (error) {
        return console.log(error)
      }

      setRestaurants(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    restaurants,
    loading
  }
}