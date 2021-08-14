const moment = require("moment");

class Rooms {
  rooms = [];

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
      return { username, room, id };
    }
  }

  joinUser(id, username, room) {
    let userCheck = username;
    this.rooms.forEach((item) => {
      if (item.name == room) {
        let tempUsers = item.users.map((item) => item.username);
        if (tempUsers.includes(username)) {
          let randomNum = (Math.random() * 5).toString();
          let newUsername = `${username}_${randomNum.substr(
            randomNum.length - 4
          )}`;
          userCheck = newUsername;
          item.users.push({ id, username: newUsername });
        } else {
          item.users.push({ username, id });
        }
      }
    });
    return { username: userCheck, id, room };
  }

  writeMessageToRoom(room, username, id, message) {
    this.rooms.forEach((item) => {
      if (item.name == room) {
        item.messages.push({ username, id, message });
      }
    });
    let roomMessages = this.rooms.filter((item) => item.name == room);
    return roomMessages[0].messages;
  }

  getUsers(room) {
    this.rooms.forEach((item) => {
      if (item.name == room) {
        return item.users;
      }
    });
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

  getUsersFromRoom(roomName) {
    let filteredRooms = this.rooms.filter((item) => item.name == roomName);

    if (filteredRooms.length) {
      let filteredUsers = filteredRooms[0].users.map((item) => item.username);
      return filteredUsers;
    } else return null;
  }
}

module.exports = new Rooms();
