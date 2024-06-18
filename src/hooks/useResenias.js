import { useEffect, useState } from "react"
import supabase from "../supabaseClient"

export const useResenias = (restaurantId) => {
  const [resenias, setResenias] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchResenias()
  }, [restaurantId])

  const fetchResenias = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('reviews').select('*').eq('restaurant_id', restaurantId)

      if (error) {
        return console.log(error)
      }

      setResenias(data.reverse())
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    resenias,
    loading,
    fetchResenias
  }
}