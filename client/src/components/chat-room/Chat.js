import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import useSocketConfig from "../../hooks/useSocketConfig";
import { UserContext } from "../context/ContextProvider";

const Chat = () => {
  const [textMessage, setTextMessage] = useState("");
  const { message: serverMessage, handleSendMessage } = useSocketConfig();
  const { userInfo } = useContext(UserContext);
  const params = useParams();

  useEffect(() => {
    if (userInfo) console.log(userInfo);
  }, [userInfo]);

  const handleSend = () => {
    if (textMessage.length > 1) {
      handleSendMessage(textMessage);
    }
    return;
  };

  return (
    <div className="chatPage  border border-gray-300 bg-gray-100 py-5 pr-5 rounded-md shadow-xl">
      <div className="chatWellcomeHeader">
        <p className="text-center text-gray-600">
          Welcome{" "}
          <span className="text-blue-500 font-semibold">{params.id || ""}</span>{" "}
          to{" "}
          <span className="text-gray-700 font-semibold">
            {params.room || ""}
          </span>{" "}
        </p>
        <p className="mt-5 text-center text-red-600 text-semibold">
          {serverMessage}
        </p>
      </div>
      <div className="chatContainer flex mt-10 h-full">
        <div className="chatLeftSide w-1/3 h-full">
          {userInfo?.users?.length ? (
            <p className="text-xs text-center opacity-75">
              Active users in chat:
            </p>
          ) : (
            <p className="text-xs text-center text-red-600 w-full">
              <i>no active users in chat</i>
            </p>
          )}
          {userInfo?.users?.length
            ? userInfo.users.map((item, index) => (
                <p key={item + index} className="">
                  {item}
                </p>
              ))
            : null}
        </div>
        <div className="chatConversation h-full w-full bg-white p-2 border border-gray-300 rounded-lg relative">
          <div>
            {userInfo?.messages?.length
              ? userInfo.messages.map((item) => (
                  <div>
                    <p>{item.message}</p>
                  </div>
                ))
              : null}
          </div>
          <div className="messageWriteContainer flex items-center content-center absolute border-t border-gray-300">
            <input
              type="text"
              className="w-full p-2 focus:outline-none"
              placeholder="write your message here..."
              onChange={(e) => setTextMessage(e.target.value)}
              value={textMessage}
            />
            <div className="flex items-center pr-2">
              <button
                onClick={handleSend}
                className={`px-4 py-1 rounded bg-blue-500 text-white`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
