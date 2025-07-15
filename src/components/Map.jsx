import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
//  map component
function Map() {
  // Programmatic navigation allows us to go to other pages without us having to click on navigation link.
  // const naviate = useNavigate();
  // This will get lat and lang from url and we use useSearchParams hook  for that
  // const [searchParam, setSearchParam] = useSearchParams();
  // here i'm using get method to get the position lat and lng cuz we directly can not access it.
  // const lat = searchParam.get("lat");
  // const lng = searchParam.get("lng");
  ////////////////////////////////////////////////////////////////////////////////////////////////
  //  mapPosition is for position of the map that usually take the lat and lng
  const [mapPostion, setMapPosition] = useState([40, 0]);
  return (
    <div className={styles.mapContainer}>
      {/* This container is from open-source React components for Leaflet maps (https://react-leaflet.js.org/) 
       
       to use this go to site and look for instructions .
      */}
      <MapContainer
        center={mapPostion}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={mapPostion}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
