import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "../custom/ThemeProvider";

const Autocomplete = ({ setSelectedPlace, handleInputChange }) => {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchPlaces = async (searchTerm) => {
    if (searchTerm.length < 2) {
      setResults([]);
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`;

    try {
      const response = await axios.get(url);
      setResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const handleSelectPlace = (placeName) => {
    setQuery(placeName);
    setResults([]);
    setSelectedPlace(placeName);
    handleInputChange("location", placeName);
  };

  return (
    <div className="relative w-full sm:w-96 md:w-[500px] lg:w-[700px]">
      <input
        type="text"
        id="place"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchPlaces(e.target.value);
          handleInputChange("location", e.target.value);
        }}
        placeholder="Search for a place..."
        spellCheck="false"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-300"
      />

      {results.length > 0 && (
        <ul
          className={`absolute w-full mt-2 ${
            theme === "light" ? "bg-white" : "bg-gray-700"
          } border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50`}
        >
          {results.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelectPlace(place.display_name)}
              className={`p-3 cursor-pointer ${
                theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700"
              }`}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
