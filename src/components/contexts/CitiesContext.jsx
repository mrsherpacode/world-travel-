import { createContext, useContext, useEffect, useReducer } from "react";
// creating a context
const CitiesContext = createContext();
// API URL //
const BASE_URL = "http://localhost:9000";

//  initial states
const initialStates = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
//  Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    // here i'm using common naming convention
    //  when all the cities are  loaded
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    // When a single city is loaded
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    // when a single city is created
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    // when a single city is deleted
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    // when there is error

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      "unknown action  type";
  }
}

// This is a context provider
function CitiesProvider({ children }) {
  // here i'm destructuring initial states.
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialStates
  );
  // This hook loads cities data from  the fake API that i created
  useEffect(
    function () {
      async function fetchCities() {
        dispatch({ type: "loading" });
        try {
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          dispatch({ type: "cities/loaded", payload: data });
        } catch (err) {
          dispatch({
            type: "rejected",
            payload: "There was error loading cities ...",
          });
        }
      }
      fetchCities();
    },

    []
  );
  //  this function is called in the City component on its initial render.
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was error loading city ...",
      });
    }
  }

  // This function uploads newCity object to the fake API that i created before  //
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      // This synches UI with the remote data, the one that comes from the API
      // it adds newCity data to current cities array object
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was error creating newCity ...",
      });
    }
  }

  /////////////////////////////////////////
  // This function delete the city list from the  cities
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // it creates a new city array without the city that has the matching id and cities list will re-render without the deleted city.
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was error deleting city ...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
        error,
      }}
    >
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
