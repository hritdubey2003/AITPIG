import React, { useEffect } from 'react';
import { FaShare } from "react-icons/fa";
import { Button } from '@/components/ui/button';

function InfoSection({ trip }) {
  // Function to get a random image from the list of images
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
    return `../Urban/Part-${randomIndex}.jpeg`;
  };

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Set a random image */}
      <img src={getRandomImage()} className='h-[340px] w-full object-cover rounded-xl' alt="place" />

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.display_place}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅{trip?.userSelection?.noofdays} Days</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰{trip?.userSelection?.Budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. Of Travelers: {trip?.userSelection?.Travelers}</h2>
          </div>
        </div>
        <Button><FaShare /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
