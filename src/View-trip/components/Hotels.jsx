import React from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  let hotelsData = null;

  // Check if tripData exists and is a string
  if (trip?.tripData) {
    try {
      // Parse tripData if it's a valid stringified JSON
      hotelsData = typeof trip.tripData === 'string' ? JSON.parse(trip.tripData) : trip.tripData;
    } catch (error) {
      console.error('Error parsing tripData:', error);
    }
  }

  const hotels = hotelsData?.hotels || [];

  // Function to get a random image from the list of images
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    return `../edroom/Part-${randomIndex}.jpeg`;
  };

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <h2 className='font-bold text-xl mt-5 mb-5'>Hotel Recommendations</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {hotels.length > 0 ? (
          hotels.map((item, index) => (
            <Link key={index} to={'https://www.google.com/maps/search/?api=1&query=' + item.hotelName + item.hotelAddress} target="_blank">
              <div className='hover:scale-105 transition-all cursor-pointer'>
                <img
                  src={getRandomImage()} // Get a random image for each hotel
                  className='rounded-xl'
                  alt={`Image of ${item.hotelName}`} // Added alt attribute for accessibility
                />
                <div className='my-2 flex flex-col gap-2'>
                  <h2 className='font-medium'>{item.hotelName}</h2>
                  <h2 className='text-xs text-gray-500'>📍{item.hotelAddress}</h2>
                  <h2 className='text-sm'>💰{item?.price}</h2>
                  <h2 className='text-sm'>⭐{item?.rating}</h2>
                  {/* <h2>{item.description}</h2> */}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No hotel recommendations available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default Hotels;
