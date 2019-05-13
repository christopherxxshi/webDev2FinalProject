const express = require("express");
const router = express.Router();
const data = require("../data");
const questions = data.questions;
const users = require("../data/users");

// Image handling
const images = data.images;

router.get('/:qId', async (req, res) => {
    let qId = req.params.qId;
    try {
        let result = await questions.getQuestionById(qId);

        result["userDetail"] = await users.getUserById(result.ownerId);

        if (result.screenshotId) {
            result["screenshotData"] = await images.getImgById(result.screenshotId);
        }

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

// POST /user/:userId
router.post('/user/:userId', async (req, res) => {
    console.log(req.params.userId);
    console.log(req.files);
    console.log(req.body.screenshot);
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

    try {
        let result = await questions.addCommentByQuestionId(qId, commentData);





        result["userDetail"] = await users.getUserById(result.ownerId);

        for (var i = 0; i < result.comments.length; i++) {
            const gettingData = await users.getUserById(result.comments[i].userId);
            console.log(gettingData);
            result.comments[i]["userDetails"] = gettingData;
        }

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