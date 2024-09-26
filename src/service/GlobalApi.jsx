const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';
import axios from 'axios';
const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': 'AIzaSyAXwuPjvwt8cYQGv3jf4IfLLdUKfTA3X04',
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id',
        ]
    }
}


export const GetPlaceDetails = ( data ) => axios.get( BASE_URL , data , config );