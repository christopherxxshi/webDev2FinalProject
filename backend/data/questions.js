"use strict";
const uuid = require("uuid");
const models = require("./models");
const questionModel = models.getModel('Question');
const techTypes = require("./techTypes");


module.exports.addQuestion = async function (ownerId, questionData) {
    if(ownerId === undefined || questionData.title === undefined || questionData.desc === undefined){
        throw "Invalid params";
    }
    let newQuestion = await new questionModel({
        _id: uuid.v4(),
        ownerId: ownerId,
        title: questionData.title,
        desc: questionData.desc,
        language: questionData.language,
        vote: 0,
        comments:[]
    });
    await newQuestion.save();
    return newQuestion;
};

module.exports.getQuestionById = async function (qId){
    if(qId === undefined){
      throw "Invalid params";
    }
    let result = await questionModel.findOne({_id:qId});
    if (result){
      return result;
    }else{
      throw `Can't find question id: ${qId}`;
    }
};

module.exports.updateQuestionById = async function (qId, questionData){
    if(qId === undefined || Object.keys(questionData).length === 0){
       throw "Invalid params";
    }
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
