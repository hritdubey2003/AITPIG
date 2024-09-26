export const SelectTravelersList = [
    {
        id: 1,
        title: 'Solo Traveler',
        desc: 'An individual exploring the world on their own',
        icon: '🧍‍♂️',
        people: '1'
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'A pair traveling together in harmony',
        icon: '👫',
        people: '2'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A family on an adventure together',
        icon: '👨‍👩‍👧‍👦',
        people: '3-5 people'
    },
    {
        id: 4,
        title: 'Group of Friends',
        desc: 'A group of friends embarking on a shared journey',
        icon: '👥',
        people: '5-10'
    }
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Budget-Friendly',
        desc: 'An economical trip designed to save costs',
        icon: '💸'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'A balanced trip with reasonable expenses',
        icon: '💵'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'A premium trip with no expense spared',
        icon: '💷'
    }
];

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {noofdays} Days for {Travelers} Travelers with a {Budget} budget ,Give me a Hotels option list with HotelName, Hotel address, Price, hotel image url, geo cordinate, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for {noofdays} days with each day plan with best time to visit in JSON format.';
