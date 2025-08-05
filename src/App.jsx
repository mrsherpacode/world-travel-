import { lazy } from "react";
import { Suspense } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./components/contexts/CitiesContext";
import { AuthProvider } from "./components/contexts/FakeAuthContext";
import { ProtectedRoute } from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";
//  Here, Lazy function using which enables code spilitting and loads components only when needed. which optimize the performance of the app.
const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

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
          {/* Suspense: Provides fallback UI while lazy components are loading, when the components are  loading it shows the < SpinnerFullpage/>  
          component
           */}
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />

              <Route
                path="/app"
                element={
                  // ProtectedRoute component is from protedRoute page that protects the access to these pages if the user is not login or isAuthenticated.
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
