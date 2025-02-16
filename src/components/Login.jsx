import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";


const Login =  () => {
     
    const [email,setEmail] = useState("bala@gmail.com");
    const [password,setPassword] =useState("Jai@123");
    const [errormessage , setErrormessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async () =>{
        try{
        const res = await axios.post("http://localhost:3000/login" , {email,password},{withCredentials:true});
        dispatch(addUser(res.data));
        navigate("/");
    
    }
        catch(err){
            console.log("Error" + err);
            setErrormessage("Invalid Credentials")
            
        }
        
    }

  return (<div className="flex justify-center align-middle mt-24">
    <div className=" w-1/3 bg-blue-300 p-5 rounded-xl ">
      <div className="flex justify-center"><h1 className="text-black font-bold text-2xl">Login</h1></div>
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
</div></div>
  )
}

export default Login