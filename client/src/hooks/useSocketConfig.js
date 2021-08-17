import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { UserContext } from "../components/context/ContextProvider";

const socket = io.connect("/", { forceNew: true });

const useSocketConfig = () => {
  const [message, setMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (socket) {
      socket.on("message2", (data) => {
        console.log("joined room: ", data);
        if (data?.message) setMessage(data.message);
        else setMessage("");
        // setTimeout(() => setMessage(""), 6000);
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

      socket.on("getMessages", (data) => {
        console.log("messages: ", data);
        if (data?.messages) setUserInfo({ messages: data.messages });
      });
      socket.on("newMessage", (data) => {
        console.log("messages: ", data);
        if (data?.messages) setUserInfo({ messages: data.messages });
      });
      socket.on("getUsers", (data) => {
        console.log("get users:", data.data);

        setUserInfo({ users: data.data });
      });
    }
  }, [setUserInfo, history, userInfo]);

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

  const handleSendMessage = async (mssg, callback) => {
    await socket.emit("newMessage", {
      username: userInfo.username,
      room: userInfo.room,
      message: mssg,
    });
    if (callback) callback();
  };

  const handleLeave = () => {
    socket.emit("leaveRoom");
    setUserInfo({});
    history.push("/");
  };

  return {
    socket,
    handleJoinRoom,
    message,
    rooms,
    setRooms,
    handleSendMessage,
    handleLeave,
  };
};

export default useSocketConfig;
