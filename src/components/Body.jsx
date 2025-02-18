import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"


const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
 // const userData = useSelector((store)=>store.user);
  //console.log(userData);
  
  const getUser = async () =>{
    //if(userData) {return ;}
    try{
      const user = await axios.get("http://localhost:3000/profile/view",{withCredentials : true});
     // console.log(user.data.data);
      
    dispatch((addUser(user.data.data)));
  }
    catch(err){

      navigate("/login");
      console.log(err);
    }
  }

  useEffect(()=>{
    getUser();

  },[])

  return (
    <>
    <div className="">
        <NavBar/>
        <Outlet/>
    </div>
    </>
  )
}

export default Body