import React from "react";
import Hero from "./components/custom/Hero";
import { Route, Routes } from "react-router-dom";
import Header from "./components/custom/Header";
import Trip from "./components/create-trip/Trip";
import { Toaster } from "sonner";
import ViewTrip from "./components/view-trip/[tripId]/ViewTrip";
import MyTrips from "./components/my-trips/MyTrips";
import ViewProfile from "./components/custom/ViewProfile";
import ProtectedRoute from "./components/custom/ProtectedRoute";
import { ThemeProvider } from "./components/custom/ThemeProvider";
import Footer from "./components/view-trip/components/Footer";

const App = () => {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen flex flex-col">
        <Header />
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/create-trip" element={<Trip />} />
            <Route path="/view-trip/:tripId" element={<ViewTrip />} />
            <Route path="/my-trips" element={<MyTrips />} />
            <Route path="/profile" element={<ViewProfile />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
