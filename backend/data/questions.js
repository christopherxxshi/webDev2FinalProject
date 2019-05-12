"use strict";
const uuid = require("uuid");
const models = require("./models");
const questionModel = models.getModel('Question');
const techTypes = require("./techTypes");
const redisClient = models.redisClient;

function convertQuestionId(id) {
    return `question:${id}`;
}

async function deleteCacheData(id) {
    let cacheId = convertQuestionId(id);
    try {
        if (await redisClient.existsAsync(cacheId)) {
            await redisClient.delAsync(cacheId);
        }
    } catch (e) {
        throw e;
    }

}
module.exports.addQuestion = async function (ownerId, questionData) {
    // console.log(questionData);
    if (ownerId === undefined || questionData.title === undefined || questionData.desc === undefined) {
        throw "Invalid params";
    }

    let newQuestion = await new questionModel({
        _id: uuid.v4(),
        ownerId: ownerId,
        title: questionData.title,
        desc: questionData.desc,
        language: questionData.language,
        upVote: 0,
        downVote: 0,
        date: new Date().toLocaleDateString(),
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        comments: [],
        upVoteIds: [],
        downVoteIds: []
    });

    const found = await redisClient.getAsync(newQuestion.id)
    if (found == null) {

        try {
            const setInput = await redisClient.setAsync(newQuestion.id, JSON.stringify(newQuestion));
            // console.log(setInput);
            if (setInput == "OK") {
                const some = await redisClient.lpushAsync("ids", newQuestion.id);
                console.log(some);
            }
        } catch (e) {
            console.log("Error occurred while saving data to redis");
        }
    } else {
        const some = await redisClient.lpushAsync("ids", newQuestion.id);
    }
    // const found = await redisClient.getAsync(newQuestion.id);
    // console.log(found);
    await newQuestion.save();
    return newQuestion;
};


module.exports.getQuestionById = async function (qId) {
    if (qId === undefined) {
        throw "Invalid params";
    }
    try {
        if (await redisClient.existsAsync(convertQuestionId(qId))) {
            return JSON.parse(await redisClient.getAsync(convertQuestionId(qId)));
        } else {
            let result = await questionModel.findOne({ _id: qId });
            if (result) {
                await redisClient.setAsync(convertQuestionId(qId), JSON.stringify(result));
                return result;
            } else {
                throw `Can't find question id: ${qId}`;
            }
        }

    } catch (e) {
        throw e;
    }

};

module.exports.updateQuestionById = async function (qId, questionData) {
    console.log(questionData);
    console.log(qId);
    if (qId === undefined || Object.keys(questionData).length === 0) {
        throw "Invalid params";
    }
    
    await deleteCacheData(qId);
    let result = await questionModel.updateOne({ _id: qId }, { $set: questionData });
    if (result.matchedCount === 0) {
        throw `Can't find question id: ${qId}`;
    }
    return await this.getQuestionById(qId);
};


//Getting recent question from redis
module.exports.getRecentQuestions = async function () {

    var historyArray = [];
    var reply = await redisClient.lrangeAsync("ids", 0, 19);

    if (reply.length == 0) {
        return historyArray;
    } else {
        for (var i = 0; i < reply.length; i++) {
            var push = await redisClient.getAsync(reply[i]);
            await historyArray.push(JSON.parse(push));
        }
        return historyArray
    }
};



module.exports.getAllQuestions = async function () {
    let result = await questionModel.find({});
    if (result && result.length > 0) {
        let data = {};
        for (let i = 0; i < techTypes.length; i++) {
            data[techTypes[i]] = [];
        }
        for (let i = 0; i < result.length; i++) {
            if (!techTypes.includes(result[i].language)) {
                data['Others'].push(result[i])
            } else {
                data[result[i].language].push(result[i]);
            }
        }
        return data;
    } else {
        throw "can't find any questions";
    }
};

module.exports.getQuestionByLanguage = async function (language) {
    let result = await questionModel.find({ language: language });
    if (!result || result.length === 0) {
        result = []
    }
    return result;
};

module.exports.addCommentByQuestionId = async function (qId, commentData) {
    if (qId === undefined || commentData.userId === undefined || commentData.comment === undefined) {
        throw "Invalid params";
    }
    let newComment = {
        _id: uuid.v4(),
        userId: commentData.userId,
        comment: commentData.comment,
        date: new Date().toLocaleDateString(),
        time: new Date().getHours() + ":" + new Date().getMinutes()
    };


    // console.log(newComment);
    await deleteCacheData(qId);
    let result = await questionModel.updateOne({ _id: qId }, { $push: { comments: newComment } });
    if (result.matchedCount === 0) {
        throw 'Question not found';
    }
    const mongoData = await this.getQuestionById(qId);
    // console.log("He... "+mongoData);
    // const gotData = await JSON.stringify(mongoData.comments);
    // console.log("Hello "+gotData);

    
    // const redisUpdateComment = await redisClient.setAsync(JSON.stringify(qId), JSON.stringify({'comments': gotData}));
    // console.log('Hello'+ await redisClient.getAsync(qId));
    // console.log('Helo End');
    // console.log(redisUpdateComment);

    const deleteData = await redisClient.del(qId);
    const putData = await redisClient.setAsync(qId, JSON.stringify(mongoData));
    // console.log(await redisClient.getAsync(qId));
    // console.log('Helo End');

    return await this.getQuestionById(qId);
};

module.exports.deleteCommentByCommentId = async function (qId, commentId) {
    if (qId === undefined || commentId === undefined) {
        throw "Invalid params";
    }
    await deleteCacheData(qId);
    let result = await questionModel.updateOne({ _id: qId }, { $pull: { comments: { _id: commentId } } });
    if (result.modifiedCount === 0) {
        throw 'Question or comment not found';
    }
    return await this.getQuestionById(qId);
};

module.exports.deleteQuestion = async function (qid) {
    if (qid === undefined) {
        throw "Invalid parameter"
    }

    let deletedDataRedis = await redisClient.del(qid);

    const deletedInfo = await questionModel.findByIdAndRemove({_id: qid}, function(err) {
        if(!err){
            // console.log("Deleted");
        } else {
            // console.log("Not Deleted");
        }
    });

    return await this.getQuestionById(qid);

}

module.exports.getQuestionsByOwnerId = async function (ownerId) {
    if (ownerId === undefined) {
        throw "Invalid params";
    }
    let result = await questionModel.find({ ownerId: ownerId });
    if (!result || result.length === 0) {
        result = [];
    }
    return result;
};

module.exports.getAllQuestionsBySearchCriteria = async function (searchText) {
    let result = undefined;
    if(searchText) {
        const regex = new RegExp(escapeReg(searchText), 'gi');
        console.log("regex",regex);
    
    console.log("searchText",searchText);
    console.log("regex",regex);

     result = await questionModel.find({"title":regex});
    }
    if (result && result.length > 0) {
        // let data = {};
        // for (let i = 0; i < techTypes.length; i++) {
        //     data[techTypes[i]] = [];
        // }
        // for (let i = 0; i < result.length; i++) {
        //     if (!techTypes.includes(result[i].language)) {
        //         data['Others'].push(result[i])
        //     } else {
        //         data[result[i].language].push(result[i]);
        //     }
        // }
        return result;
    } else {
        throw "can't find any questions";
    }
};

const escapeReg= function(text) {
    console.log("inside escape",text)
    return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};