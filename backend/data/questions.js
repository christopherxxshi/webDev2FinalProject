"use strict";

const uuid = require("uuid");
const models = require("./models");
const userModel = models.getModel('User');
const questionModel = models.getModel('Question');
const techTypes = require("./techTypes");


module.exports.addQuestion = async function (userId, questionData) {
    try{
        if(userId === undefined || questionData.title === undefined || questionData.desc === undefined){
            return {success: false, desc: "Invalid params"};
        }
        let newQuestion = await new questionModel({
            _id: uuid.v4(),
            ownerId: userId,
            title: questionData.title,
            desc: questionData.desc,
            vote: 0,
            comments:[]
        });
        await newQuestion.save();
        return {success: true, desc: newQuestion};

    }catch (e) {
        return {success: false, desc: e};
    }
};

module.exports.getAllQuestions = async function () {
    try{
        let result = await questionModel.find({});
        if(result && result.length > 0){
            let data = {};
            for(let i = 0; i < techTypes.length; i++){
                data[techTypes[i]] = [];
            }
            for( let i = 0; i < result.length; i++){
                if(!techTypes.includes(result[i].language)){
                    data['others'].push(result[i])
                }else{
                    data[result[i].language].append(result[i])
                }
            }
            return {success: false, data: data};
        }else{
            return {success: false, desc: "can't find any questions"};
        }
    }catch (e) {
        return {success: false, desc: e};
    }
};

