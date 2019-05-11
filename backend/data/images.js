const multer = require('multer');
const config = require("./config");
const uuid = require("uuid/v4");
const models = require("./models");
const imageModel = models.getModel('Image');

module.exports = {
  getImgById = async function (id) {
    if(typeof id !== 'string'){
      throw "Invalid params when trying to getImgById";
    }
    try {
      let result = await imageModel.findOne({
        id_: id
      });
      if (result) {
        console.log(result);
        return result;
      } else {
        throw `Can't find image with id ${id}`;
      }
    } catch (e) {
      throw e;
    }
  },

  addImg = async function (data) {
    if (data === undefined) {
      throw "Image needs to be not null";
    }
    console.log("got to addImg");
    newId = uuid();
    let newImg = new imageModel({
      _id: newId,
      img: data.img
    });
    await newImg.save(function (err) {
      if (err) throw err;
    });
    return getImgById(newId);
  },

  resizeImg = function (data) {
    
  }
}