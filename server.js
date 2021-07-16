const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const rooms = require("./routes/rooms");

const PORT = 5000 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", rooms);

const server = app.listen(PORT, () =>
  console.log("Server is running on port: ", PORT)
);

require("./socket_config/socket")(server);
