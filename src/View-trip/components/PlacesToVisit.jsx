import React from 'react';
import PlaceCardItem from '../components/PlaceCardItem';

// Utility function to safely parse the itinerary data
const parseTripData = (itinerary) => {
  try {
    // If itinerary is a string, parse it; otherwise, use it as is
    return typeof itinerary === 'string' ? JSON.parse(itinerary) : itinerary;
  } catch (error) {
    console.error('Error parsing tripData:', error);
    return {}; // Return an empty object if there's a parsing error
  }
};

function PlacesToVisit({ trip }) {
  // Fetch tripData from the trip object
  const itinerary = trip?.tripData;
  
  // Parse the trip data using the utility function
  const hotelsData = parseTripData(itinerary);
  
  // Access the itinerary data from the parsed object
  const itineraryData = hotelsData?.itinerary || {}; // Fallback to an empty object if no itinerary

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <h2 className="font-bold text-lg">Places To Visit</h2>
      <div>
        {/* Check if there are any days in the itinerary */}
        {Object.keys(itineraryData).length > 0 ? (
          Object.keys(itineraryData).map((day, index) => (
            <div key={index}>
              <h2 className="font-medium text-lg uppercase">{day}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {/* Ensure the plan is an array, and map over it */}
                {(Array.isArray(itineraryData[day]) ? itineraryData[day] : []).map((item, idx) => (
                  <div key={item.placeName || idx} className="flex flex-col">
                    {/* Display travel time if available */}
                    {item.timeToTravel && (
                      <h2 className="font-medium text-sm text-orange-600 mb-1">{item.timeToTravel}</h2>
                    )}
                    {/* Render the place card item */}
                    <PlaceCardItem place={item} />
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
