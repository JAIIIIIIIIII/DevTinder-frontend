import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client"; // If you are using socket.io
import createSocketConnection from "./soket";
import { useAuthContext } from "./userContext";

// Replace with your WebSocket server URL

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      // Connect to the WebSocket server

      const socketConnection = createSocketConnection(authUser._id);

      setSocket(socketConnection);

      // Cleanup on unmount
      return () => {
        socketConnection.disconnect();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
