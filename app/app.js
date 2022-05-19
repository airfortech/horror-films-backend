const express = require("express");
const app = express();
const cors = require("cors");
const { frontEndHost } = require("./config");

app.use(
  cors({
    origin: frontEndHost,
  })
);
app.use(express.json());

app.use("/api", require("./routes/api"));

module.exports = app;
