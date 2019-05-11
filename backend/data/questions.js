"use strict";
const uuid = require("uuid");
const models = require("./models");
const questionModel = models.getModel('Question');
const techTypes = require("./techTypes");
const redisClient = models.redisClient;

function convertQuestionId(id){
    return `question:${id}`;
}

async function deleteCacheData(id){
    let cacheId = convertQuestionId(id);
    try{
        if(await redisClient.existsAsync(cacheId)){
            await redisClient.delAsync(cacheId);
        }
    }catch(e){
        throw e;
    }

}
module.exports.addQuestion = async function (ownerId, questionData) {
    // console.log(questionData);
    if(ownerId === undefined || questionData.title === undefined || questionData.desc === undefined){
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
        time: new Date().getHours()+":"+new Date().getMinutes(),
        comments:[]
    });
    
    // const setInput = await redisClient.setAsync(newQuestion.id, JSON.stringify(newQuestion));
    // console.log(setInput);
    // const found = await redisClient.getAsync(newQuestion.id);
    // console.log(found);
    await newQuestion.save();
    return newQuestion;
};

module.exports.getQuestionById = async function (qId){
    if(qId === undefined){
      throw "Invalid params";
    }
    try{
        if(await redisClient.existsAsync(convertQuestionId(qId))){
            return JSON.parse(await redisClient.getAsync(convertQuestionId(qId)));
        }else{
            let result = await questionModel.findOne({_id:qId});
            if (result){
                await redisClient.setAsync(convertQuestionId(qId), JSON.stringify(result));
                return result;
            }else{
                throw `Can't find question id: ${qId}`;
            }
        }
    }catch (e) {
        throw e;
    }

};

module.exports.updateQuestionById = async function (qId, questionData){
    if(qId === undefined || Object.keys(questionData).length === 0){
       throw "Invalid params";
    }
    await deleteCacheData(qId);
    let result = await questionModel.updateOne({_id: qId}, {$set:questionData});
    if (result.matchedCount === 0){
        throw `Can't find question id: ${qId}`;
    }
    return await this.getQuestionById(qId);
};

module.exports.getAllQuestions = async function () {
    let result = await questionModel.find({});
    if(result && result.length > 0){
        let data = {};
        for(let i = 0; i < techTypes.length; i++){
            data[techTypes[i]] = [];
        }
        for( let i = 0; i < result.length; i++){
            if(!techTypes.includes(result[i].language)){
                data['Others'].push(result[i])
            }else{
                data[result[i].language].push(result[i]);
            }
        }
        return  data;
    }else{
        throw "can't find any questions";
    }
};

module.exports.getQuestionByLanguage  = async function (language){
    let result = await questionModel.find({language: language});
    if(!result || result.length ===  0){
        result  = []
    }
    return result;
};

module.exports.addCommentByQuestionId = async function (qId, commentData){
    if(qId === undefined || commentData.userId === undefined || commentData.comment === undefined){
        throw "Invalid params";
    }
    let newComment =  {
        _id:uuid.v4(),
        userId:commentData.userId,
        comment: commentData.comment
    };
    await deleteCacheData(qId);
    let result =  await questionModel.updateOne({_id: qId}, {$push:{comments: newComment}});
    if(result.matchedCount === 0){
        throw 'Question not found';
    }
    return await this.getQuestionById(qId);
};

module.exports.deleteCommentByCommentId = async function (qId, commentId){
    if(qId  === undefined || commentId === undefined){
        throw "Invalid params";
    }
    await deleteCacheData(qId);
    let result = await questionModel.updateOne({_id:qId}, {$pull:{comments:{_id:commentId}}});
    if(result.modifiedCount === 0){
        throw 'Question or comment not found';
    }
    return await this.getQuestionById(qId);
};

module.exports.getQuestionsByOwnerId = async function (ownerId) {
    if(ownerId === undefined){
        throw "Invalid params";
    }
    let result =  await questionModel.find({ownerId:ownerId});
    if (!result || result.length === 0){
        result = [];
    }
    return result;
};
