import { getDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import InfoSection from "@/components/custom/InfoSection";
import { db } from "@/service/firebaseconfig";
import HotelSection from "@/components/custom/HotelSection";
import DailyPlanSec from "@/components/custom/DailyPlanSec"

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState({});
 console.log(tripId)
  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, "Trips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document : ", docSnap.data());
        setTrip(docSnap.data());
        toast.success("trip found.");
      } else {
        console.log("No Such Document.");
        toast.error("No trip found.");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  return (
  <div className="relative min-h-screen p-6 md:p-10 lg:px-32 xl:px-48">
    {/* Transparent container so main background video shows */}
    <div className="rounded-2xl shadow-lg relative z-10">
      <InfoSection trip={trip} />

      <div className="mt-10">
        <HotelSection trip={trip} />
      </div>

      <div className="mt-10">
        <DailyPlanSec trip={trip} />
      </div>
    </div>
  </div>
);

};

export default ViewTrip;
