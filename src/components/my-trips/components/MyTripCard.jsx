import React, { useEffect, useState } from "react";
import { fetchPlaceImage } from "../../service/unsplashService";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/custom/ThemeProvider";

const MyTripCard = ({ trip }) => {
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (trip?.tripData?.location) {
      fetchImage(trip.tripData.location);
    }
  }, [trip]);

  const fetchImage = async (placeName) => {
    if (!placeName) return;
    try {
      const url = await fetchPlaceImage(placeName);
      setImageUrl(url);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div
        className={`hover:scale-[104%] hover:shadow-xl border rounded-xl ${
          theme === "light" ? "bg-slate-100 border-gray-200" : "border-gray-600"
        } p-3 transition-all`}
      >
        <img
          src={imageUrl ? imageUrl : "/landingimage.webp"}
          alt="img"
          className="w-full h-36 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-lg"
        />
        <div>
          <h3 className="font-medium text-[1rem] sm:text-xl p-1">
            {trip?.tripData?.location}
          </h3>
          <h3 className="font-light text-slate-500 p-1">
            {trip?.tripData?.duration} with {trip?.tripData?.travelers?.budget}{" "}
            budget
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default MyTripCard;
