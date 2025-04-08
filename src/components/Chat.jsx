import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSocket } from "../utils/socketContext";

const Chat = () => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  const user = useSelector((store) => store.user.user);
  const userId = user ? user._id : "";

  const getChat = async () => {
    try {
      const res = await axios.get(BASE_URL + "/getchat/" + id, {
        withCredentials: true,
      });
      const oldMessages = res.data.chat.messages;
      // console.log(oldMessages);
      const formattedMessaged = oldMessages.map((val) => {
        return { sender: val.senderId, message: val.message };
      });
      //console.log(formattedMessaged);
      setMessages(formattedMessaged);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChat();
  }, []);

  useEffect(() => {
    try {
      if (!user) {
        return;
      }

      socket.emit("joinChat", { sender: userId, receiver: id });

      socket.on("messageReceived", ({ sender, message }) => {
        //console.log(sender.name +": " +message);
        setMessages((messages) => [...messages, { sender, message }]);
        setInputMessage("");
      });
      // Cleanup socket on component unmount
      return () => {
        //socket.disconnect();
      };
    } catch (err) {
      setError(err.message); // Catch any errors during socket connection or emit
      console.error("Error in socket connection:", err);
    }
  }, [userId, id, socket]);

  const handleClick = async () => {
    socket.emit("sendMessage", {
      sender: user,
      receiver: id,
      message: inputMessage,
    });
  };

  // Error state rendering
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto m-3 rounded-xl bg-black p-3 border border-white">
        <div className="h-max"></div>
        {messages.map((val, index) => {
          if (val.sender._id === userId) {
            return (
              <div key={index} className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={val.sender.profile}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {val.sender.name}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{val.message} </div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          } else {
            return (
              <div key={index} className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={val.sender.profile}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {val.sender.name}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{val.message} </div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          }
        })}
      </div>
      <div className="flex justify-center p-2 m-2">
        <input
          type="text"
          placeholder="Type here"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className=" rounded-l-lg px-3 input-primary w-full max-w-xs  rounded-r-none"
        />
        <button
          className="btn btn-primary rounded-l-none"
          onClick={handleClick}
        >
          Send{" "}
        </button>
      </div>
    </div>
  );
};

export default Chat;
