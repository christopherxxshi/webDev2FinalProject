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

let requestNumber = 0;
let obj = {};



app.use(                                                                //https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express
  async function (req, res, next) {
    // return url.format({
    //   protocol: req.protocol,
    //   host: req.get('host'),
    //   pathname: req.originalUrl
    // });

    let entireUrl = await url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl
    });

    let data = req.body;

    console.log("\n---Logger 1---");
    // console.log("Requested Body:" + data );
    console.log("Requested Body:" + JSON.stringify(data));
    console.log("Requested Method : " + req.method);
    console.log("Requested Url:" + entireUrl);

    requestNumber += 1;

    console.log("---Logger 2---");
    console.log("Total Requested:" + requestNumber);
    if (obj[entireUrl]) {
      obj[entireUrl] = obj[entireUrl] + 1;
    }
    else {

      obj[entireUrl] = 1;
    }

    for(let prop in obj){
      console.log("Requested URL:" + prop);
    console.log("Count:" + obj[prop] );
    }
    
    next();
  });


app.use("/api/tasks", taskAPI);



// configRoutes(app);


app.listen(3000, (res, err) => {
  if (err) throw console.log('Problem in connecting to Localhost');
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});