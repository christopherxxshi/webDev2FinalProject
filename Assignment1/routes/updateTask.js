const express = require("express");
const router = express.Router();
const data = require("../data");
try{

    router.patch("/:id",async(req,res)=>{

        // console.log(req.body.length);

        let task = req.body;
        let taskId = req.params.id;

        if(!data.isEmpty(task)){
            let status;
            let error = false;
    
            // console.log("task"+task);
    
            let changeTask = await data.updateTask(taskId, task);
    
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
    
        }
        else{
            res.status(400).json({message:"Request body is empty."});
        }

       
        // res.status(200).json({"message":"Congrats your routes is connected"})
    });

    module.exports = router;
}
catch(e){

}