const images = require('./data/images');
const questions = require('./data/questions');
const users = require('./data/users');

async function main() {
  // Make user Gib Gab
  let newUser = {
    username: "Gib Gab",
    imagePath: 'https://avatars3.githubusercontent.com/u/22773701?s=460&v=4',
    languages: [],
    emailId: "hello@world.com",
    firebaseId: "-1"
  }
  const gibGab = await users.addUser(newUser);
  console.log("gibgab: ", gibGab);
  // Gib Gab asks a question
  let newQuestion = {
    ownerId: gibGab._id,
    title: "Understanding slice notation",
    desc: "I need a good explanation (references are a plus) on Python's slice notation. \
       To me, this notation needs a bit of picking up. \
       It looks extremely powerful, but I haven't quite got my head around it.",
    language: "Python"
  }
  const q1 = await questions.addQuestion(newQuestion);
  console.log("q1: ", q1);

  // Add user GVR
  newUser = {
    username: "GvRossum",
    imagePath: 'https://www.python.org/static/community_logos/python-powered-h-140x182.png',
    languages: [],
    emailId: "hello@world.com",
    firebaseId: "-1"
  }
  const GvRossum = await users.addUser(newUser);
  let newComment = {
    userId: GvRossum._id,
    comment: "It's pretty simple really: \
       \
      a[start:stop]  # items start through stop-1 \
      a[start:]      # items start through the rest of the array \
      a[:stop]       # items from the beginning through stop-1 \
      a[:]           # a copy of the whole array \
       \
      There is also the step value, which can be used with any of the above: \
        \
      a[start:stop:step] # start through not past stop, by step \
       \
      The key point to remember is that the :stop value represents the first value that is not in the selected slice. So, the difference between stop and start is the number of elements selected (if step is 1, the default). \
       \
      The other feature is that start or stop may be a negative number, which means it counts from the end of the array instead of the beginning. So: \
       \
      a[-1]    # last item in the array \
      a[-2:]   # last two items in the array \
      a[:-2]   # everything except the last two items \
       \
      Similarly, step may be a negative number: \
       \
      a[::-1]    # all items in the array, reversed \
      a[1::-1]   # the first two items, reversed \
      a[:-3:-1]  # the last two items, reversed \
      a[-3::-1]  # everything except the last two items, reversed \
       \
      Python is kind to the programmer if there are fewer items than you ask for. For example, if you ask for a[:-2] and a only contains one element, you get an empty list instead of an error. Sometimes you would prefer the error, so you have to be aware that this may happen."
  }
  // GVR himself answers my question
  await questions.addCommentByQuestionId(q1._id, newComment);
}

main();