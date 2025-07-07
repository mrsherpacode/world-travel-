import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
//  map component
function Map() {
  // Programmatic navigation allows us to go to other pages without us having to click on navigation link.
  const naviate = useNavigate();
  // This will get lat and lang from url and we use useSearchParams hook  for that
  const [searchParam, setSearchParam] = useSearchParams();
  // here i'm using get method to get the position lat and lng cuz we directly can not access it.
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => naviate("form")}>
      <h1>Map</h1>
      <h2>
        position: lat: {lat}, lng: {lng}
      </h2>
    </div>
  );
}

export default Map;
