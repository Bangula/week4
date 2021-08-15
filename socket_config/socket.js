const socket = require("socket.io");
const Rooms = require("../utils/roomsController");

module.exports = (server) => {
  const io = socket(server);
  io.on("connection", (socket) => {
    console.log("Socket connection established");

    io.emit("getRooms", {
      data: Rooms.getRooms() || [],
    });

    socket.on("joinRoom", (data) => {
      socket.join(data.room);
      if (data.join_user) {
        let data1 = Rooms.joinUser(socket.id, data.username, data.room);
        console.log("data1: ", data1);
        socket.emit("joinRoom", data1);
      } else {
        let data2 = Rooms.addNewRoom(socket.id, data.username, data.room);
        socket.emit("joinRoom", data2);
      }
      io.to(data.room).emit("message", {
        message: `${data.username} has joined the chat`,
      });

      io.emit("getRooms", {
        data: Rooms.getRooms() || [],
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
      console.log("new message: ", userData);
      let roomMessages = Rooms.writeMessageToRoom(
        userData.room,
        userData.username,
        socket.id,
        userData.message
      );
      io.to(userData.room).emit("newMessage", {
        messages: roomMessages,
      });
      console.log("from server room messages: ", roomMessages);
    });
  });
};
