import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

 // Singleton instance

const createSocketConnection = (AuthId) => {
 // console.log(user);
  
 
 
 const socket = location.hostname === "localhost"
 ? io(BASE_URL ,{ query: {
  userId: AuthId,
}})
 : io("/",{ query: {
  userId: AuthId,
}}); 
    socket.on("connect", () => {
      console.log("Socket connected with id:", socket.id);
    });

    return socket;
 
};

export default createSocketConnection;