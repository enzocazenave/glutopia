import { useState, useEffect } from "react"
import { Loading, RestaurantFilters, RestaurantsCards } from "../components"
import { useForm, useRestaurant } from "../hooks"

const initialForm = {
  name: '',
  valoration: 'better'
}

const HomePage = () => {
  const { restaurants, loading } = useRestaurant()
  const { name, valoration, onInputChange } = useForm(initialForm)
  const [savedFilter, setSavedFilter] = useState(false)
  const [executeEffect, setExecuteEffect] = useState(false)
  let restaurantsSaved = JSON.parse(window.localStorage.getItem('restaurants-saved') ?? '[]') ?? []

  useEffect(() => {
    restaurantsSaved = JSON.parse(window.localStorage.getItem('restaurants-saved') ?? '[]') ?? []
  }, [savedFilter, executeEffect])

  let filteredResults = restaurants.filter(
    restaurant => {
      return savedFilter
        ? (restaurant.name.toLowerCase().startsWith(name.toLowerCase()) && restaurantsSaved.includes(restaurant.id))
        : restaurant.name.toLowerCase().startsWith(name.toLowerCase())
    }
  )

  filteredResults.sort((a, b) => {
    if (valoration === 'better') {
      return b.reviews_average - a.reviews_average;
    } else {
      return a.reviews_average - b.reviews_average;
    }
  })

  return (
    <section className="fade-in row-span-1 py-4 overflow-auto overflow-x-hidden">
      { loading ? <Loading /> : null }
      <RestaurantFilters 
        savedFilter={savedFilter} 
        setSavedFilter={setSavedFilter} 
        valueName={name}
        valueValoration={valoration}
        onChange={onInputChange} 
      />
      <RestaurantsCards restaurants={filteredResults} setExecuteEffect={setExecuteEffect} />
    </section>
  )
}

export default HomePage