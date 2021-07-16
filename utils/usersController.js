class Users {
  users = [];

  addNewUser(id, username, room) {
    let filtered = this.users.map((item) => item.username);
    if (filtered.length) {
      if (filtered.includes(username)) {
        let randomNum = (Math.random() * 5).toString();
        let newUsername = `${username}_${randomNum.substr(
          randomNum.length - 4
        )}`;
        this.users.push({ id, username: newUsername, room });
        return { id, username: newUsername, room };
      } else this.users.push({ id, username, room });
    } else {
      this.users.push({ id, username, room });
      return { id, username, room };
    }
  }

  getUsers() {
    return this.users;
  }

  getUsersFromRoom(roomName) {
    let filteredRooms = this.users.filter((item) => item.room == roomName);

    if (filteredRooms.length) {
      let filteredUsers = filteredRooms.map((item) => item.username);
      return filteredUsers;
    } else return null;
  }
}

module.exports = new Users();
