import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useParams } from 'react-router-dom'

const ViewProfile = () => {

    const {id} = useParams();
    const [userInfo , setUserInfo] = useState({});
   
    
   const getUserProfile = async () =>{
        const res = await axios.get(BASE_URL + "/viewprofile/" +id , {withCredentials:true});
        //console.log(res.data);
        setUserInfo(res.data.user);
        
    }

    useEffect(()=>{

        getUserProfile();
    },[])

  return (
    <div className='flex justify-center my-10'>
        <div className="card bg-blue-200 w-96 shadow-xl">
    <figure>
      <img
        src={userInfo.profile}
        alt="profile" />
    </figure>
    <div className="card-body">
      <h2 className="card-title text-black">{userInfo.name}</h2>
      <p className="text-black">{userInfo.gender}</p>
      <p className="text-black">{userInfo.about}</p>
     
     
    </div>
  </div>
    </div>
  )
}

export default ViewProfile