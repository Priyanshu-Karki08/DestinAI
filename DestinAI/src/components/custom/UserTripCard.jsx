import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserTripCard = ({ trip }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      if (!trip?.userSelection?.destination?.name) return;

      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${
            import.meta.env.VITE_PIXABAY_API_KEY
          }&q=${encodeURIComponent(
            trip.userSelection.destination.name
          )}&image_type=photo&per_page=5`
        );
        const data = await response.json();

        if (data.hits && data.hits.length > 0) {
          setImageUrl(data.hits[0].largeImageURL);
        } else {
          setImageUrl(
            "https://wallpaperaccess.com/full/136008.jpg"
          ); // fallback
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl("https://wallpaperaccess.com/full/136008.jpg");
      }
    };

    fetchImage();
  }, [trip]);

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all  
                      bg-gradient-to-br from-orange-900/60 via-black/70 to-red-900/60
                      backdrop-blur-md shadow-xl rounded-xl
                      flex flex-col w-full max-w-sm border">
        {/* Image */}
        <img
          src={imageUrl}
          alt={trip?.userSelection?.destination?.name}
          className="w-full h-48 object-cover rounded-t-xl"
          loading="lazy"
        />

        {/* Content */}
        <div className="flex flex-col gap-2 p-4">
          <h2 className="font-bold text-lg text-amber-200 drop-shadow-md">
            {trip?.userSelection?.destination?.name}
          </h2>
          <p className="text-sm text-gray-100 drop-shadow-sm">
            {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCard;
