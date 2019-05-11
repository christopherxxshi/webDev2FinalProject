import data from "../api";
// import store from "../"
import history from "../history";

export const signIn = (user) => {

    return async (dispatch) => {

        // console.log(user);

        if (user.email) {
            user.emailVerified = true;
        }

        console.log(user);

        user["notExist"] = true;

        dispatch({ type: "SIGN_IN", payload: user });

    }

}

export const signOut = () => {
    return async (dispatch) => {

        console.log("signOut");
        var signOutUser = {
            name: "",
            email: "",
            emailVerified: "",
            imgUrl: "",
            userId: ""
        };

        dispatch({ type: "SIGN_OUT", payload: signOutUser });

    }
}

export const displayQuestions = () => {
    return async (dispatch) => {

        // console.log("display questions");

        let getQuestions = await data.get("/api/question");

        let allQuestions = [];

        // console.log(getQuestions);

        for(let i = 0;i<getQuestions.data.length;i++){
            allQuestions.push(getQuestions.data[i]);
        }

        // console.log(allQuestions);
        // let allQuestions = JSON.parser(JSON.stringify(getQuestions) );
        // console.log(allQuestions);





        dispatch({ type: "DISPLAY_QUESTIONS", payload: allQuestions });

    }
}

export const askQuestions = (authUser, questionDetails) => {
    return async (dispatch) => {

        // console.log(questionDetails);
        // console.log(authUser);

        let userId = authUser.userId

        // let insertQuestion = {
        //     title: questionDetails.title,
        //     desc: questionDetails.description
        // }

         await data.post(`/api/question/user/${userId}`, {
            title: questionDetails.title,
            desc: questionDetails.description
        });


        history.push("/");
        // console.log(addQuestion);

    }
}

export const getUserQuestions = (userId) => {

    return async (dispatch) => {

        // console.log(userId);

        let Questions = await data.get(`/api/question/user/${userId}`);

        let length = Questions.data.length;
        let userQuestions = [];
        for (let i = 0; i < length; i++) {
            let obj = {};
            obj["title"] = Questions.data[i]["title"];
            obj["quesId"] = Questions.data[i]["_id"];
            obj["description"] = Questions.data[i]["desc"];
            obj["ownerId"] = Questions.data[i]["OwnerId"];
            obj["vote"] = Questions.data[i]["vote"];
            obj["comments"] = Questions.data[i]["comments"];
            obj["date"] = Questions.data[i]["date"];
            obj["time"] = Questions.data[i]["time"];
            obj["answers"] = Questions.data[i]["comments"].length;
            userQuestions.push(obj);
        }

        // console.log(userQuestions);

        dispatch({ type: "DISPLAY_QUESTIONS", payload: userQuestions });

    }

}

export const updateUserQuestion = (quesdata) => {
    return async (dispatch) => {

        // let updateObject = {
        //     "title": quesdata.title,
        //     "desc": quesdata.description,
        //     "language": quesdata.language
        // }

        let updateQuestion = await data.patch(`/api/question/${quesdata.quesId}`, {
            title: quesdata.title,
            desc: quesdata.description
            // "language": quesdata.language
        });

        console.log(updateQuestion);

    }
}


export const deleteUserQuestion = (quesdata) => {
    return async (dispatch) => {

    }
}

export const getSignleQuestion = (quesId) => {
    return async (dispatch) => {

        let getQuesDetail = await data.get(`api/question/${quesId}`);
        console.log(getQuesDetail);

        dispatch({ type: "SINGLE_QUESTION", payload: getQuesDetail.data });

    }
}


