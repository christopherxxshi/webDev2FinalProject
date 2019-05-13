const multer = require('multer');
const uuid = require("uuid/v4");
const models = require("./models");
const imageModel = models.getModel('Image');

async function getImgById(id) {
  if(typeof id !== 'string'){
    throw "Invalid params when trying to getImgById";
  }
  try {
    let result = await imageModel.findById(id, function (err, imgData) {
      return imgData
    });
    if (result) {
      return result.img;
    } else {
      throw `Can't find image with id ${id}`;
    }
  } catch (e) {
    throw e;
  }
}

async function addImg(data) {
  if (data === undefined) {
    throw "Image needs to be not null";
  }
  try {
    newId = uuid();
    let newImg = new imageModel({
      _id: newId,
      img: data
    });
    await newImg.save(function (err) {
      if (err) throw err;
    });
    return newId;
  } catch (error) {
    throw error;
  }
}

async function getAllImgs() {
  try {
    let results = await imageModel.find({}, function(err, imgs) {
      let imgArr = [];
      for (let i = 0;i<imgs.length ;i++) {
          imgArr.push(imgs[i].img);
      }
    });
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports.addImg = addImg;
module.exports.getImgById = getImgById;
module.exports.getAllImgs = getAllImgs;