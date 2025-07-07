import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
// API URL //
const BASE_URL = "http://localhost:9000";
function App() {
  // we are creating cities state here cuz we need this state in other places too.
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/app" element={<AppLayout />}>
          {/* Navigate component  performs an automatic redirect  */}
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          {/* 
          This route creates a dynamic URL pattern `/app/cities/:id` where `:id` is a parameter that can be any value (like a city ID), and when matched, it renders the `City` component which can access that ID to display details for a specific city.
          */}
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
