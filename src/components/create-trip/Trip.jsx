import React, { useState } from "react";
import Autocomplete from "../ui/Autocomplete";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelersList,
} from "../constants/Options";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { chatSession } from "../service/AIModel";
import SignInDialog from "../ui/SignInDialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../custom/ThemeProvider";

const Trip = () => {
  const { theme } = useTheme();
  const [selectedPlace, setSelectedPlace] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    noOfDays: "",
    budget: "",
    traveler: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === "noOfDays") {
      const days = parseInt(value, 10);
      if (isNaN(days) || days <= 0 || days > 5) {
        toast.error("Please enter a valid number of days (1-5).");
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenRes) => {
      if (!tokenRes?.access_token) {
        toast.error("Authentication failed. Please try again.");
        return;
      }
      await getUserDetails(tokenRes.access_token);
    },
    onError: (err) => {
      console.error("Google Login Error:", err);
      toast.error("Google sign-in failed. Please try again.");
    },
  });

  const getUserDetails = async (accessToken) => {
    try {
      const { data } = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log("User Info:", data);
      localStorage.setItem("user", JSON.stringify(data));
      setDialogOpen(false);
    } catch (error) {
      console.error("Error fetching user info:", error);
      toast.error("Failed to retrieve user details.");
    }
  };

  const saveTripData = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
      toast.error("User not authenticated!");
      setLoading(false);
      return;
    }

    const docId = Date.now().toString();
    try {
      await setDoc(doc(db, "aitrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(tripData),
        userEmail: user.email,
        id: docId,
      });
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error("Error writing to Firestore:", error);
      toast.error("Failed to save trip. Please try again.");
    }
    setLoading(false);
  };

  const createTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setDialogOpen(true);
      return;
    }

    const { location, noOfDays, budget, traveler } = formData;
    if (!location || !noOfDays || !budget || !traveler) {
      toast.error("Please provide all details!");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", location)
      .replace("{totalDays}", noOfDays)
      .replace("{traveler}", traveler)
      .replace("{budget}", budget);

    console.log("FINAL PROMPT:", FINAL_PROMPT);

    try {
      const res = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await res.response.text();
      toast.success("Trip created successfully!");
      saveTripData(responseText);
    } catch (error) {
      console.error("AI Model Error:", error);
      toast.error("Error generating your trip. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center lg:p-8 w-full">
      <div className="p-6 text-center w-full md:w-[75%] lg:w-[60%]">
        <h2 className="font-bold text-3xl sm:text-4xl">
          Tell us your travel preferences 🏕️🌳🌏
        </h2>
        <p className="text-lg sm:text-xl text-slate-500 p-3">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>
      </div>
      <div className="flex flex-col gap-3 px-4 sm:px-10 sm:gap-6 w-full md:w-[75%] lg:w-[60%] mt-6">
        <h2 className="font-medium text-xl sm:text-2xl">
          What is your destination?
        </h2>
        <Autocomplete
          handleInputChange={handleInputChange}
          setSelectedPlace={setSelectedPlace}
        />
        <p>Selected place: {selectedPlace}</p>
      </div>
      <div className="flex flex-col px-4 sm:px-10 gap-3 sm:gap-6 w-full md:w-[75%] lg:w-[60%] mt-6">
        <h2 className="font-medium text-xl sm:text-2xl ">
          How many days are you planning for your trip?
        </h2>
        <input
          id="days"
          placeholder="Ex.2"
          type="number"
          onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          className="w-full sm:w-96 md:w-[500px] lg:w-[700px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-300"
        />
      </div>
      <div className="flex flex-col px-4 sm:px-10 gap-3 sm:gap-6 w-full md:w-[75%] lg:w-[60%] mt-6">
        <h2 className="font-medium text-xl sm:text-2xl ">
          What is Your Budget?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full sm:w-96 md:w-[550px] lg:w-[700px]">
          {SelectBudgetOptions.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`flex flex-col gap-3 p-2 md:p-6 border ${
                  theme == "dark"
                    ? "border-slate-700 hover:bg-gray-500"
                    : "hover:bg-orange-100"
                } rounded-lg cursor-pointer hover:text-orange-400 hover:drop-shadow-lg ${
                  formData?.budget == item.title &&
                  `shadow-lg ${
                    theme == "light" ? "border-black" : "border-white"
                  }`
                }`}
              >
                <h2 className="text-xl md:text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg md:text-xl">{item.title}</h2>
                <h2 className="text-sm text-slate-400 mb-4">{item.desc}</h2>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col px-4 sm:px-10 gap-3 sm:gap-6 w-full md:w-[75%] lg:w-[60%] mt-6">
        <h2 className="font-medium text-xl sm:text-2xl ">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full sm:w-96 md:w-[550px] lg:w-[700px]">
          {SelectTravelersList.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`flex flex-col gap-3 p-3 md:p-5 w-full border ${
                  theme == "dark"
                    ? "border-slate-700 hover:bg-gray-500"
                    : "hover:bg-orange-100"
                } rounded-lg cursor-pointer hover:text-orange-400 hover:drop-shadow-lg ${
                  formData?.traveler == item.people &&
                  `shadow-lg ${
                    theme == "light" ? "border-black" : "border-white"
                  }`
                }`}
              >
                <h2 className="text-xl md:text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg md:text-xl">{item.title}</h2>
                <h2 className="text-sm text-slate-400 mb-4">{item.desc}</h2>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end mr-3 my-8 text-right w-full md:w-[70%] lg:w-[65%] cursor-pointer">
        <Button
          disabled={loading}
          className="cursor-pointer p-2 py-2 sm:p-5"
          onClick={createTrip}
        >
          {loading ? (
            <VscLoading className="w-8 h-8 animate-spin" />
          ) : (
            "Create Trip"
          )}
        </Button>
      </div>
      <SignInDialog
        login={login}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
};

export default Trip;
