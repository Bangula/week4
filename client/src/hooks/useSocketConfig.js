import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { UserContext } from "../components/context/ContextProvider";

const useSocketConfig = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("server messages here");
  const [rooms, setRooms] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const createClient = io.connect("/");
    setSocket(createClient);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("welcome", (data) => console.log(data));

      socket.on("message", (data) => {
        if (data?.message) setMessage(data.message);
        else setMessage("");
      });
      socket.on("joinRoom", (data) => {
        console.log("join room: ", data);

        if (data?.message) {
          alert(data.message);
        } else {
          setUserInfo(data);
          history.push(`/chat-room/${data.username}/${data.room}`);
        }
      });
      socket.on("getRooms", (data) => {
        console.log("get rooms:", data.data);
        setRooms(data.data);
      });
      socket.on("newMessage", (data) => {
        console.log("");
        if (data?.messages) setUserInfo({ messages: data.messages });
      });
      socket.on("getUsers", (data) => {
        console.log("get users:", data.data);

        setUserInfo({ users: data.data });
      });
    }
  }, [socket, setUserInfo, history, userInfo]);

  const handleJoinRoom = (roomName, joinUser) => {
    if (joinUser) {
      socket.emit("joinRoom", {
        username: userInfo.username,
        room: roomName,
        join_user: true,
      });
    } else {
      socket.emit("joinRoom", {
        username: userInfo.username,
        room: roomName,
      });
    }
  };

  const handleSendMessage = (mssg) => {
    socket.emit("newMessage", {
      username: userInfo.username,
      room: userInfo.room,
      message: mssg,
    });
  };

  return { socket, handleJoinRoom, message, rooms, handleSendMessage };
};

export default useSocketConfig;
