"use strict";

const mongoose = require("mongoose");
const config = require("./config");

const DB_URL = config.serverUrl+config.database;

mongoose.connect(DB_URL, {
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.warn('cannot connected to database! ' + err)
    } else {
        console.log('connected to database: ' + DB_URL)
    }
});

const userSchema =  mongoose.Schema({
    _id:{type : String, 'require':true},
    username :{type:String, 'require':true},
    imagePath: String,
    languages: {type:[String], default: []}
});

const questionSchema = new mongoose.Schema({
    _id:{type : String, 'require':true},
    ownerId: {type:String, 'require':true},
    title : {type:String, 'require':true},
    desc : {type: String, 'require':true},
    language: {type:String, 'require':true},
    vote:{type:Number, 'require':true},
    comments: [{
        _id : {type:String, require:true},
        userId: {type:String, require:true},
        comment: {type:String, require:true},
    }]
});


mongoose.model('User', userSchema);
mongoose.model('Question', questionSchema);

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
};