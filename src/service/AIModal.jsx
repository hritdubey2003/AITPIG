/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

  import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = 'AIzaSyDjT6WnLuy_r3RmV2pKKa6qNSGyOpI4AG4';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a cheap budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format."
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: `
  \`\`\`json
  {
    "hotels": [
      {
        "hotelName": "The D Las Vegas",
        "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",
        "price": "$50 - $100 per night",
        "hotelImageUrl": "https://www.theDcasino.com/media/wysiwyg/hotel-room-gallery/the-d-hotel-room-01.jpg",
        "geoCoordinate": "36.1699, -115.1422",
        "rating": 4.0,
        "description": "A budget-friendly hotel located in the heart of Fremont Street, offering a lively atmosphere and access to the Fremont Street Experience."
      },
      {
        "hotelName": "The Golden Nugget",
        "hotelAddress": "129 E Fremont St, Las Vegas, NV 89101",
        "price": "$70 - $150 per night",
        "hotelImageUrl": "https://www.goldennugget.com/las-vegas/images/hotel/GN-hotel-exterior-3-min.jpg",
        "geoCoordinate": "36.1696, -115.1420",
        "rating": 4.5,
        "description": "A historic hotel known for its luxurious amenities, including a shark tank and a pool with a waterslide."
      },
      {
        "hotelName": "Plaza Hotel & Casino",
        "hotelAddress": "1 South Main Street, Las Vegas, NV 89101",
        "price": "$60 - $120 per night",
        "hotelImageUrl": "https://www.plazahotelcasino.com/images/hotel/plaza-hotel-casino-las-vegas-exterior.jpg",
        "geoCoordinate": "36.1699, -115.1418",
        "rating": 4.0,
        "description": "A centrally located hotel with a variety of dining options, a casino, and a rooftop pool."
      },
      {
        "hotelName": "Circus Circus Hotel & Casino",
        "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
        "price": "$40 - $80 per night",
        "hotelImageUrl": "https://www.circuscircus.com/media/wysiwyg/home/circus-circus-hotel-exterior.jpg",
        "geoCoordinate": "36.1148, -115.1726",
        "rating": 3.5,
        "description": "A family-friendly hotel with a circus theme, amusement park, and budget-friendly dining options."
      }
    ],
    "itinerary": {
      "day1": {
        "plan": [
          {
            "placeName": "Fremont Street Experience",
            "placeDetails": "A pedestrian-friendly street with live music, street performers, and a canopy of LED lights.",
            "placeImageUrl": "https://www.fremontstreetexperience.com/images/general/fremont-street-experience-lights-overview.jpg",
            "geoCoordinate": "36.1699, -115.1422",
            "ticketPricing": "Free",
            "timeToTravel": "2-3 hours",
            "bestTimeToVisit": "Evening (after dark to see the lights)"
          },
          {
            "placeName": "Neon Museum",
            "placeDetails": "A museum showcasing historic neon signs from Las Vegas.",
            "placeImageUrl": "https://www.neonmuseum.org/images/hero-image.jpg",
            "geoCoordinate": "36.1701, -115.1450",
            "ticketPricing": "$20",
            "timeToTravel": "1-2 hours",
            "bestTimeToVisit": "Morning"
          }
        ]
      },
      "day2": {
        "plan": [
          {
            "placeName": "The Strip",
            "placeDetails": "Walk or take a bus along the iconic Las Vegas Strip, marveling at the dazzling hotels and casinos.",
            "placeImageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/hero_image_desktop/public/2020-07/Las-Vegas-Strip-Hero.jpg",
            "geoCoordinate": "36.1109, -115.1722",
            "ticketPricing": "Free",
            "timeToTravel": "3 hours",
            "bestTimeToVisit": "Evening"
          },
          {
            "placeName": "Bellagio Fountains",
            "placeDetails": "Enjoy the spectacular fountain show in front of the Bellagio Hotel.",
            "placeImageUrl": "https://www.bellagio.com/content/dam/bellagio/experiences/fountains-of-bellagio/hero-images/hero-fountains-of-bellagio-desktop.jpg",
            "geoCoordinate": "36.1158, -115.1735",
            "ticketPricing": "Free",
            "timeToTravel": "30 minutes",
            "bestTimeToVisit": "Evening"
          }
        ]
      },
      "day3": {
        "plan": [
          {
            "placeName": "Hoover Dam",
            "placeDetails": "Take a day trip to the iconic Hoover Dam, a marvel of engineering and a stunning landmark.",
            "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Hoover_Dam_in_2016.jpg/1280px-Hoover_Dam_in_2016.jpg",
            "geoCoordinate": "36.0053, -114.9783",
            "ticketPricing": "$30",
            "timeToTravel": "2 hours (round trip)",
            "bestTimeToVisit": "Morning"
          },
          {
            "placeName": "Red Rock Canyon National Conservation Area",
            "placeDetails": "Explore the scenic Red Rock Canyon, offering hiking trails and stunning views.",
            "placeImageUrl": "https://www.nps.gov/redr/learn/nature/images/redrock-canyon-canyon-201904.jpg",
            "geoCoordinate": "36.1204, -115.3325",
            "ticketPricing": "$15",
            "timeToTravel": "1 hour",
            "bestTimeToVisit": "Afternoon"
          }
        ]
      }
    }
  }
  \`\`\`
  `
            }
          ],
        },
      ],
    });
  

  