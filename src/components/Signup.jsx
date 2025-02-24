import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate ,Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Signup = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] =useState("Jai@123");
    const [name,setName] = useState("");
    const [errormessage , setErrormessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () =>{
        try{
        const res = await axios.post( BASE_URL + "/signup" , {name,email,password},{withCredentials:true});
        console.log(res);
        
        navigate("/login");
    
    }
        catch(err){
            console.log("Error" + err.response);
            setErrormessage("Invalid Credentials")
            
        }
        
    }

  return (<div className="flex justify-center align-middle mt-24">
    <div className=" w-1/3 bg-blue-300 p-5 rounded-xl ">
      <div className="flex justify-center"><h1 className="text-black font-bold text-2xl">SignUp</h1></div>
   
      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-black text-xl font-bold">Name</span>
   
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
    value={name} onChange={(e)=>setName(e.target.value)} />
 
   
</label>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-black text-xl font-bold">Email</span>
   
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full"
   value={email} onChange={(e)=> setEmail(e.target.value)} />
 
   
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-black text-xl font-bold">Password</span>
   
  </div>
  <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs"
    value={password} onChange={(e)=>setPassword(e.target.value)} />
 
   
</label>

<h1 className="text-red-600"> {errormessage}</h1>
<div className=" flex justify-center mt-6"><button className="btn btn-active btn-neutral text-white  " 
   onClick={handleSubmit} >Submit</button></div>
   <div className="flex justify-center mt-6"><h1 className="text-black">Existing User? , <Link to="/register">Click Here</Link> to Login </h1></div>
</div></div>)
}

export default Signup