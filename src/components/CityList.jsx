import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CityList({ cities, isloading }) {
  if (isloading) return <Spinner />;
  // if the cities array is empty.
  if (!cities.length)
    return <Message message="Add your first  city  by clicking on the map" />;
  return (
    <ul className={styles.CityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
