import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Marker = ({ position, id, address, name, image = '' }) => {
  const navigate = useNavigate()
  const [markerRef, marker] = useAdvancedMarkerRef()
  const [infoWindowShown, setInfoWindowShown] = useState(false)

  const handleMarkerClick = () => setInfoWindowShown(isShown => !isShown)
  const handleClose = () => setInfoWindowShown(false)
  const handleShowReviews = () => navigate(`/restaurante/${id}`)

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onClick={handleMarkerClick}
      />

      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose} className="flex flex-col gap-2 items-start">
          <img className="object-cover w-full h-32 rounded shadow-lg" src={image} />
          <h2 className="font-bold">{name}</h2>
          <p>{ address }</p>
          <button onClick={handleShowReviews} className="text-green-600 font-semibold">Ver reseñas</button>
        </InfoWindow>
      )}
    </>
  )
}