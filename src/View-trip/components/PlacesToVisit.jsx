import React from 'react';
import PlaceCardItem from '../components/PlaceCardItem';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData;

  let hotelsData = {}; // Initialize hotelsData to avoid reference errors

  if (itinerary) {
    try {
      // Parse tripData if it's a valid stringified JSON
      hotelsData = typeof itinerary === 'string' ? JSON.parse(itinerary) : itinerary;
    } catch (error) {
      console.error('Error parsing tripData:', error);
    }
  }

  const itineraryData = hotelsData?.itinerary || {};

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <h2 className='font-bold text-lg'>Places To Visit</h2>
      <div>
        {Object.keys(itineraryData).length > 0 ? (
          Object.keys(itineraryData).map((day, index) => (
            <div key={index} >
              <h2 className='font-medium text-lg uppercase'>{day}</h2>
              <div className='grid md:grid-cols-2 gap-5'>
                {itineraryData[day].plan.map((item, idx) => (
                  <div key={idx} className=''>
                    <h2 className='font-medium text-sm text-orange-600 mb-1'>{item.timeToTravel}</h2>
                    <PlaceCardItem key={idx} place={item} />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary available for this trip.</p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
