import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../service/firebaseConfig";
import MyTripCard from "./components/MyTripCard";

const MyTrips = () => {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      await getUserTrips(user.email);
    };

    fetchTrips();
  }, [navigate]);

  const getUserTrips = async (email) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "aitrips"),
        where("userEmail", "==", email)
      );
      const querySnap = await getDocs(q);

      const trips = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching user trips:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 sm:p-10 md:p-16 lg:py-20 lg:px-32">
      <h2 className="font-semibold text-[1rem] sm:text-3xl">My Trips</h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-3">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="w-full h-36 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-lg bg-slate-300 animate-pulse"
            ></div>
          ))}
        </div>
      ) : userTrips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-3">
          {userTrips.map((trip, index) => (
            <MyTripCard trip={trip} key={index} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg font-medium">No trips found</p>
          <p className="text-sm">Start planning your next adventure now!</p>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
