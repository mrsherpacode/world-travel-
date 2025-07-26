import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "./contexts/CitiesContext";
import { useGeolocation } from "../hooks/UseGeolocation";
import Button from "./Button";
//  map component
function Map() {
  // This will get lat and lang from url and we use useSearchParams hook  for that
  const [searchParam, setSearchParam] = useSearchParams();
  // here i'm using get method to get the position lat and lng cuz we directly can not access it.
  const mapLat = searchParam.get("lat");
  const mapLng = searchParam.get("lng");
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  // useCities function is from CityContext file
  const { cities } = useCities();
  // useGeolocation is a custom hook from UseGeolocation page
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  //  mapPosition is for position of the map that usually take the lat and lng
  const [mapPosition, setMapPosition] = useState([40, 0]);
  ///////////////////////////////////////////////////////
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  //////////////////////////////////////
  // this useEffect synch the mapPositon with the geolocationPosition and move the map to the your current location .
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {/* This container is from open-source React components for Leaflet maps (https://react-leaflet.js.org/) 
       
       to use this go to site and look for instructions .
      */}

      {/*This is a custom Button component from Button file and this button only appears if there is not already the geolocationPosition */}
      {!geolocationPosition && (
        <Button type="primary" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your location"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        {/* This is custom component that gets the postion of the map based on city */}
        <ChangeCenter position={mapPosition} />
        {/* when we click on the map it renders  the form and gets its lat and lang from url  */}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

///////////////////////////////////////
// This function changes the position of the map based on it's cities.

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
///////////////////////////////////////
/// This function gets  the position of  lat and lng when we click on the map.
function DetectClick() {
  // Programmatic navigation allows us to go to other pages without us having to click on navigation link.
  const navigate = useNavigate();
  useMapEvents({
    // when click on map it renders form and gets it's lat and lng from url
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
