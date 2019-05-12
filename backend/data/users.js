"use strict";
const uuid = require("uuid");
const models = require("./models");
const userModel = models.getModel('User');
const redisClient = models.redisClient;

function convertUserId(id) {
    return `user:${id}`;
}

// module.exports.getUserById = async function (id) {
//     if (typeof id !== 'string') {
//         throw "Invalid params";
//     }
//     try {
//         if (await redisClient.existsAsync(convertUserId(id))) {
//             return JSON.parse(await redisClient.getAsync(convertUserId(id)))
//         } else {
//             let result = await userModel.findOne({ _id: id });
//             if (result) {
//                 await redisClient.setAsync(convertUserId(id), JSON.stringify(result));
//                 return result;
//             } else {
//                 throw `Cannot find ${id}`;
//             }
//         }
//     } catch (e) {
//         throw e;
//     }
// };

module.exports.getUserById = async function (id) {
    // console.log("hi");
    if (typeof id !== 'string') {
        throw "Invalid params";
    }
    try {
        
        // if (await redisClient.existsAsync(convertUserId(id))) {
        //     return JSON.parse(await redisClient.getAsync(convertUserId(id)))
        // } else {
            let result = await userModel.findOne({ firebaseId: id });
            // console.log("hey");
            // console.log(result);
            if (result) {
                await redisClient.setAsync(convertUserId(id), JSON.stringify(result));
                return result;
            } else {
                // throw `Cannot find ${id}`;
                return null;
            }
        // }
    } catch (e) {
        throw e;
    }
};



module.exports.addUser = async function (data) {
    if (typeof data === "undefined" || typeof data == null || typeof data.username === "undefined") {
        throw "invalid params";
    }
    if (typeof data.languages === "undefined") {
        data.languages = []
    }
    let newUser = await new userModel({
        '_id': uuid.v4(),
        'username': data.username,
        'imagePath': data.imagePath,
        'languages': data.languages,
        'emailId': data.emailId,
        'firebaseId': data.firebaseId,
        'imagePath': data.imagePath
    });
    try {
        let userExist = await this.getUserById(data.firebaseId);
        console.log(userExist);
        if (userExist) {
            return { message: "User Already Exist" };
        }
        await newUser.save();
        return newUser;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports.updateUserById = async function (id, data) {
    if (typeof id !== 'string' || typeof data === "undefined") {
        throw "invalid params";
    }
    try {
        if (await redisClient.existsAsync(convertUserId(id))) {
            await redisClient.delAsync(convertUserId(id));
        }
    }
    catch (e) {
        throw e;
    }
    let result = await userModel.updateOne({ '_id': id }, { $set: data });
    if (result.n > 0) {

        return await this.getUserById(id);
    } else {
        throw `can't find ${id} in database or invalid params`;
    }
};
