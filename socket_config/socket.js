const socket = require("socket.io");
const Users = require("../utils/usersController");

module.exports = (server) => {
  const io = socket(server);
  io.on("connection", (socket) => {
    console.log("Socket connection established");
    socket.on("chat", (data) => {
      console.log("chat emmited");
      console.log(data);
      socket.emit("welcome", {
        message: `Hello ${data.name}! Welcome from server on port 5000!`,
      });
    });

    socket.on("joinRoom", (data) => {
      socket.join(data.room);
      console.log(data);
      const user = Users.addNewUser(socket.id, data.username, data.room);
      socket.emit("joinRoom", user);
    });
  });
};
