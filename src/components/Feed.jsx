import axios from "axios";
import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";


const Feed = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.feed);
  

  const getFeed = async () =>{
    //if(feed) return;
    try{
      const res = await axios.get("http://localhost:3000/user/feed",{withCredentials:true});
      //console.log(res.data.data);
      dispatch(addFeed(res.data.data));
      console.log(data);
      
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getFeed();
  },[])
  const feed = useSelector(state => state.feed.feed);
  console.log(feed);
  
  if(feed.length === 0 ) {
    return <div className=" flex justify-center mt-4"> No new user found </div>
  }

  return (
    
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    ) 
  )
}

export default Feed;