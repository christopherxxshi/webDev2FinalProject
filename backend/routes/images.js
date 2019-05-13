const express = require('express');
const router = express.Router();
const data = require("../data");
const images = data.images;
const fs = require("fs");
const cors = require('cors');
const im = require('imagemagick');

router.post('/uploadImg', cors(), async (req, res) => {
  let bitMap = fs.readFileSync(req.files.imgFile.path);
  // Convert to base64 for mongo storage
  let img64 = new Buffer.from(bitMap).toString('base64');
  try {
      let result =  await images.addImg(img64);
    //   console.log("uploaded image:"+result)
      console.log(result.toString());
      //res.status(200).json({"id":result});
      res.status(200).send({imgId: result});
  } catch (e) {
      res.status(404).json({error: e});
  }
});

router.post('/resizeImg', cors(), async (req, res) => {
  try {
      let srcText = req.files.imgFile.path;
      let dstText = process.cwd() + "/result.jpg"
      // ImageMagick command to resize to at max 1080p
      // Keeping original ratio
      await im.resize({
          srcPath: srcText,
          dstPath: dstText,
          width: 1920,
          height: 1080
          },
          function(err, stdout) {
              if (err) throw err;
          }
      );
      let bitMap = fs.readFileSync(process.cwd() + '/result.jpg');
      // Convert to base64 for mongo storage
      let img64 = new Buffer.from(bitMap).toString('base64');
      try {
          let result =  await images.addImg(img64);
          res.send(result);
      } catch (e) {
          res.status(404).json({error: e});
      }
  } catch (error) {
      console.error(error);
  }
});

router.get('/getAllImages', cors(), async (req, res) => {
  try {
      let imgArr = await images.getAllImgs();
      res.status(200).json(imgArr);
  } catch (e) {
      res.status(404).json({error: e});
      console.error(e);
  }
});

module.exports = router;