import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HotelSection = ({ trip }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (!trip?.TripData?.hotels) return;

      const fetchedImages = await Promise.all(
        trip.TripData.hotels.map(async (hotel) => {
          try {
            const res = await fetch(
              `https://pixabay.com/api/?key=${
                import.meta.env.VITE_PIXABAY_API_KEY
              }&q=${encodeURIComponent(
                hotel.hotelName
              )}&image_type=photo&per_page=3`
            );
            const data = await res.json();

            if (data.hits && data.hits.length > 0) {
              // pick first image
              return data.hits[0].largeImageURL;
              // or: pick random one from hits
              // return data.hits[Math.floor(Math.random() * data.hits.length)].largeImageURL;
            } else {
              return "https://wallpaperaccess.com/full/136008.jpg"; // fallback
            }
          } catch (err) {
            return "https://wallpaperaccess.com/full/136008.jpg"; // fallback
          }
        })
      );

      setImages(fetchedImages);
    };

    fetchImages();
  }, [trip]);

return (
  <div className="relative z-10 mt-10">
    <h2 className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg mb-6">
      Hotel Recommendations
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {trip?.TripData?.hotels?.map((hotel, idx) => (
        <div
          key={idx}
          className="rounded-xl overflow-hidden backdrop-blur-md bg-white/10 
             border  hover:scale-105 transition-all shadow-lg cursor-pointer
             bg-gradient-to-br from-orange-900/60 via-black/70 to-red-900/60"
        >
          <img
            src={images[idx]}
            alt={hotel?.hotelName}
            className="h-40 w-full object-cover"
          />
          <div className="p-4 text-white">
            <h3 className="text-amber-300 font-semibold text-lg">{hotel?.hotelName}</h3>
            <p className="text-sm text-red-400">📍 {hotel?.hotelAddress}</p>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-green-300">💲 {hotel?.price}</span>
              <span className="text-yellow-400">⭐ {hotel?.rating}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

};

export default HotelSection;
