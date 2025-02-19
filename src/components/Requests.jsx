import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requests';
import { useNavigate } from 'react-router-dom';

const Requests = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const requests = useSelector((store) => store.requests)
//console.log(requests);
    const handleClick = async (status , reqId) =>{
        //console.log(reqId);
        
        const data = await axios.post("http://localhost:3000/connection/review/" + status + "/" +reqId.toString(),{},{withCredentials:true});
        //console.log(data);
        navigate("/connections");   

        
    }

    const getConnectionRequests = async () =>{
        const res = await axios.get("http://localhost:3000/user/requests" , {withCredentials : true});
        //console.log(res.data.data);
        dispatch(addRequests(res.data.data));
        
    }
    useEffect(()=>{
        getConnectionRequests();
    },[])
  return (
    <div><div className='flex justify-center mt-4 text-white font-bold text-2xl'>Requests</div>
    
    {
  requests.requests.length === 0 ? (
    <div className='flex justify-center mt-4'>
      <h1>No requests found</h1>
    </div>
  ) : (
    requests.requests.map((val) => {
      console.log(val);
      return (
        <div key={val._id} className="flex justify-center p-5">
          <div className="border border-gray-200 rounded-lg pl-3 flex p-2 w-2/4">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={val.sentFrom.profile} alt="Profile" />
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <h1 className="pl-3 py-2 text-xl font-bold">{val.sentFrom.name}</h1>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={()=> handleClick("accept" , val._id)}>Accept</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={()=>handleClick("reject" , val._id)}>Reject</button>
              </div>
            </div>
          </div>
        </div>
      );
    })
  )
}

        
    </div>
  )
}

export default Requests