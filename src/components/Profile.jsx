import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"
import UserCard from "./UserCard1";


const Profile = () => {
   const userData = useSelector((store)=>store.user);
   //console.log(userData);
   
  return (
    <div className="grid justify-center mt-7">
    <UserCard user = {userData.user} />
    
   
    </div>
  )
}

export default Profile