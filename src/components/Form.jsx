// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
// This is a reuseable Datepicker component from react.(https://www.npmjs.com/package/react-datepicker) ///
import DatePicker from "react-datepicker";
//css from react Datepicker
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
// this button is reuseable button component
import Button from "./Button";
import BackButton from "./BackButton";
import { UseUrlPosition } from "../hooks/UseUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "./contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  console.log("convertToEmoji called with:", countryCode);

  if (!countryCode || countryCode.length !== 2) {
    console.log("Invalid country code:", countryCode);
    return "🏳️"; // fallback flag
  }

  try {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => {
        const codePoint = 127397 + char.charCodeAt();
        console.log(`Char: ${char}, CodePoint: ${codePoint}`);
        return codePoint;
      });

    console.log("Code points array:", codePoints);
    const emoji = String.fromCodePoint(...codePoints);
    console.log(`Final emoji for ${countryCode}:`, emoji);
    return emoji;
  } catch (error) {
    console.error("Error in convertToEmoji:", error);
    return "🏳️"; // fallback flag
  }
}

function Form() {
  // UseUrlPosition() is from the UseUrlPosition file.
  const [lat, lng] = UseUrlPosition();
  //createCity is  a function from citiesContext file that uploads newCity object to fake API  .

  const { createCity } = useCities();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  //This useEffect hook fetches the lat and lng of the city from API.
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  useEffect(
    function () {
      if (!lat || !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log("API Response:", data);
          //  throw erro when there is not any country.
          if (!data.countryCode)
            throw new Error(
              "The city does'nt seem to exist click somewhere else"
            );
          console.log("Country code from API:", data.countryCode);
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          const flagEmoji = convertToEmoji(data.countryCode);
          console.log("Generated flag emoji:", flagEmoji);
          setEmoji(flagEmoji);
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  if (isLoadingGeocoding) return <Spinner />;
  if (geocodingError) return <Message message={geocodingError} />;
  if (!lat && !lng) return <Message message="Start by clicking on the map" />;

  // This function  submit or uploads  newCity object  to the fake API that i created for this project, when clicked on Add button //
  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    createCity(newCity);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        {/*  This is a reuseable component from react-datepicker */}
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          format="dd/MM/yyyy"
          id="date"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        {/* this is a re-useable button component  from BackButton file */}
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
