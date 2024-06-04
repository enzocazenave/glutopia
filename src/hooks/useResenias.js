import { useEffect } from "react"
import { useState } from "react"

export const useResenias = () => {
  const [resenias, setResenias] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchResenias()
  }, [])

  const getReseniasPorRestaurant = (id) => {
    return resenias.filter(restaurant => restaurant.restaurante.idRestaurante === id)
  } 

  const fetchResenias = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8081/resenia/getAll')
      const data = await response.json()

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
    getReseniasPorRestaurant,
    fetchResenias
  }
}