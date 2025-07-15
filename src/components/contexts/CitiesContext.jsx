import { createContext, useContext, useEffect, useState } from "react";
// creating a context
const CitiesContext = createContext();
// API URL //
const BASE_URL = "http://localhost:9000";
// This is a context provider
function CitiesProvider({ children }) {
  // we are creating cities state here cuz we need this state in other places too.
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  // This hook loads cities data from  the fake API that i created
  useEffect(
    function () {
      async function fetchCities() {
        setIsLoading(true);
        try {
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          setCities(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchCities();
    },

    []
  );
  //  this function is called in the City component on its initial render.
  async function getCity(id) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, getCity, currentCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
// here I'm creating a custom hook for consuming citiesContext values
function useCities() {
  const value = useContext(CitiesContext);
  if (value === undefined)
    throw new Error("CitiesContext is used outside the CitiesProvider");
  return value;
}
export { CitiesProvider, useCities };
