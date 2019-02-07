const express = require("express");
const router = express.Router();
const data = require("../data");

try {

    router.delete("/:taskId/:commentId", async (req, res) => {

        // console.log(req.params.taskId);
        // console.log(req.params.commentId);
        // console.log(req.body);

        let error = false;
        let status;

        let taskId = req.params.taskId;
        let commentId = req.params.commentId;

        // console.log(taskId);
        // console.log(commentId);

        let removeComment = await data.removeComment(taskId, commentId);

        for (let prop in removeComment) {
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

        // console.log("Completed");
        res.status(status).json(removeComment)
    });

    module.exports = router;
}
catch (e) {

}