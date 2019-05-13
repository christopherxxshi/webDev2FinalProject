const express = require("express");
const router = express.Router();
const data = require("../data");
const questions = data.questions;
const users = require("../data/users");
const nodemailer=require("nodemailer");

// Image handling
const images = data.images;

router.get('/:qId', async (req, res) => {
    console.log("in get");
    let qId = req.params.qId;
    try {
        let result = await questions.getQuestionById(qId);
        result["userDetail"] = await users.getUserById(result.ownerId);

        for (var i = 0; i < result.comments.length; i++) {
            const gettingData = await users.getUserById(result.comments[i].userId);
            console.log(gettingData);
            result.comments[i]["userDetails"] = gettingData;
        }

        if (result.screenshotId) {
            console.log("screenshotID found");
            result["screenshotData"] = await images.getImgById(result.screenshotId);
        }

        console.log("This is the res of get: ", result);
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});



router.post('/votes/:qId', async (req, res) => {
    try {
        console.log("votes");
        let fetchQuesition = await questions.getQuestionById(req.params.qId);
        let bodyData = req.body;
        if (bodyData.hasOwnProperty('upVote')) {

            if (fetchQuesition.upVoteIds.includes(bodyData.userId)) {
                res.status(200).json({ message: "Already Upvoted" });
            } else {
                console.log('Need to add to voted list');
                console.log(bodyData.userId);
                fetchQuesition.upVote = await (fetchQuesition.upVoteIds.length + 1);
                await fetchQuesition.upVoteIds.push(bodyData.userId);


                let upVoteAdded = {};
                upVoteAdded = await questions.updateQuestionByIdVotes(req.params.qId, fetchQuesition);
                // await users.getUserById(result.ownerId);

                let data1 = upVoteAdded;
                data1["userDetail"] = await users.getUserById(upVoteAdded.ownerId);

                upVoteAdded["userDetail"] = await users.getUserById(upVoteAdded.ownerId);
                console.log("fed up");
                console.log(data1);

                // for (var i = 0; i < upVoteAdded.comments.length; i++) {
                //     console.log("fed up 1");
                //     var gettingData = await users.getUserById(upVoteAdded.comments[i].userId);
                //     console.log(gettingData);
                //     upVoteAdded.comments[i].userDetails = gettingData;
                // }
                console.log("fed up 2");
                console.log(upVoteAdded);
                res.status(200).json(upVoteAdded);


                // res.redirect(`/api/question/${eq.params.qId}`);

            }

        } else {

            if (fetchQuesition.downVoteIds.includes(bodyData.userId)) {
                res.status(200).json({ message: "Already DownVoted" });
            } else {
                fetchQuesition.downVote = await (fetchQuesition.downVoteIds.length + 1);
                fetchQuesition.downVoteIds.push(bodyData.userId);
                var downVoteAdded = await questions.updateQuestionByIdVotes(req.params.qId, fetchQuesition);
                downVoteAdded["userDetail"] = await users.getUserById(downVoteAdded.ownerId);

                for (var i = 0; i < downVoteAdded.comments.length; i++) {
                    console.log(downVoteAdded.comments[i].userId);
                    var gettingData = await users.getUserById(downVoteAdded.comments[i].userId);
                    console.log(gettingData);
                    downVoteAdded.comments[i]["userDetails"] = gettingData;
                }
                console.log(downVoteAdded);
                res.status(200).json(downVoteAdded);
            }
        }
    } catch (e) {
        res.status(404).json({ error: "Error in Voting" });
    }
});


router.patch('/:qId', async (req, res) => {
    console.log("hello");
    let qId = req.params.qId;
    let updateData = req.body;
    try {
        let result = await questions.updateQuestionById(qId, updateData);
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({ error: e });
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

// POST /user/:userId
router.post('/user/:userId', async (req, res) => {
    console.log(req.params.userId);
    console.log(req.files);
    console.log(req.body.screenshot);
    let userId = req.params.userId;
    let data = req.body;
    console.log("data in user/uid POST: ", data);

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