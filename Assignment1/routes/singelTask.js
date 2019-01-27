const express = require("express");
const router = express.Router();
const data = require("../data");
try {

    router.get("/:id", async (req, res) => {

        // console.log(req.params.id);

        let id = req.params.id;
        let error = false;
        let status;

        let getTask = await data.getTask(id);

        for (let prop in getTask) {
            if (prop.includes("message")) {
                status = 400;
                error = true;
                break;
            }
        }

        if (!error) {
            status = 200;
        }


        res.status(status).json(getTask);

        // res.status(200).json({"message":"Congrats your routes is connected"})
    });

    module.exports = router;
}
catch (e) {

}