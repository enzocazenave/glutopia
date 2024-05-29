import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../components/'
import { lazy } from 'react'

const HomePage = lazy(() => import('../pages/HomePage'))
const RestaurantPage = lazy(() => import('../pages/RestaurantPage'))
const UserPage = lazy(() => import('../pages/UserPage'))


export const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurante/:restaurantId" element={<RestaurantPage />} />
        <Route path="/comunidad" element={<HomePage />} />
        <Route path="/mapa" element={<HomePage />} />
        <Route path="/cuenta" element={<UserPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
)