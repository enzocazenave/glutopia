import { RestaurantCard } from "./"

const restaurants = [
  { 
    id: 1, 
    name: "Gluresto", 
    comments: 15, 
    stars: 4.5, 
    saved: false, 
    srcImage: 'https://media.admagazine.com/photos/651aeed9da5f4d9a3844a94b/4:3/w_2660,h_1995,c_limit/Porten%CC%83o-restaurante-1.jpg',
    address: 'Av. Libertador 5453'
  },
  { 
    id: 2, 
    name: "La Farolita", 
    comments: 12, stars: 3, 
    saved: true, 
    srcImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/640px-Restaurant_N%C3%A4sinneula.jpg',
    address: 'Av. Libertador 5453'
  },
  { 
    id: 3, 
    name: "La Parolaccia", 
    comments: 17, 
    stars: 2.5, 
    saved: false, 
    srcImage: 'https://media.admagazine.com/photos/651aeed9da5f4d9a3844a94b/4:3/w_2660,h_1995,c_limit/Porten%CC%83o-restaurante-1.jpg',
    address: 'Av. Libertador 5453'
  }
]

export const RestaurantsCards = () => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      {restaurants.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
    </div>
  )
}