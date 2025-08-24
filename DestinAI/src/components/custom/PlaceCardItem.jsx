import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  const [imageUrl, setImageUrl] = useState(place.hotelImageURL || "");

  useEffect(() => {
    const fetchImage = async () => {
      if (!place?.placeName) return;

      try {
        const res = await fetch(
          `https://pixabay.com/api/?key=${
            import.meta.env.VITE_PIXABAY_API_KEY
          }&q=${encodeURIComponent(place.placeName)}&image_type=photo&per_page=3`
        );
        const data = await res.json();

        if (data.hits && data.hits.length > 0) {
          // pick random image from results
          const randomImg =
            data.hits[Math.floor(Math.random() * data.hits.length)]
              .largeImageURL;
          setImageUrl(randomImg);
        } else {
          setImageUrl("https://tse3.mm.bing.net/th/id/OIP.HPhM0UyhZfKMO4U_X16AIQHaFG?pid=Api&P=0&h=180https://wallpaperaccess.com/full/136008.jpg"); // fallback
        }
      } catch (error) {
        setImageUrl("https://tse3.mm.bing.net/th/id/OIP.HPhM0UyhZfKMO4U_X16AIQHaFG?pid=Api&P=0&h=180");
      }
    };

    // Only fetch if no image URL was already provided
    if (!place.hotelImageURL) {
      fetchImage();
    }
  }, [place]);

  return (
  <Link
    to={"https://www.google.com/maps/search/?api=1&query=" + place?.hotel}
    target="_blank"
  >
    <div className="rounded-2xl p-3 mt-2 flex flex-col gap-3 
                    hover:scale-105 transition-all cursor-pointer 
                    ">
      
      {/* Image */}
      <img
        src={imageUrl}
        alt={place.placeName}
        className="w-full h-32 rounded-xl object-cover shadow-md "
      />

      {/* Content */}
      <div className="flex flex-col justify-center p-2 gap-2">
        <h2 className="font-bold text-lg text-amber-300 drop-shadow">
          {place.placeName}
        </h2>
        <h2 className="font-medium text-md text-gray-300">
          {place.details}
        </h2>

        {/* Map Button */}
        <Button
          size="sm"
          className="w-[40px] h-[40px] flex items-center justify-center 
                     bg-gradient-to-r from-orange-400 to-red-500 text-white 
                     rounded-full shadow-md hover:shadow-lg transition"
        >
          <FaMapLocationDot />
        </Button>
      </div>
    </div>
  </Link>
);

};

export default PlaceCardItem;
