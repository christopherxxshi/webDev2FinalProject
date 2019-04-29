"use strict";
const uuid = require("uuid");
const models = require("./models");
const userModel = models.getModel('User');

module.exports.getUserById = async function (id){
    if(typeof id !== 'string'){
        return {success: false, desc: "Invalid params"}
    }
    let result = await userModel.findOne({_id:id});
    if(result){
        return {success : true, data: result};
    }else{
        return {success : false, data: `Cannot find ${id}`};
    }
};

module.exports.addUser =  async function(data){
    if(typeof data === "undefined" || typeof data == null || typeof data.username === "undefined"){
        return { success : false, desc: "invalid params"}
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
        return {success: true, data: newUser};
    }catch (e) {
        return {success: false, desc: e};
    }
};

module.exports.updateUserById = async function (id, data){
    if(typeof id !== 'string' || typeof data === "undefined" ){
        return { success : false, desc: "invalid params"}
    }

    let result = await userModel.updateOne({'_id':id},{$set:data});
    if(result.n > 0){
        return { success : true , data : await this.getUserById(id)};
    }else{
        return { success : false, desc: `can't find ${id} in database or invalid params`};
    }
};
