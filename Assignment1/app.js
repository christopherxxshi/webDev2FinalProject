"use strict"
const express = require("express");
const configRoutes = require("./routes");
const path = require('path');
const bodyParser = require("body-parser");
var url = require('url');
// const bodyParser = require("body-parser");
// const configRoutes = require("./routes");
const app = express();
const taskAPI = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));






app.use(                                                                //https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express
async function (req,res,next) {
  // return url.format({
  //   protocol: req.protocol,
  //   host: req.get('host'),
  //   pathname: req.originalUrl
  // });
  let data =  await url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });

  console.log("Requested Path:"+data);
  console.log("Requested Path"+data.protocol)
  console.log("Requested Path"+data.pathname)
  next();
});


app.use("/api/tasks",taskAPI);



// configRoutes(app);


app.listen(3000, (res,err) => {
  if(err) throw console.log('Problem in connecting to Localhost');
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});