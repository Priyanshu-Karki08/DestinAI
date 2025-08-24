import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";

const InfoSection = ({ trip }) => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      if (!trip?.userSelection?.destination?.name) return;

      try {
        const response = await fetch(
          `https://pixabay.com/api/videos/?key=${
            import.meta.env.VITE_PIXABAY_API_KEY
          }&q=${encodeURIComponent(trip.userSelection.destination.name)}&per_page=3`
        );

        const data = await response.json();

        if (data.hits && data.hits.length > 0) {
          // Pixabay returns multiple video sizes. 'medium' is usually good
          setVideoUrl(data.hits[0].videos.medium.url);
        } else {
          setVideoUrl(""); // fallback
        }
      } catch (error) {
        console.error("Error fetching video:", error);
        setVideoUrl("");
      }
    };

    fetchVideo();
  }, [trip]);

 return (
  <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg bg-gradient-to-br from-orange-900/60 via-black/70 to-red-900/60">
    {videoUrl ? (
      <video
        src={videoUrl}
        className="h-[300px] w-full object-cover rounded-xl"
        autoPlay
        loop
        muted
      />
    ) : (
      <img
        src="https://wallpaperaccess.com/full/136008.jpg"
        alt="no image found"
        className="h-[300px] w-full object-cover"
      />
    )}
    <h2 className="text-2xl mt-3 font-bold flex items-center gap-2 mb-4 
               bg-gradient-to-r from-orange-400 to-red-500 
               bg-clip-text text-transparent drop-shadow-lg">
      🌍 Trip Information
    </h2>

    <div className="space-y-3 text-gray-200">
      <p ><span className="font-semibold text-amber-400">Destination:</span> {trip?.userSelection?.destination?.name}</p>
      <p><span className="font-semibold text-amber-400">Days:</span> {trip?.userSelection?.noOfDays}</p>
      <p><span className="font-semibold text-amber-400">Budget:</span> {trip?.userSelection?.budget}</p>
      <p><span className="font-semibold text-amber-400">Travelers:</span> {trip?.userSelection?.traveler}</p>
    </div>
  </div>
);

};

export default InfoSection;
