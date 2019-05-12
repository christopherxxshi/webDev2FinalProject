const express = require("express");
const router = express.Router();
const data = require("../data");
const questions = data.questions;
const images = data.images;
const fs = require("fs");
const cors = require('cors');
const im = require('imagemagick');

router.get('/:qId', async (req, res)=>{
    let qId = req.params.qId;
    try{
        let result = await questions.getQuestionById(qId);
        res.status(200).json(result);
    }catch (e) {
        res.status(404).json({error: e});
    }
});

router.patch('/:qId', async(req, res)=>{
    let qId = req.params.qId;
    let updateData = req.body;
    try{
        let result =  await questions.updateQuestionById(qId, updateData);
        res.status(200).json(result);
    }catch (e) {
        res.status(404).json({error: e});
    }
});

router.get('/language/:language', async (req, res) => {
    let language = req.params.language;
    try{
        let result = await questions.getQuestionByLanguage(language);
        res.status(200).json(result);
    }catch (e) {
        res.status(404).json({error: e});
    }
});

router.get('/', async (req, res) =>{
    try{
        // let result = await questions.getAllQuestions();
        let result = await questions.getRecentQuestions();
        res.status(200).json(result);
    }catch (e) {
        res.status(404).json({error: e});
    }
});

router.post('/user/:userId', async (req, res)=>{
    console.log(req.params.userId);
    let userId = req.params.userId;
    let data = req.body;
    try{
        let result =  await questions.addQuestion(userId, data);
        res.status(200).json(result);
    }catch (e) {
        res.status(404).json({error: e});
    }
});

router.post('/:qId/comment/', async (req, res)=>{
    let qId = req.params.qId;
    let commentData = req.body;

    try{
        let result =  await questions.addCommentByQuestionId(qId, commentData);
 
        res.status(200).json(result);
    }catch (e) {
        res.status(404).json({error: e});
    }
});

router.delete('/:qId/comment/:cId', async (req, res)=>{
    let qId = req.params.qId;
    let cId = req.params.cId;
    try{
        let result =  await questions.deleteCommentByCommentId(qId, cId);
        res.status(200).json(result);
    }catch (e) {
        res.status(404).json({error: e});
    }
});

router.delete('/:qId', async (req, res) => {
    let qId = req.params.qId;
    // console.log(qId);

    try {
        await questions.getQuestionById(qId);

        try {
            //remove the qustions
            let rdata = await questions.deleteQuestion(qId);
            
            res.status(200).json(rdata);

        } catch (e) {
            res.status(500).json({
                error: "Question not found / Error in deleting"
            });
        }

    } catch (e) {
        res.status(404).json({
            error: "Question not found"
        });
    }
});


router.get('/user/:userId', async(req, res)=>{
    let userId = req.params.userId;
    try{
        let result =  await questions.getQuestionsByOwnerId(userId);
        res.status(200).json(result);
    }catch (e) {
        res.status(404).json({error: e});
    }
});

router.post('/search', async(req, res)=>{
    let search = req.body.term;
    console.log("Search term", search)
    try{
        let result =  await questions.getAllQuestionsBySearchCriteria(search);
        res.status(200).json(result);
    }catch (e) {
        res.status(404).json({error: e});
    }
});

router.post('/uploadImg', cors(), async (req, res) => {
    let bitMap = fs.readFileSync(req.files.imgFile.path);
    // Convert to base64 for mongo storage
    let img64 = new Buffer.from(bitMap).toString('base64');
    try {
        let result =  await images.addImg(img64);
        console.log("This is result: ", result);
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({error: e});
    }
});

router.post('/resizeImg', cors(), async (req, res) => {
    try {
        let srcText = req.files.imgFile.path;
        let dstText = process.cwd() + "/result.jpg"
        await im.resize({
            srcPath: srcText,
            dstPath: dstText,
            width: 1920,
            height: 1080
            },
            function(err, stdout) {
                if (err) throw err;
            }
        );
        let bitMap = fs.readFileSync(process.cwd() + '/result.jpg');
        // Convert to base64 for mongo storage
        let img64 = new Buffer.from(bitMap).toString('base64');
        try {
            let result =  await images.addImg(img64);
            console.log("This is result: ", result);
            res.status(200).json(result);
        } catch (e) {
            res.status(404).json({error: e});
        }
    } catch (error) {
        console.error(error);
    }
});

router.get('/getAllImages', cors(), async (req, res) => {
    try {
        let imgArr = await images.getAllImgs();
        res.status(200).json(imgArr);
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;