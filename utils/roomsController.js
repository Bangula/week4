class Rooms {
  rooms = [];

  addNewRoom(roomName) {
    if (this.rooms.includes(roomName)) return null;
    else {
      this.rooms.push(roomName);
      return this.rooms;
    }
  }
  getRooms() {
    return this.rooms;
  }
}

module.exports = new Rooms();
