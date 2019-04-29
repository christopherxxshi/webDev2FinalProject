const express = require("express");
const configRoutes = require("./routes");
const path = require('path');
// const configRoutes = require("./routes");
const app = express();
const product = require("./routes/index");



app.use("/public",express.static(__dirname+"/public/"));
// app.use("/css",express.static(__dirname+"/node_modules/bootstrap/dist/css/"));
// app.use("/js",express.static(__dirname+"/node_modules/bootstrap/js/"));
// app.use("/images",express.static(__dirname+"/views/image"));
// app.use("/css",express.static(__dirname+"/views/main.scss"));

// console.log("1");

// app.use("/", product);

configRoutes(app);
// console.log("1");
app.listen(3000, (res,err) => {
  if(err) throw console.log('Problem in connecting to Localhost');
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});