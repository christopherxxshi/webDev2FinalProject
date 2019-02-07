const express = require("express");
const router = express.Router();
const data = require("../data");
try {

    router.put("/:id", async (req, res) => {

        // console.log(req.body);

        let taskId = req.params.id;

        let task = req.body;


        let status;
        let error = false;

        let changeTask = await data.changeTask(taskId, task);

        // console.log(changeTask);

        for (let prop in changeTask) {
            if (prop.includes("message")) {
                status = 400;
                error = true;
                break;
            }
        }

        if (!error) {
            status = 200;
        }

        res.status(status).json(changeTask);



        // res.status(200).json({"message":"Congrats your routes is connected"})
    });

    module.exports = router;
}
catch (e) {

}