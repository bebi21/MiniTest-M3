const express = require("express");
const app = express();
const port = 5200;
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const data = JSON.parse(fs.readFileSync("backup-todos.json"));

app.get("/api/v1/todos", (req, res) => {
  console.log(typeof req.query.per_page);
  const dataCurrent = JSON.parse(fs.readFileSync("backup-todos.json"));
  const newData = dataCurrent.filter((item, index) => index <= 3);

  res.status(200).json({
    render: newData,
    allToDo: dataCurrent,
  });
});

app.post("/api/v1/todos", (req, res) => {
  data.unshift(req.body);
  fs.writeFileSync("backup-todos.json", JSON.stringify(data));
  res.status(200).json(data);
});

app.delete("/api/v1/todos/:id", (req, res) => {
  let newData = data.filter((item) => item.id != req.params.id);
  fs.writeFileSync("backup-todos.json", JSON.stringify(newData));

  res.status(200).json(newData);
});

app.patch("/api/v1/todos/:id", (req, res) => {
  const id = req.params.id;
  const itemReq = req.body;
  let index = data.findIndex((item) => item.id == id);
  data[index] = itemReq;
  fs.writeFileSync("backup-todos.json", JSON.stringify(data));
  res.status(200).json(data);
});

app.patch("/api/v1/todos/compalete/:id", (req, res) => {
  const id = req.params.id;
  const itemReq = req.body;
  let index = data.findIndex((item) => item.id == id);
  data[index] = itemReq;
  fs.writeFileSync("backup-todos.json", JSON.stringify(data));
  res.status(200).json(data);
});

app.delete("/api/v1/todos/remove/all", (req, res) => {
  data.length = 0;

  fs.writeFileSync("backup-todos.json", JSON.stringify(data));

  res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
