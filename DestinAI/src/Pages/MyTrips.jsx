import React, { useEffect,useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../service/firebaseconfig";
import UserTripCard from '@/components/custom/UserTripCard';

const MyTrips = () => {
    const[userTrips,setUserTrips] = useState([]);

    const navigation = useNavigate();

    useEffect(() => {
        GetUserTrips();
    },[])

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if(!user){
            navigation('/');
            return
        }
        
        const q = query(collection(db,'Trips'),where('userEmail','==',user?.email))
        const querySnapshot = await getDocs(q);
        setUserTrips([])
        querySnapshot.forEach((doc) => {
            console.log(doc.id,"=>",doc.data())
            setUserTrips(prevVal => [...prevVal,doc.data()])
        })


    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 p-5 mt-10'>
      <h2 className = 'font-bold text-3xl text-amber-400'>MyTrips</h2>

      <div className='grid grid-cols-2 mt-8 md:grid-cols-3 gap-5 '>
        {userTrips?.length > 0?
        userTrips.map((trip,idx) => (
            <UserTripCard key = {idx} trip = {trip}/>
        ))
        :
        [1,2,3,4,5,6].map((item,idx) => (
            <div key = {idx} className='h-[200px] w-[200px] bg-slate-200 animate-pulse rounded-xl'>

            </div>
        ))
    }
      </div>
    </div>
  )
}

export default MyTrips
