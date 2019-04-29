const path = require("path");
const express = require("express");
const router = express.Router();


try {

    const constructMethod = app => {

        app.get("/", async (req, res) => {

            // console.log("hgvg");

            let filePath = await path.join(__dirname, "../views/main.html");

            res.status(200).sendFile(filePath);

        });

        app.get("*", async (req, res) => {

            // console.log("argtg");

            // res.status(404).json({message:"Page not found"});

            let filePath = await path.join(__dirname, "../views/pageNotFound.html");

            res.status(404).sendFile(filePath);

        });

        

    };

    module.exports = constructMethod;
    
}
catch (e) {
    throw console.log("Problem occured in Displaying Page.");
}

