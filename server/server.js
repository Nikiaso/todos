const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const axios = require("axios");
const app = express();
const path = require("path");
app.use(cors({ methods: ["GET", "PATCH"] }));

app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 3000;
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname1, "/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API connected...");
  });
}
app.listen(PORT, console.log(`Server is running on port ${PORT}`.yellow.bold));
