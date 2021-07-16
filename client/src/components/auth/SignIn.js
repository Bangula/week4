import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/ContextProvider";
import useSocketConfig from "../../hooks/useSocketConfig";

const SignIn = () => {
  const [textField, setTextField] = useState("");
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [step, setStep] = useState(1);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { handleJoinRoom } = useSocketConfig();

  useEffect(() => {
    getRooms();
  }, []);

  function getRooms() {
    fetch("/api/rooms")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        if (data?.data?.length) setRooms(data.data);
        else setRooms([]);
      });
  }

  const handleAddUser = () => {
    if (textField.length < 4) alert("Username must be at least 4 letters long");
    else {
      setUserInfo({ username: textField });
      setStep(2);
    }
  };

  const handleAddRoom = () => {
    if (roomName.length < 2) return;
    const data = { room: roomName };
    fetch("/api/rooms", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data?.error) {
          alert(data.error);
          return;
        }
        getRooms();
        setRoomName("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="signInContainer border border-gray-200 bg-gray-100 p-10 rounded-md shadow-xl">
      {step === 1 && (
        <div className="usernameForm">
          <p className="w-full text-center font-bold font-xs opacity-50">
            ENTER USERNAME FOR CHAT
          </p>
          <input
            className="w-full border border-gray-300 bg-white p-2 rounded mt-10 focus:outline-none"
            type="text"
            value={textField}
            onChange={(e) => setTextField(e.target.value)}
          />
          <div className="text-center">
            <button
              className="px-5 py-2 rounded text-white bg-blue-500 mt-10"
              onClick={handleAddUser}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <p className="w-full text-center font-bold font-xs">
            <span className="opacity-50"></span>
            Welcome{" "}
            <span className="font-sm text-blue-500 font-semibold">
              {userInfo.username}
            </span>
            !
          </p>
          <small className="inline-block mt-10">Create new chat</small>
          <div className="flex ">
            <input
              className="w-full md:w-2/3 border border-gray-300 bg-white p-2 rounded focus:outline-none"
              type="text"
              placeholder="room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button
              onClick={handleAddRoom}
              className="mt-5 rounded md:mt-0 px-5 h-auto text-white bg-blue-500 ml-4"
            >
              Add
            </button>
          </div>
          <div className="mt-10">
            <small>or join chat from the list</small>
            <div className="chatRoomsContainer flex flex-col rounded p-2 border border-gray-300 bg-white w-full">
              {rooms.length ? (
                rooms.map((item) => (
                  <label
                    key={item}
                    className="inline-flex items-center px-2 py-1"
                  >
                    <input
                      type="radio"
                      value={item}
                      name="room"
                      onChange={(e) => setUserInfo({ room: e.target.value })}
                      className="form-radio h-5 w-5 text-gray-600"
                    />
                    <span className="ml-2 text-gray-500 font-semibold cursor-pointer">
                      {item}
                    </span>
                  </label>
                ))
              ) : (
                <p className="px-2 py-1 w-full text-center text-xs opacity-50">
                  <i>no active chats</i>
                </p>
              )}
            </div>
          </div>
          <div className="text-center">
            <button
              disabled={userInfo?.username && userInfo?.room ? false : true}
              className={`px-5 py-2 rounded text-white mt-10 ${
                userInfo?.username && userInfo?.room
                  ? "bg-blue-500"
                  : "bg-gray-200 cursor-not-allowed	"
              }`}
              onClick={handleJoinRoom}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
