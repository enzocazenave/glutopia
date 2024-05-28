import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, RestaurantPage } from '../pages'
import { Layout } from '../components/'

export const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurante/:restaurantId" element={<RestaurantPage />} />
        <Route path="/comunidad" element={<HomePage />} />
        <Route path="/mapa" element={<HomePage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
)