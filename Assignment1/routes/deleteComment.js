const express = require("express");
const router = express.Router();

try{

    router.delete("/:taskId/:commentId",async(req,res)=>{

        console.log(req.params.taskId);
        console.log(req.params.commentId);
        // console.log(req.body);

        res.status(200).json({"message":"Congrats your routes is connected"})
    });

    module.exports = router;
}
catch(e){

}