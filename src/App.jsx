import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./components/contexts/CitiesContext";
import { AuthProvider } from "./components/contexts/FakeAuthContext";

function App() {
  // This contextProvider is from FakeAuthcontext file
  {
    /* // Here, im using citiesProvider component which is contextProvider from
      citiesContext file. */
  }
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />

            <Route path="/app" element={<AppLayout />}>
              {/* Navigate component  performs an automatic redirect  */}
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              {/* 
          This route creates a dynamic URL pattern `/app/cities/:id` where `:id` is a parameter that can be any value (like a city ID), and when matched, it renders the `City` component which can access that ID to display details for a specific city.
          */}
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
