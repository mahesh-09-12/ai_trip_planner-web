import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPlaceImage } from "../../service/unsplashService";
import { useTheme } from "../../custom/ThemeProvider";

const PlaceCard = ({ place }) => {
  const { theme } = useTheme();
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!place?.places && !place?.places_to_visit) return;
    fetchImages();
  }, [place]);

  const fetchImages = async () => {
    setLoading(true);

    const newImageUrls = {};
    const allPlaces = [
      ...(place?.places || []),
      ...(place?.places_to_visit || []),
    ];

    try {
      const imagePromises = allPlaces.map(async (loc) => {
        const url = await fetchPlaceImage(loc.name || loc.placeName);
        return { key: loc.name || loc.placeName, url };
      });

      const images = await Promise.all(imagePromises);

      images.forEach(({ key, url }) => {
        newImageUrls[key] = url;
      });

      setImageUrls(newImageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
    }

    setLoading(false);
  };
  return (
    <div className="flex flex-col my-3">
      <h2 className="font-medium text-[1rem] sm:text-xl">{place?.title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {loading
          ? [1, 2].map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-36 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover bg-gray-300 rounded-lg animate-pulse"
                ></div>
              );
            })
          : place?.places?.map((loc, index) => {
              return (
                <Link
                  key={index}
                  to={
                    "https://www.google.com/maps/search/?api=1&query=" +
                    (loc?.name || loc?.placeName)
                  }
                  target="_blank"
                >
                  <div
                    key={index}
                    className={`h-full flex flex-col md:flex-row items-center gap-2 hover:scale-[103%] transition-all my-2 cursor-pointer hover:shadow-xl border border-gray-300 rounded-lg p-2 ${
                      theme === "light"
                        ? "bg-slate-100 border-gray-200"
                        : "border-gray-600"
                    }`}
                  >
                    <img
                      src={
                        imageUrls[loc?.name || loc?.placeName] ||
                        "/landingimage.webp"
                      }
                      alt="img"
                      className="w-full md:w-44 h-36 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-lg"
                    />
                    <div className="flex flex-col gap-2 p-2">
                      <h3 className="font-semibold text-[1rem] md:text-xl">
                        {loc?.name || loc?.placeName}
                      </h3>
                      <h3 className="text-sm text-slate-600">
                        🗒️ {loc?.placeDetails || loc?.details}
                      </h3>
                      <h3 className="text-sm text-slate-600">
                        🕛{" "}
                        <span className="font-bold">Best time to visit:</span>{" "}
                        {loc?.bestTimeToVisit}
                      </h3>
                      <h3>
                        💰 {loc?.ticketPricing?.amount}{" "}
                        {loc?.ticketPricing?.currency}
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

export default PlaceCard;
