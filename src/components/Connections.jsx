import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connections';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);
    //console.log(connections);
    
    const getConnections = async () =>{

        try{
            const res = await axios.get("http://localhost:3000/user/connections",{withCredentials:true});
            //console.log(res.data);
            dispatch(addConnections(res.data.data));

            
        }
        catch(err){
            console.log(err);
            
        }

    }

    useEffect(()=>{
        getConnections();
    },[])

    

  return (
   
    <div><div className='flex justify-center mt-4 text-white font-bold text-2xl'>Connections</div>
    
    {
  connections.connections.length === 0 ? (
    <div className='flex justify-center mt-4'>
      <h1>No connections found</h1>
    </div>
  ) : (
    connections.connections.map((val) => {
      console.log(val);
      return (<div key={val._id} className='flex justify-center p-5'>
        <div  className=' border border-gray-200 rounded-lg pl-3 flex p-2 w-1/4'> 
         <div className='avatar'> <div className="w-12  rounded-full">
            <img src={val.profile} alt="Profile" />
          </div>
          </div>
          <h1 className='pl-3 py-3 text-xl font-bold'>{val.name}</h1>
        </div></div>
      );
    })
  )
}

        
    </div>
  )
}

export default Connections