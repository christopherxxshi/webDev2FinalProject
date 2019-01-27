const express = require("express");
const router = express.Router();
const data = require("../data");
try {

    router.post("/:id/comments", async (req, res) => {

        // console.log(req.params.id);
        // console.log("comment"+ data.isEmpty(req.body) );

        let taskId = req.params.id;
        // console.log(taskId);
        let comment = req.body;

        let status;
        let error = false;

        let addComment = await data.addComment(taskId, comment);
        // console.log(addComment);
        for (let prop in addComment) {
            if (prop.includes("message")) {
                status = 400;
                error = true;
                break;
            }
        }

        if (!error) {
            status = 200;
        }

        res.status(status).json(addComment);

        // res.status(200).json({"message":"Congrats your routes is connected"})
    });

    module.exports = router;
}
catch (e) {

}