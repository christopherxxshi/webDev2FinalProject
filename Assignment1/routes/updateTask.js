const express = require("express");
const router = express.Router();

try{

    router.patch("/:id",async(req,res)=>{

        console.log(req.body);

        res.status(200).json({"message":"Congrats your routes is connected"})
    });

    module.exports = router;
}
catch(e){

}