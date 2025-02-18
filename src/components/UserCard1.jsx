//mport React from 'react'
import { Link, useNavigate } from "react-router-dom";


const UserCard = ({user}) => {
//console.log(user);

    const {name , profile , about , gender  } = user || "";
    const navigate = useNavigate();
   const handleClick = () =>{
    try{
      navigate("/edit")

    }catch(err){
      console.log(err);
      
    }
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
       
        <button className="btn btn-neutral" onClick={handleClick}>Edit</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard