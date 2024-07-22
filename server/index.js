const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000 || MONGO_URI;

const MONGO_URI =
  "mongodb+srv://spiros111:abcd1234@cluster0.xxgxk37.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Couldn't connect to MongoDB", err));

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ maxAge: 86400, origin: "https://todo-app-server-five.vercel.app/" }));

const todoItemRoute = require("./routes/todoItems");

app.use("/", todoItemRoute);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
