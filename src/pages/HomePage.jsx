import { useState } from "react"
import { Loading, RestaurantFilters, RestaurantsCards } from "../components"
import { useForm, useRestaurant } from "../hooks"
import { useEffect } from "react"

const initialForm = {
  name: ''
}

const HomePage = () => {
  const { restaurants, loading } = useRestaurant()
  const { name, onInputChange } = useForm(initialForm)
  const [savedFilter, setSavedFilter] = useState(false)
  const [executeEffect, setExecuteEffect] = useState(false)
  let restaurantsSaved = JSON.parse(window.localStorage.getItem('restaurants-saved') ?? '[]') ?? []

  useEffect(() => {
    restaurantsSaved = JSON.parse(window.localStorage.getItem('restaurants-saved') ?? '[]') ?? []
  }, [savedFilter, executeEffect])

  let filteredResults = restaurants.filter(
    restaurant => {
      return savedFilter 
        ? (restaurant.nombreRestaurante.toLowerCase().startsWith(name.toLowerCase()) && restaurantsSaved.includes(restaurant.idRestaurante))
        : restaurant.nombreRestaurante.toLowerCase().startsWith(name.toLowerCase())
    }
  )
  
  return (
    <section className="fade-in">
      { loading ? <Loading /> : null }
      <RestaurantFilters savedFilter={savedFilter} setSavedFilter={setSavedFilter} value={name} onChange={onInputChange} />
      <RestaurantsCards restaurants={filteredResults} setExecuteEffect={setExecuteEffect} />
    </section>
  )
}

export default HomePage