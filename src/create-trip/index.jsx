import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { SelectBudgetOptions, SelectTravelersList } from '@/constants/options.jsx';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AI_PROMPT } from '@/constants/options.jsx';
import { chatSession } from '@/service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from '@react-oauth/google';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig'



function CreateTrip() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [FormData, setFormData] = useState([]);
  const [OpenDialogue, setOpenDialogue] = useState(false);
  const [loading, setloading] = useState(false);

  const apiKey = 'pk.ca40827327e54343c9d8f85bc0ebec4c';
  const router = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer $( tokenInfo?.access_token)`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialogue(false);
      OnGenerateTrip();
    });
  }

  // const SaveTrip = async (TripData) => {
  //   setloading(true);
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   const docId = Date.now().toString();
  //   await setDoc(doc(db, "AITrip", docId), {
  //     userSelection: FormData,
  //     tripData: TripData,
  //     userEmail: user?.email,
  //     id: docId
  //   });

  //   setloading(false);
  // };

  const SaveTrip = async (TripData) => {
    try {

      setloading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();  // Unique ID based on timestamp
      // Save the trip data to Firestore
      console.log(TripData);
      await setDoc(doc(db, "AITrip", docId), {
        userSelection: FormData,   // User's form data
        tripData: TripData,        // Trip data returned by the AI service
        userEmail: user?.email,    // User's email
        id: docId                  // Document ID
      });

      setloading(false);
      router('/View-trip/' + docId);
      console.log("Trip saved successfully!");
    } catch (error) {
      console.log("Hey i am here!");
      console.error("Error saving trip to Firestore:", error);
    }
  };


  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialogue(true);
      return;
    }
    if (FormData?.noofdays > 5 && !FormData?.display_place || !FormData?.Budget || !FormData?.Travelers) {
      toast('Please fill all the required fields!');
      return;
    }

    setloading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', FormData?.display_place || 'unknown location')
      .replace(/{noofdays}/g, FormData?.noofdays || 'unknown number of days')
      .replace('{Travelers}', FormData?.Travelers || 'unknown travelers')
      .replace('{Budget}', FormData?.Budget || 'undefined budget');


    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      // Check the structure of the result
      console.log("--", result?.response?.text());
      // Adjust according to the actual structure
      SaveTrip(result?.response?.text())
      setloading(false)
    } catch (error) {
      setloading(false);
      console.error('Error during trip generation:', error);
    }
  }

  const handleInputChange = ((name, value) => {
    setFormData({
      ...FormData,
      [name]: value
    })
  })

  useEffect(() => {
    console.log(FormData)
  }, [FormData])

  // Function to fetch suggestions based on user input
  const fetchSuggestions = async (input) => {
    if (!input) return;
    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/autocomplete.php`, {
        params: {
          key: apiKey,
          q: input,
          format: 'json',
        },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Handle input change and fetch suggestions
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        fetchSuggestions(query);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);  // Cleanup
  }, [query]);

  // Handle user selection from suggestions
  const handleSelect = (suggestion) => {
    setSelectedPlace(suggestion);
    setSuggestions([]);  // Clear suggestions after selection
    setQuery(suggestion.display_name);
    setFormData(
      {
        ...FormData,
        display_place: suggestion.display_name
      }
    )
    // Set query to the selected place name
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 text-center'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🏝️!</h2>
      <p className='mt-3 text-gray-500 text-xl'>We'd love to help you plan your trip!</p>

      <div className='mt-20 flex flex-col gap-9'>
        <div className=''>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>

          {/* Input for location search */}
          <input
            type="text"
            className="w-half p-3 border rounded-lg shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your destination"
            autoComplete="off"
          />

          {/* Display autocomplete suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border mt-1 rounded shadow-lg z-10 max-h-48 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(suggestion)}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Display selected destination */}
        {/* {selectedPlace && (
          <div className="mt-10">
            <h3 className="text-lg font-medium">You selected:</h3>
            <p className="text-xl text-blue-600">{selectedPlace.display_name}</p>
          </div> */}
        {/* )} */}
      </div>
      <div className=' mt-20 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning for?</h2>
          <Input type="number" className="w-half p-3 border rounded-lg shadow-sm" placeholder="Number of days" onChange={(e) => handleInputChange('noofdays', e.target.value)} />
        </div>
      </div>

      <div className='mb-4 flex flex-col gap-9'>
        <h2 className='text-xl my-3 font-medium'>What kind of trip are you looking for?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5 cursor-pointer'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} className={`p-4 border rounded-lg hover:shadow-lg ${FormData?.Budget === item.title && 'shadow-lg border-black'}`} onClick={() => handleInputChange('Budget', item.title)}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='mb-4 flex flex-col gap-9'>
        <h2 className='text-xl my-3 font-medium'>How many of you are looking for your trip?</h2>
        <div className='grid grid-cols-4 gap-5 mt-5 cursor-pointer'>
          {SelectTravelersList.map((item, index) => (
            <div key={index} className={`p-4 border rounded-lg hover:shadow-lg ${FormData?.Travelers === item.people && 'shadow-lg border-black'}`} onClick={() => handleInputChange('Travelers', item.people)}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button onClick={OnGenerateTrip} disabled={loading} >{loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip!'}</Button>
      </div>

      <Dialog open={OpenDialogue}>

        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.svg' />
              <h2 className='font-bold text-lg mt-7'>Sign in with Google!</h2>
              <p>Sign in to the app with Google Authentication Security!</p>
              <Button onClick={login} varient="outline" className="w-full mt-5 flex gap-4 items-center" >
                <FcGoogle className='h-7 w-7' /> Sign In With Google!

              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;
