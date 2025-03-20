import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../custom/ThemeProvider";
import { fetchPlaceImage } from "@/components/service/unsplashService";

const Hotels = ({ tripDetails }) => {
  const { theme } = useTheme();
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripDetails?.tripData?.hotels) return;

    const fetchImages = async () => {
      setLoading(true);
      const newImageUrls = {};

      try {
        for (const loc of tripDetails.tripData.hotels) {
          const url = await fetchPlaceImage(loc.hotelName || loc.name);
          newImageUrls[loc.hotelName || loc.name] = url;
        }

        setImageUrls((prev) => ({ ...prev, ...newImageUrls }));
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [tripDetails]);

  return (
    <div className="m-3">
      <h2 className="font-medium text-[1rem] sm:text-xl">
        Hotel recommendations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-1">
        {loading
          ? [1, 2, 3].map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-36 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover bg-gray-300 rounded-lg animate-pulse"
                ></div>
              );
            })
          : tripDetails?.tripData?.hotels?.map((hotel, index) => {
              return (
                <Link
                  key={index}
                  to={
                    "https://www.google.com/maps/search/?api=1&query=" +
                      hotel?.hotelName ||
                    hotel?.name + "," + hotel?.hotelAddress ||
                    hotel?.address
                  }
                  target="_blank"
                >
                  <div
                    key={index}
                    className={`h-full flex flex-col cursor-pointer transition-all hover:scale-105 m-1 border rounded-lg hover:shadow-xl p-3 ${
                      theme === "light"
                        ? "bg-slate-100 border-gray-200"
                        : "border-gray-600"
                    }`}
                  >
                    <img
                      src={
                        imageUrls[hotel.hotelName || hotel?.name]
                          ? imageUrls[hotel.hotelName || hotel?.name]
                          : "/landingimage.webp"
                      }
                      alt=""
                      className="w-full h-36 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-lg hover:shadow-lg"
                    />
                    <div>
                      <h3 className="font-medium text-[1rem] sm:text-xl">
                        {hotel?.hotelName || hotel?.name}
                      </h3>
                      <h3 className="text-sm md:text-[1rem]">
                        📍 {hotel?.hotelAddress || hotel?.address}
                      </h3>
                      <h3 className="text-sm md:text-[1rem]">
                        💰 {hotel?.price?.amount} {hotel?.price?.currency}
                      </h3>
                      <h3 className="text-sm md:text-[1rem]">
                        ⭐ {hotel?.rating} stars
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default Hotels;
