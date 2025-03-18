import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { RiShareForward2Fill } from "react-icons/ri";
import { fetchPlaceImage } from "../../service/unsplashService";
import { useTheme } from "../../custom/ThemeProvider";
import { toast } from "sonner";

const InfoSection = ({ tripDetails }) => {
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (!tripDetails?.tripData?.location) return;

    const fetchImage = async () => {
      try {
        const url = await fetchPlaceImage(tripDetails.tripData.location);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [tripDetails?.tripData?.location]);

  const handleShare = async () => {
    if (!tripDetails?.tripData) return;

    const shareData = {
      title: tripDetails.tripData.location,
      text: `I'm planning a trip to ${tripDetails.tripData.location} for ${tripDetails.tripData.duration}. Let's enjoy this adventure together! 🚀`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Trip shared successfully! 🎉");
      } catch (error) {
        toast.error("Error while sharing 😞");
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Copied to clipboard! 📋");
      } catch (error) {
        toast.error("Failed to copy! ❌");
      }
    }
  };

  return (
    <div className="p-2">
      <img
        src={imageUrl || "/landingimage.webp"}
        alt="landing-img"
        className="w-full h-[30rem] object-cover rounded-md hover:scale-[103%] transition-all"
      />
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col gap-3">
          <h2 className="text-[1rem] sm:text-xl md:text-2xl font-semibold m-2">
            {tripDetails?.tripData?.location}
          </h2>
          <div className="flex items-center gap-3 text-center justify-between">
            <h3
              className={`text-[0.65rem] sm:text-[1rem] border ${
                theme === "light"
                  ? "bg-slate-100 border-gray-200"
                  : "bg-slate-700 border-gray-600"
              } rounded-full p-2 hover:shadow-md hover:scale-105 transition-all cursor-pointer`}
            >
              🗓️ {tripDetails?.tripData?.duration}
            </h3>
            <h3
              className={`text-[0.65rem] sm:text-[1rem] border border-gray-200 ${
                theme === "light"
                  ? "bg-slate-100 border-gray-200"
                  : "bg-slate-700 border-gray-600"
              } rounded-full p-2 hover:shadow-md hover:scale-105 transition-all cursor-pointer`}
            >
              💸 {tripDetails?.userSelection?.budget} Butget
            </h3>
            <h3
              className={`text-[0.65rem] sm:text-[1rem] border border-gray-200 ${
                theme === "light"
                  ? "bg-slate-100 border-gray-200"
                  : "bg-slate-700 border-gray-600"
              } rounded-full p-2 hover:shadow-md hover:scale-105 transition-all cursor-pointer`}
            >
              🚘 No of travelers: {tripDetails?.userSelection?.traveler}
            </h3>
          </div>
        </div>
        <Button
          className="w-7 h-7 sm:w-10 sm:h-10 cursor-pointer rounded-full hover:shadow-md hover:scale-105 transition-all"
          onClick={handleShare}
        >
          <RiShareForward2Fill />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
