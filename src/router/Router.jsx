import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '../components/'
import { lazy, useContext } from 'react'
import { AuthConstants, AuthContext } from '../context/AuthContext'
import { Toaster } from 'react-hot-toast'
import { ChatProvider } from '../context/ChatContext'

const HomePage = lazy(() => import('../pages/HomePage'))
const RestaurantPage = lazy(() => import('../pages/RestaurantPage'))
const CommunityPage = lazy(() => import('../pages/CommunityPage'))
const MapPage = lazy(() => import('../pages/MapPage'))
const FrequentQuestionsPage = lazy(() => import ('../pages/FrequentQuestionsPage'))
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
          <Route path="/preguntas" element={<FrequentQuestionsPage />} />

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
              <Route path="/cuenta" element={<UserPage />} />
            </>
          ) : null }
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>

  )
}