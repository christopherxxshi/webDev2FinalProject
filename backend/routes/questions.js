const express = require("express");
const router = express.Router();
const data = require("../data");
const questions = data.questions;
const cors = require("cors");
const users = require("../data/users");
const nodemailer=require("nodemailer");

router.get('/:qId', async (req, res) => {
    let qId = req.params.qId;
    try {
        let result = await questions.getQuestionById(qId);
        result["userDetail"] = await users.getUserById(result.ownerId);
        for (var i = 0; i < result.comments.length; i++) {
            const gettingData = await users.getUserById(result.comments[i].userId);
            // console.log(gettingData);
            result.comments[i]["userDetails"] = gettingData;
        }

        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.patch('/:qId', async (req, res) => {
    let qId = req.params.qId;
    let updateData = req.body;
    try {
        let result = await questions.updateQuestionById(qId, updateData);
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/:qId/votes', async (req, res) => {
    try {
        let fetchQuesition = await questions.getQuestionById(req.params.qId);
        let bodyData = req.body;
        if (bodyData.hasOwnProperty('upVote')) {

            if (fetchQuesition.upVoteIds.includes(bodyData.userId)) {
                res.status(200).json({ message: "Already Upvoted" });
            } else {
                console.log('Need to add to voted list');
                console.log(bodyData.userId);
                const updated = await fetchQuesition.upVoteIds.push(bodyData.userId);
                console.log(updated);
                const upVoteAdded = await questions.updateQuestionByIdVotes(req.params.qId, fetchQuesition);
                res.status(200).json(upVoteAdded);
            }

        } else {

            if (fetchQuesition.downVoteIds.includes(bodyData.userId)) {
                res.status(200).json({ message: "Already DownVoted" });
            } else {
                const updated = fetchQuesition.downVoteIds.push(bodyData.userId);
                const downVoteAdded = await questions.updateQuestionByIdVotes(req.params.qId, fetchQuesition);
                res.status(200).json(downVoteAdded);
            }
        }
    } catch (e) {
        res.status(404).json({ error: "Error in Voting" });
    }
});

router.get('/language/:language', async (req, res) => {
    let language = req.params.language;
    try {
        let result = await questions.getQuestionByLanguage(language);
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.get('/', async (req, res) => {
    try {
        // let result = await questions.getAllQuestions();
        let result = await questions.getRecentQuestions();
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/user/:userId', async (req, res) => {
    console.log(req.params.userId);
    let userId = req.params.userId;
    let data = req.body;
    try {
        let result = await questions.addQuestion(userId, data);
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/:qId/comment/', async (req, res) => {
    let qId = req.params.qId;
    let commentData = req.body;
    let lastuser = "";

    try {
        let result = await questions.addCommentByQuestionId(qId, commentData);
        result["userDetail"] = await users.getUserById(result.ownerId);
        for (var i = 0; i < result.comments.length; i++) {
            const gettingData = await users.getUserById(result.comments[i].userId);
            console.log(gettingData);
            result.comments[i]["userDetails"] = gettingData;
            lastuser = result.comments[i]["userDetails"].username;
        }
        
//Sending notifications to the user who poster the question

let transporter =nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'askoverflow2019@gmail.com',
            pass: 'team9@cs554'
        }
    }
);

let reciptant = result["userDetail"].emailId;

let mail = {
    from:'askoverflow2019@gmail.com',
    to:`${reciptant}`,
    subject: `${lastuser} has commented`,
    text:`${lastuser} has commented to your question you have posted in askoverflow.com`

}
console.log("mail details",mail)
transporter.sendMail(mail,(err,info) => {

    if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }

});

        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.delete('/:qId/comment/:cId', async (req, res) => {
    let qId = req.params.qId;
    let cId = req.params.cId;
    try {
        let result = await questions.deleteCommentByCommentId(qId, cId);
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({ error: e });
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


router.get('/user/:userId', async (req, res) => {
    let userId = req.params.userId;
    try {
        let result = await questions.getQuestionsByOwnerId(userId);
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/uploadImg', cors(), async (req, res) => {
    console.log("HI this is req.files.imgFile", req.files.imgFile);
    let bitMap = fs.readFileSync(req.files.imgFile.path);
    // Convert to base64 for mongo storage
    let img64 = new Buffer.from(bitMap).toString('base64');
    try {
        let result = await images.addImg(img64);
        console.log("This is result: ", result);
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/resizeImg', cors(), async (req, res) => {
    console.log("proc cwd: ", process.cwd());
    await im.convert(
        [req.files.imgFile.path, '-resize', '1920x1080', process.cwd() + '/processed.jpg'],
        function (err, stdout) {
            if (err) throw err;
            console.log("im response: ", stdout);
        }
    );
    console.log("Done converting img");
    // let bitMap = fs.readFileSync(process.cwd() + '/processed.jpg');
    // // Convert to base64 for mongo storage
    // let img64 = new Buffer.from(bitMap).toString('base64');
    // try {
    //     let result =  await images.addImg(img64);
    //     console.log("This is result: ", result);
    //     res.status(200).json(result);
    // } catch (e) {
    //     res.status(404).json({error: e});
    // }
});

router.post('/search', async (req, res) => {
    let search = req.body.term;
    console.log("Search term", search)
    try {
        let result = await questions.getAllQuestionsBySearchCriteria(search);
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;