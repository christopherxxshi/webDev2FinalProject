"use strict";
const userData = require('./users');
const questionData = require('./questions');
const imageData = require('./images');
const credentials = require('./credentials');

module.exports = {
    users: userData,
    questions: questionData,
    images: imageData,
    credentials:credentials
}