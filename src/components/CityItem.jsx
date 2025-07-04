import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
// this function formats the date
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  // console.log(city);
  // destructuring the city object
  const { cityName, emoji, date, id, position } = city;
  return (
    <li>
      {/*when click on one of the link it will take to another page or component that matches the corrosponding link 
       and we can use this url as a global state and we can access it everywhere in the app */}
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}> {cityName} </h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
