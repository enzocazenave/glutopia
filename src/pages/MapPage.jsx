import { Map, APIProvider, InfoWindow } from "@vis.gl/react-google-maps"
import supabase from "../supabaseClient"
import { useEffect, useState } from "react"
import { Marker } from "../components/MapPage"

const MAP_API_KEY = "AIzaSyAF9CSzaZoKJ3r_9lYnkFD5yyb3hBK7b-U"
const MAP_DEFAULTS_SETTINGS = {
  mapId: "ddcc8c27c46533b8",
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  defaultZoom: 14,
  defaultCenter: { lat: -34.6126481, lng: -58.3618743 },
  styles: []
}

const MapPage = () => {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    supabase.from('restaurants').select().then(({ data }) => setMarkers(data))
  }, [])

  return (
    <section className="fade-in flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Mapa</h2>
      <p>Si haces click en los marcadores rojos, podrás ver información sobre cada restaurant.</p>
      <div className="rounded-xl h-full overflow-hidden drop-shadow-xl">
        <APIProvider apiKey={MAP_API_KEY}>
          <Map {...MAP_DEFAULTS_SETTINGS} >
            {markers.map(marker => (
              <Marker
                key={marker.id}
                id={marker.id}
                position={{ lat: marker.latitude, lng: marker.length }}
                name={marker.name}
                address={marker.address}
                image={marker.photo_url}
              />
            ))}
          </Map>
        </APIProvider>
      </div>
    </section>
  )
}

export default MapPage