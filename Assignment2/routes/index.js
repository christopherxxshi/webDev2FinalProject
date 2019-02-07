const path = require("path");
const express = require("express");
const router = express.Router();


try {

    const constructMethod = app => {

        app.use("/", async (req, res) => {

            let filePath = await path.join(__dirname, "../views/main.html");

            res.sendFile(filePath);

        });

        app.use("*", (req, res) => {

            res.status(404).json({message:"Page not found"});

        });

    };

    module.exports = constructMethod;
    
}
catch (e) {
    throw console.log("Problem occured in Displaying Page.");
}

