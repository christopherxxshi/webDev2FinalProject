const users = require('../backend/data/users');

const questions = require('../backend/data/questions');

async function main() {

    // POSTING User

    var seedUsers = [
        {
            "languages": [],
            "username": "Harish Indalkar",
            "imagePath": "https://lh5.googleusercontent.com/-Ko4hh4hg_4U/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcQuZycuXzAPk9xENvJ3ij3OPYhvA/mo/photo.jpg",
            "emailId": "harishindalkar.hi@gmail.com",
            "firebaseId": "ggrq5EF4CNWuSYqrDBrWFMG8KFl2"
        },
        {
            "languages": [],
            "username": "Ur MeanStack",
            "imagePath": "https://lh6.googleusercontent.com/-_yF5nHEDmxU/AAAAAAAAAAI/AAAAAAAAAAg/10MGtJG4yog/photo.jpg",
            "emailId": "urmeanstack@gmail.com",
            "firebaseId": "cETMijjBN1dPBAacslqORdJUbax1"
        }
    ];

    for (var i = 0; i < seedUsers.length; i++) {
        await users.addUser(seedUsers[i]);
    }

    //POSTING QUESTIONS
    var seedQuestions = [
        {
            "upVoteIds": [],
            "downVoteIds": [],
            "ownerId": "ggrq5EF4CNWuSYqrDBrWFMG8KFl2",
            "title": "Need to change image on hover for images in a grid",
            "desc": "I have created a grid of images for my site. I created the grid in in my style sheet and then did the images with links in html. I would like to now make it where when I mouse over one of the images, it swaps to another image. I have 18 images, so that is 18 hovers. This is the css that I have used:\n.column22 {\n  float: left;\n  max-width: 20%;\n  min-width: 300px;\n  padding: 5px;\n}\n.row22::after {\n  content: \"\";\n  clear: both;\n  display: table;\n}",
            "language": "HTML",
            "upVote": 0,
            "downVote": 0,
            "comments": [],
            "screenshotId": null
        },
        {
            "upVoteIds": [],
            "downVoteIds": [],
            "ownerId": "cETMijjBN1dPBAacslqORdJUbax1",
            "title": "Javascript forEach - how to loop an object?",
            "desc": "How can I use forEach to loop an object?\nFor instance:\nvar dataset = {\n    \"data\" : {\n        \"particles\" : {},\n        \"no2\" : {},\n        \"timestamp\" : {}\n    }\n};\n\nJS:\ndataset.data.forEach(function(field, index) {\n    console.log(field);\n});\nERROR:\nUncaught TypeError: dataset.data.forEach is not a function;\nAny ideas?",
            "language": "JavaScript",
            "upVote": 0,
            "downVote": 0,
            "comments": [],
            "screenshotId": null
        }
    ];

    await questions.addQuestion("ggrq5EF4CNWuSYqrDBrWFMG8KFl2", seedQuestions[0]);
    await questions.addQuestion("cETMijjBN1dPBAacslqORdJUbax1", seedQuestions[1]);

    var seedQuestionsWithComment = [
        {
            "userId": "cETMijjBN1dPBAacslqORdJUbax1",
            "comment": "There are multiple ways of doing this. You can do it with javascript/jquery or you can do it with CSS too.\n.Standard{\ndisplay:inline-block;\n}\n.column22:hover .Standard{\ndisplay:none;\n}\n\n.ShowOnHover{\ndisplay:none;\n}\n.column22:hover .ShowOnHover{\ndisplay:inline-block;\n}\n\n<div class=\"row22\">\n<div class=\"column22\">\n<a href=\"https://www.allegrodanceboutique.com/ambassadors/isabella-shaker\">\n<img class=\"Standard\" style=\"width: 100%;\" src=\"https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg\" />\n<img class=\"ShowOnHover\" style=\"width: 100%;\" src=\"https://ichef.bbci.co.uk/images/ic/208x117/p0792vnb.jpg\" />\n</a></div>\n\nHere I have both images in same <a>. En depending on hover or not, I hide/show the images. (Sorry for the bad naming of the classes, I did it to make it more clear for you)\n\nYou should know that if you do it this way, all images will be loaded on page. If they are very big, you may not want this, because it will take som time."
        },
        {
            "userId": "ggrq5EF4CNWuSYqrDBrWFMG8KFl2",
            "comment": "You need to use a for loop instead.for of or for in are good candidates .forEach is not going to work here...\n\nconst dataset = {\n    \"data\" : {\n        \"particles\" : {},\n        \"no2\" : {},\n        \"timestamp\" : {}\n    }\n};\n\n// for in\nfor (const record in dataset.data) {\n  if (dataset.data[record]) {\n    console.log(record);\n  }\n}\n\n// for of\nfor (const record of Object.keys(dataset.data)) {\n  if (record) {\n    console.log(record);\n  }\n}"
        }
    ];

    const qIds = await questions.getAllQuestions();
    const one = qIds.Others[0]._id;
    const two = qIds.JavaScript[0]._id;

    questions.addCommentByQuestionId(one, seedQuestionsWithComment[0]);
    questions.addCommentByQuestionId(two, seedQuestionsWithComment[1]);

    console.log("Successfully Seeded the file...!!!");

}

main();

