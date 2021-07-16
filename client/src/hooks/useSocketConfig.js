import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { UserContext } from "../components/context/ContextProvider";

const useSocketConfig = () => {
  const [socket, setSocket] = useState(null);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const createClient = io.connect("/");
    setSocket(createClient);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("welcome", (data) => console.log(data));
      socket.on("joinRoom", (data) => {
        console.log("join room: ", data);
        setUserInfo(data);
        history.push(`/chat-room/${data.username}/${data.room}`);
      });
    }
  }, [socket, setUserInfo, history]);

  const handleJoinRoom = () => {
    if (userInfo.username && userInfo.room) {
      socket.emit("joinRoom", userInfo);
    }
  };

  return { socket, handleJoinRoom };
};

export default useSocketConfig;
