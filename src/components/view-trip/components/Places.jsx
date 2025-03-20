import React from "react";
import PlaceCard from "./PlaceCard";

const Places = ({ tripDetails }) => {
  const itineraryArray = Array.isArray(tripDetails?.tripData?.itinerary)
    ? tripDetails.tripData.itinerary
    : Object.keys(tripDetails?.tripData?.itinerary || {})
        .sort(
          (a, b) => Number(a.replace(/\D/g, "")) - Number(b.replace(/\D/g, ""))
        )
        .map((key) => ({ day: key, ...tripDetails.tripData.itinerary[key] }));

  return (
    <div className="m-4">
      <h2 className="font-bold text-[1rem] sm:text-xl">Places to Visit</h2>
      <div>
        {itineraryArray.map((place, index) => (
          <div key={index}>
            <PlaceCard place={place} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Places;
