const express = require("express");
const router = express.Router();

try{

    router.get("/",async(req,res)=>{

        console.log("Hi");
        res.status(200).json({"message":"Congrats your routes is connected"})
    });

    module.exports = router;
}
catch(e){

}