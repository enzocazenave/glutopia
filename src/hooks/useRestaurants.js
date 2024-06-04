import { useEffect } from "react"
import { useState } from "react"

export const useRestaurant = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8081/restaurante/getAll')
      const data = await response.json()

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