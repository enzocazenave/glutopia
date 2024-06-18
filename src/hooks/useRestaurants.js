import { useEffect, useState } from "react"
import supabase from "../supabaseClient"

export const useRestaurant = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('restaurants').select()

      if (error) {
        return console.log(error)
      }

      setRestaurants(data)
    } catch(error) {
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