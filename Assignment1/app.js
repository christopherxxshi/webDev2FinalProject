"use strict"
const express = require("express");
const configRoutes = require("./routes");
const path = require('path');
const bodyParser = require("body-parser");
// const configRoutes = require("./routes");
const app = express();
const taskAPI = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/tasks",taskAPI);

// configRoutes(app);


app.listen(3000, (res,err) => {
  if(err) throw console.log('Problem in connecting to Localhost');
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});