import React, { useState , useEffect} from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const EditProfile = () => {
  
    const user = useSelector((store) =>store.user)
    //console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const [name,setName] = useState(user?.user?.name );
    const [profile,setProfile] = useState(user?.user?.profile);
    const [about,setAbout] = useState(user?.user?.about);
    const [skills , setSkills] = useState(user?.user?.skills);
    const [gender , setGender] = useState(user?.user?.gender);
    const [errormessage,setErrormessage] = useState("");
    const [message,setMessage] = useState(false);
    
    useEffect(() => {
        if (user?.user) {
          const { name, gender, profile, about, skills } = user?.user;
          setName(name);
          setGender(gender);
          setProfile(profile);
          setAbout(about);
          setSkills(skills);
        }
      }, [user]);

      const handleClick = async () =>{
        const res = await axios.patch( BASE_URL + "/profile/edit",{name,gender,profile,about,skills},{withCredentials:true});
        //console.log(res.data);
        dispatch(addUser(res.data.data));
        setMessage(true);
        setTimeout(()=> setMessage(false) , 2000)
        navigate("/profile")

        
      }
  return (
     <div>
    {message &&  (<div className="toast toast-top ">
    
    <div className="alert alert-success">
      <span>Edited successfully.</span>
    </div>
  </div>)}
     
 

        <div className="flex justify-center align-middle mt-24">
    <div className=" w-1/4 bg-blue-300 p-5 rounded-xl ">
      <div className="flex justify-center"><h1 className="text-black font-bold text-2xl">Edit</h1></div>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-black text-xl font-bold">Name</span>
   
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full"
   value={name} onChange={(e)=> setName(e.target.value)} />
 
   
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-black text-xl font-bold">Profile</span>
   
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full"
   value={profile} onChange={(e)=> setProfile(e.target.value)} />
 
   
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-black text-xl font-bold">Gender</span>
   
  </div>
  <select className="select select-bordered w-full max-w-xs" value={gender} onChange={(e)=>setGender(e.target.value)}>

  <option>male</option>
  <option>female</option>
  <option>other</option>
</select>
 
   
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-black text-xl font-bold">About</span>
   
  </div>
  <textarea className="textarea" placeholder="About" value={about} onChange={(e)=>setAbout(e.target.value)}></textarea>
 
   
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-black text-xl font-bold">Skills</span>
   
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
    value={skills} onChange={(e)=>setSkills(e.target.value)} />
 
   
</label>
<h1 className="text-red-600"> {errormessage}</h1>
<div className=" flex justify-center mt-6"><button className="btn btn-active btn-neutral text-white  " onClick={handleClick}
    >Submit</button></div>
</div></div>

</div>
  )
}

export default EditProfile