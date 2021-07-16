import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const params = useParams();

  useEffect(() => {
    function getRoomUsers() {
      fetch(`/api/room-users?room=${params.room || ""}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
    getRoomUsers();
  }, [params]);

  return (
    <div className="chatPage">
      <div className="chatWellcomeHeader">
        <p>
          Wellcome{" "}
          <span className="text-blue-500 font-semibold">
            {params.username || ""}
          </span>{" "}
          to {params.room || ""}
        </p>
      </div>
    </div>
  );
};

export default Chat;
