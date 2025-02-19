//mport React from 'react'

import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
//console.log(user);

    const {_id , name , profile , about , gender  } = user || "";
    const dispatch = useDispatch();
    const handleClick = async (status,userId) =>{
        const data = await axios.post("http://localhost:3000/connection/send/" + status + "/" + userId.toString(),{},{withCredentials:true});
        console.log(data);
        dispatch(removeFeed(userId));
        
    }
  
  return (
    <div className="card bg-blue-200 w-96 shadow-xl">
    <figure>
      <img
        src={profile}
        alt="profile" />
    </figure>
    <div className="card-body">
      <h2 className="card-title text-black">{name}</h2>
      <p className="text-black">{gender}</p>
      <p className="text-black">{about}</p>
     
      <div className="card-actions justify-center">
        <button className="btn btn-neutral" onClick={()=> handleClick("intrest" , _id )}>Interested</button>
        <button className="btn btn-neutral" onClick={()=> handleClick("pass" , _id )}>Pass</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard