import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../components/'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthConstants, AuthContext, AuthProvider } from '../context/AuthContext'
import { Toaster } from 'react-hot-toast'
import { useContext } from 'react'
import { ChatProvider } from '../context/ChatContext'

const HomePage = lazy(() => import('../pages/HomePage'))
const RestaurantPage = lazy(() => import('../pages/RestaurantPage'))
const CommunityPage = lazy(() => import('../pages/CommunityPage'))
const MapPage = lazy(() => import('../pages/MapPage'))
const SuggestRestaurantPage = lazy(() => import('../pages/SuggestRestaurantPage'))
const UserPage = lazy(() => import('../pages/UserPage'))

export const Router = () => {
  const { status } = useContext(AuthContext)
  
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />

      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurante/:restaurantId" element={<RestaurantPage />} />
          <Route path="/mapa" element={<MapPage />} />
          { status === AuthConstants.AUTHENTICATED ? (
            <>
              <Route 
                path="/comunidad" 
                element={
                  <ChatProvider>
                    <CommunityPage />
                  </ChatProvider>
                } 
              />
              <Route path="/sugerir" element={<SuggestRestaurantPage />} />
              <Route path="/cuenta" element={<UserPage />} />
            </>
          ) : null }
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>

  )
}