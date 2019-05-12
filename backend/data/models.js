"use strict";
const bluebird = require('bluebird');
const redis = require('redis');
const mongoose = require("mongoose");
const config = require("./config");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const DB_URL = config.mongoServerUrl + config.mongoDatabase;
const redisClient = redis.createClient(config.redisPort, config.redisUrl);

redisClient.on('connect', () => {
    console.log(`connected to redis: ${config.redisUrl}/${config.redisPort}`);
});
redisClient.on('error', (err) => {
    console.log('cannot connect to Redis! ' + err);
});

mongoose.connect(DB_URL, {
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.warn('cannot connected to database! ' + err)
    } else {
        console.log('connected to database: ' + DB_URL)
    }
});

const userSchema = mongoose.Schema({
    _id: { type: String, 'require': true },
    username: { type: String, 'require': true },
    imagePath: String,
    emailId: String,
    firebaseId: { type: String, 'require': true },
    languages: { type: [String], default: [] }
});

const questionSchema = new mongoose.Schema({
    _id: { type: String, 'require': true },
    ownerId: { type: String, 'require': true },
    title: { type: String, 'require': true },
    desc: { type: String, 'require': true },
    language: { type: String, 'require': true },
    upVote: { type: Number, 'require': true },
    downVote: { type: Number, 'require': true },
    date: { type: String, 'require': true },
    time: { type: String, 'require': true },
    comments: [{
        _id: { type: String, require: true },
        userId: { type: String, require: true },
        comment: { type: String, require: true },
        date: { type: String, 'require': true },
        time: { type: String, 'require': true }
    }],
    upVoteIds: [],
    downVoteIds: []
});

const imageSchema = new mongoose.Schema({
    _id: { type: String, 'require': true },
    img: { type: String, 'require': true }
})

mongoose.model('User', userSchema);
mongoose.model('Question', questionSchema);
mongoose.model('Image', imageSchema);

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    },
    redisClient
};