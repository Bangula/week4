const socket = require("socket.io");
const Rooms = require("../utils/roomsController");

module.exports = (server) => {
  const io = socket(server);
  io.on("connection", (socket) => {
    socket.on("joinRoom", (data) => {
      socket.join(data.room);
      if (data.join_user) {
        let data1 = Rooms.joinUser(socket.id, data.username, data.room);

        socket.emit("joinRoom", data1);
      } else {
        let data2 = Rooms.addNewRoom(socket.id, data.username, data.room);
        socket.emit("joinRoom", data2);
      }
      socket.broadcast.to(data.room).emit("message2", {
        message: `${data.username} has joined the chat`,
      });

      io.to(data.room).emit("getUsers", {
        data: Rooms.getUsersFromRoom(data.room) || [],
      });
      let messages = Rooms.getRoomMessages(data.room);
      io.to(data.room).emit("getMessages", {
        messages: messages.length ? messages : null,
      });
    });

    socket.on("newMessage", (userData) => {
      let roomMessages = Rooms.writeMessageToRoom(
        userData.room,
        userData.username,
        socket.id,
        userData.message
      );
      io.to(userData.room).emit("newMessage", {
        messages: roomMessages,
      });
    });

    const leaveRoomLogic = () => {
      let room = Rooms.findRoom(socket.id);
      let username = Rooms.findUser(socket.id);

      if (room) {
        io.to(room).emit("message2", {
          message: `The ${username} has left the chat.`,
        });
      }
      Rooms.handleDisconnect(room, socket.id);
      io.to(room).emit("getUsers", {
        data: Rooms.getUsersFromRoom(room) || [],
      });
    };

    socket.on("disconnect", () => {
      leaveRoomLogic();
    });

    socket.on("leaveRoom", () => {
      leaveRoomLogic();
    });
  });
};
