import React from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  return (
    <Link to = {'https://www.google.com/maps/search/?api=1&query=' + place.placeName + place.placeAddress} target = "_blank">
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover-shadow-md cursor-pointer'>
      {/* <img src={ "/placeholder.jpeg"} className='w-[130px] h-[130px] rounded-xl' /> */}
     <div>
        <h2 className='font-bold text-lg mt-2'>{place.placeName}</h2>
        <p className='text-sm text-gray-400'>{place.placeDetails}</p>
        <p className='mt-3'>⏰{place.timeToTravel}</p>
     </div>

      {/* <p>{place.placeDetails}</p>
      <p>🎟️ Ticket Pricing: {place.ticketPricing}</p>
      <p>🕒 Best Time to Visit: {place.bestTimeToVisit}</p>
      <p>⏰ Time to Travel: {place.timeToTravel}</p> */}
    </div>
    </Link>
  );
}

export default PlaceCardItem;
