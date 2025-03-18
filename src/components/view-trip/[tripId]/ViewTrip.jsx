import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../service/firebaseConfig";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import Places from "../components/Places";

const ViewTrip = () => {
  const [tripDetails, setTripDetails] = useState([]);

  const { tripId } = useParams();

  useEffect(() => {
    if (tripId) {
      getTripDetails();
    }
  }, [tripId]);

  const getTripDetails = async () => {
    if (!tripId) {
      toast.error("Invalid trip ID!");
      return;
    }

    try {
      const docRef = doc(db, "aitrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTripDetails(docSnap.data());
        console.log(docSnap.data());
        toast.success("Fetched data successfully!");
      } else {
        toast.error("No trip details found!");
      }
    } catch (error) {
      console.error("Error fetching trip details:", error);
      toast.error("Failed to fetch trip details!");
    }
  };
  return (
    <div className={`p-8 sm:p-10 md:p-14 lg:py-10`}>
      <InfoSection tripDetails={tripDetails} />
      <Hotels tripDetails={tripDetails} />
      <Places tripDetails={tripDetails} />
    </div>
  );
};

export default ViewTrip;
