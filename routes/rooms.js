const express = require("express");
const router = express.Router();

// const Rooms = require("../utils/roomsController");
const Rooms = require("../utils/roomsController");

router.get("/rooms", (req, res) => {
  return res.json({ data: Rooms.getRooms() });
});

router.get("/room-users", (req, res) => {
  return res.json({ data: Rooms.getUsersFromRoom(req.query.room || "") });
});

router.post("/rooms", (req, res) => {
  let result = Rooms.addNewRoom(req.body.room);
  if (result) return res.json({ data: Rooms.getRooms() });
  else
    return res
      .status(422)
      .json({ error: "Room with that name already exists" });
});

module.exports = router;
