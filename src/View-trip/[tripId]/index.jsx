import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getDoc, doc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/placestovisit'
import Footer from '../components/Footer';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId])

    const GetTripData = async () => {
        const docRef = doc(db, 'AITrip', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document:", docSnap.data());
            setTrip(docSnap.data());
        } else {
            console.log("No Such Document!");
            toast("No trip Found!");
        }
    }
    return (
        <div>
            <InfoSection trip={trip} />
            <Hotels trip={trip} />
            <PlacesToVisit trip={trip} />
            <Footer />
        </div>
    )
}

export default Viewtrip