const models = require('./data/models');
const imageModel = models.getModel('Image');
const questionModel = models.getModel('Question');
const userModel = models.getModel('User');
const redisClient = models.redisClient;

async function main() {
  await imageModel.deleteMany({}, function(err) {
    console.log("Images removed")
  });

  await questionModel.deleteMany({}, function(err) {
    console.log("Questions removed")
  });

  await userModel.deleteMany({}, function(err) {
    console.log("Users removed")
  });

  await redisClient.flushall(function (err, success) {
    console.log("Redis flushed");
  });

  console.log("Feel free to exit now.");
  return;
}

main();