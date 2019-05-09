const users = require('../backend/data/users');

const questions = require('../backend/data/questions');

async function main() {

    // POSTING User

    var seedUsers = [
        {
            "username": "Harry Potter",
            "imagePath": "",
            "languages": ["Java"]
        },
        {
            "username": "John Snow",
            "imagePath": "",
            "languages": ["Java", "Python", "C++", "JavaScript"]
        },
        {
            "username": "Peter Parker",
            "imagePath": "",
            "languages": ["Swift", "JavaScript", "Ruby", "C", "HTML", "CSS"]
        },
        {
            "username": "John Doe",
            "imagePath": "",
            "languages": ["Ruby", "CSS", "Objective-C", "TypeScript"]
        },
        {
            "username": "Mary Swift",
            "imagePath": "",
            "languages": ["Java", "C++", ""]
        }
    ]

    for (var i = 0; i < seedUsers.length; i++) {
        await users.addUser(seedUsers[i]);
    }


    var seedQuestions = [
        {
            title: "What is the use of strict in ES7?",
            desc: "I'm trying to learn ES7 but don't know the exact use of strict!!!",
            language: "JavaScript"
        },
        {
            title: "How do JavaScript closures work?",
            desc: "How would you explain JavaScript closures to someone with a knowledge of the concepts they consist of (for example functions, variables and the like), but does not understand closures themselves? I have seen the Scheme example given on Wikipedia, but unfortunately it did not help.",
            language: "JavaScript"
        },
        {
            title: "Get the length of a String",
            desc: "How do you get the length of a String? For example, I have a variable defined like: var test1: String = \"Scott\" However, I can't seem to find a length method on the string.",
            language: "Swift"
        },
        {
            title: "What does the explicit keyword mean?",
            desc: "What does the explicit keyword mean in C++?",
            language: "C++"
        },
        {
            title: "How to horizontally center a <div>?",
            desc: "How can I horizontally center a <div> within another <div> using CSS? <div id=\"outer\"><div id=\"inner\">Foo foo</div></div>",
            language: "HTML"
        }
    ]


    questions.addQuestion("R4y9Jry1oPdDycBVnBokZZUt9Zo1", seedQuestions[0]);
    questions.addQuestion("qo3rbPgWfSYR8ClzpdrtcH6jKIi2", seedQuestions[1]);
    questions.addQuestion("iISMcVjw2zO0YgKssnNeUTenehk1", seedQuestions[2]);
    questions.addQuestion("R4y9Jry1oPdDycBVnBokZZUt9Zo1", seedQuestions[3]);
    questions.addQuestion("iISMcVjw2zO0YgKssnNeUTenehk1", seedQuestions[4]);




}

main();

