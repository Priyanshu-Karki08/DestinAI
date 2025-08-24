import React from 'react'
import PlaceCardItem from './PlaceCardItem';

const DailyPlanSec = ({trip}) => {
 return (
  <div className="relative z-10 mt-10">
    <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-500 mb-6">
      📅 Daily Plan
    </h2>

    {trip.TripData?.dayWisePlan.map((day, idx) => (
      <div key={idx} className="mb-8">
        <h3 className="text-xl font-bold text-amber-300 mb-4">Day {day.day}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {day.activities.map((act, i) => (
            <div
              key={i}
              className="rounded-2xl p-3 flex flex-col gap-3 
                           hover:scale-105 transition-all cursor-pointer
                           bg-gradient-to-br from-orange-900/60 via-black/70 to-red-900/60
                           backdrop-blur-md shadow-lg border"
            >
              <span className=" text-orange-400 font-semibold text-sm">🕙 {act.time}</span>
              <PlaceCardItem place = {act}/>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

}

export default DailyPlanSec
;