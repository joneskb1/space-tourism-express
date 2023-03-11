const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const getData = (req, res) => {
  const { name } = req.params;
  const data = dataObj[name];
  res.status(200).json(data);
};

app.get("/api/:name", getData);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log("server up"));
