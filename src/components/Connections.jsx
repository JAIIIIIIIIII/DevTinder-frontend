import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connections";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useSocket } from "../utils/socketContext";

const Connections = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const connections = useSelector((store) => store.connections);
  const [users, setUsers] = useState([]);
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      //console.log(res);

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnections();
    if (socket) {
      socket.on("online-users", (onlineusers) => {
        setUsers(onlineusers);
      });
    }
  }, [socket, users]);

  return (
    <div>
      <div className="flex justify-center mt-4 text-white font-bold text-2xl">
        Connections
      </div>

      {connections.connections.length === 0 ? (
        <div className="flex justify-center mt-4">
          <h1>No connections found</h1>
        </div>
      ) : (
        connections.connections.map((val) => {
          //console.log(val);
          return (
            <div key={val._id} className="flex justify-center p-5">
              <div className=" border border-gray-200 rounded-lg pl-3 flex p-2 w-1/4">
                {users.includes(val._id) ? (
                  <div className="avatar online">
                    <div className="w-12  rounded-full">
                      <img src={val.profile} alt="Profile" />
                    </div>
                  </div>
                ) : (
                  <div className="avatar offline">
                    <div className="w-12  rounded-full">
                      <img src={val.profile} alt="Profile" />
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center w-full">
                  <Link to={"/viewprofile/" + val._id}>
                    {" "}
                    <h1 className="pl-3 py-3 text-xl font-bold">
                      {val.name}
                    </h1>{" "}
                  </Link>

                  <Link to={"/chat/" + val._id}>
                    {" "}
                    <button className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                      Chat
                    </button>{" "}
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Connections;
