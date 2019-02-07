const express = require("express");
const router = express.Router();
const data = require("../data");
try {

    router.get("/", async (req, res) => {

        
        console.log(req.query);

        let skip = req.query.skip;
        let take = req.query.take;

        // console.log(typeof skip);
        console.log("Number(skip)"+ skip );
        // console.log(typeof take);
        // console.log(  "Number(take)"+parseInt(take));
        // console.log( Number("gfchgjhb") );
        
        let skipNum = parseInt(skip);
        let takeNum = parseInt(take);

        // if (typeof Number(skip) != "number") {
        if (isNaN(skipNum) && skip != undefined) {                                                                //https://www.w3schools.com/jsref/jsref_isnan.asp
            res.status(400).json({ "message": "Value provided to Skip is not a Number." });
        }
        // else if (typeof Number(take) != "number") {
        else if (isNaN(takeNum) && take != undefined) {
            res.status(400).json({ "message": "Value provided to Take is not a Number." });
        }
        else if(takeNum > 100 || takeNum < 20){
            res.status(400).json({ "message": "Value provided to Take must be between 20 and 100." })
        }
        else {
            // console.log(req.query.skip);
            // console.log(req.query.take);

            // console.log("hi");

            let getDetails = await data.getAllTask(skip,take);
            // console.log(getDetails.length);

            // console.log(getDetails);

            res.status(200).json(getDetails);
        }

    });

    module.exports = router;
}
catch (e) {

}