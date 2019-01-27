const express = require("express");
const router = express.Router();
const data = require("../data");

try {

    router.post("/", async (req, res) => {

        let task = req.body;
        let error = false;
        let status;
        let createTask = await data.createTask(task);

        // console.log(createTask);
        for (let prop in createTask) {
            // console.log(prop);
            if (prop.includes("message")) {
                // res.status(400).json(createTask);
                status = 400;
                error = true;
                break;
            }
        }

        if (!error) {
            status = 200;
        }

        // if (createTask.hasOwnProperty("message")) {
        //     res.status(400).json(createTask);
        // }
        // else {
        res.status(status).json(createTask);
        // }


    });

    module.exports = router;
}
catch (e) {

}