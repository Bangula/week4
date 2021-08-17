const moment = require("moment");

class Rooms {
  rooms = [];
  users = [];

  addNewRoom(id, username, room) {
    if (this.rooms.length) {
      let roomNames = this.rooms.map((item) => item.name);
      if (roomNames.includes(room)) {
        return { message: "Room already exists" };
      } else {
        let roomObj = {
          name: room,
          room_owner: id,
          users: [],
          messages: [],
        };
        roomObj.users.push({ username, id });
        this.rooms.push(roomObj);
        this.users.push({ username, room, id });
        return { username, room, id };
      }
    } else {
      let roomObj = {
        name: room,
        room_owner: id,
        users: [],
        messages: [],
      };
      roomObj.users.push({ username, id });
      this.rooms.push(roomObj);
      this.users.push({ username, room, id });
      return { username, room, id };
    }
  }

  joinUser(id, username, room) {
    let userCheck = username;
    let userNames = this.users.map((item) => item.username);
    if (userNames.length) {
      if (userNames.includes(username)) {
        let randomNum = (Math.random() * 5).toString();
        let newUsername = `${username}_${randomNum.substr(
          randomNum.length - 4
        )}`;
        userCheck = newUsername;
      }
    }

    this.users.push({ id, username: userCheck, room });

    this.rooms.forEach((item) => {
      if (item.name == room) {
        item.users.push({ userCheck, id });
        console.log("testest: ", userCheck, id);
      }
    });
    return { username: userCheck, id, room };
  }

  writeMessageToRoom(room, username, id, message) {
    this.rooms.forEach((item) => {
      if (item.name == room) {
        item.messages.push({
          username,
          id,
          message,
          created_at: moment().format("DD/MM/YYYY hh:mm"),
        });
      }
    });
    let roomMessages = this.rooms.filter((item) => item.name == room);
    if (roomMessages.length) return roomMessages[0].messages;
    else return [];
  }

  getRoomMessages(room) {
    let filtered = this.rooms.filter((item) => item.name === room);
    if (filtered.length) {
      return filtered[0].messages;
    }
  }

  getRooms() {
    let filtered = this.rooms.map((item) => item.name);
    if (filtered.length) return filtered;
    else return null;
  }

  findRoom(id) {
    let filtered = this.users.filter((item) => item.id == id);
    if (filtered.length) {
      return filtered[0].room;
    }
  }
  findUser(id) {
    let filtered = this.users.filter((item) => item.id == id);
    if (filtered.length) return filtered[0].username;
  }

  getUsersFromRoom(room) {
    let filtered = this.users.filter((item) => item.room == room);

    console.log("users: ", filtered);
    if (filtered.length) return filtered.map((item) => item.username);
    else return [];
  }

  handleDisconnect(room, userID) {
    let closeRoom = false;
    let filteredUsers = this.users.filter((item) => item.id != userID);
    this.users = filteredUsers;
    this.rooms.forEach((item) => {
      if (item.name == room) {
        let tempUsers = item.users.filter((item) => item.id != userID);
        item.users = tempUsers;
        if (!tempUsers.length) closeRoom = true;
      }
    });
    if (closeRoom) {
      let tempRooms = this.rooms.filter((item) => item.name !== room);
      this.rooms = tempRooms;
    }
  }
}

module.exports = new Rooms();
