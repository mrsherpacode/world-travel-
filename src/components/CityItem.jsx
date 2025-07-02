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
  const { cityName, emoji, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}> {cityName} </h3>
      <time className={styles.date}>({formatDate(date)})</time>
    </li>
  );
}

export default CityItem;
