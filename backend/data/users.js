"use strict";
const uuid = require("uuid");
const models = require("./models");
const userModel = models.getModel('User');

module.exports.getUserById = async function (id){
    if(typeof id !== 'string'){
        throw "Invalid params";
    }
    let result = await userModel.findOne({_id:id});
    if(result){
        return result;
    }else{
        throw `Cannot find ${id}`;
    }
};

module.exports.addUser =  async function(data){
    if(typeof data === "undefined" || typeof data == null || typeof data.username === "undefined"){
        throw "invalid params";
    }
    if(typeof data.languages === "undefined"){
        data.languages = []
    }
    let newUser = await new userModel({
        '_id':uuid.v4(),
        'username': data.username,
        'imagePath': data.imagePath,
        'languages': data.languages
    });
    try{
        await newUser.save();
        return newUser;
    }catch (e) {
        throw e;
    }
};

module.exports.updateUserById = async function (id, data){
    if(typeof id !== 'string' || typeof data === "undefined" ){
        throw  "invalid params";
    }

    let result = await userModel.updateOne({'_id':id},{$set:data});
    if(result.n > 0){
        return await this.getUserById(id);
    }else{
        throw `can't find ${id} in database or invalid params`;
    }
};
