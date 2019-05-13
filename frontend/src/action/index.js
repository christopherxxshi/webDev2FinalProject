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

        // user["notExist"] = true;

        await data.post("/api/user/", {
            username: user.name,
            imagePath: user.imgUrl,
            emailId: user.email,
            firebaseId: user.userId
        });


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

        for (let i = 0; i < getQuestions.data.length; i++) {
            allQuestions.push(getQuestions.data[i]);
        }

        // console.log(allQuestions);
        // let allQuestions = JSON.parser(JSON.stringify(getQuestions) );
        // console.log(allQuestions);

        // history.push("/");



        dispatch({ type: "DISPLAY_QUESTIONS", payload: allQuestions });

    }
}
export const searchLanguageQuestions = (language) => {
    return async (dispatch) => {


        let getQuestions = await data.get(`/api/question/language/${language}`);

        let allQuestions = [];



        for (let i = 0; i < getQuestions.data.length; i++) {
            allQuestions.push(getQuestions.data[i]);
        }





        dispatch({ type: "DISPLAY_QUESTIONS", payload: allQuestions });

    }
}

export const languageChange = (language) => {
    return async (dispatch) => {

        console.log(language);

        dispatch({ type: "LANGUAGE", payload: language });

    }
}

export const askQuestions = (authUser, questionDetails) => {
    return async (dispatch) => {
        let userId = authUser.userId
        console.log("ques.screenshotId: ", questionDetails);
        await data.post(`/api/question/user/${userId}`, {
            title: questionDetails.title,
            desc: questionDetails.description,
            language: questionDetails.language,
            screenshotId: questionDetails.screenshotId
        });
        history.push("/");
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
            desc: quesdata.description,
            language: quesdata.language
        });

        history.push("/userQuestions");
        dispatch({ type: "SINGLE_QUESTION", payload: updateQuestion.data });


    }
}


export const deleteUserQuestion = (quesdata) => {
    return async (dispatch) => {
        alert(quesdata);
        let deleteQuestion = await data.delete(`/api/question/${quesdata}`);

        console.log(deleteQuestion);

        history.push("/userQuestions");

        // dispatch({ type: "DELETE_QUESTION" });

    }
}

export const getSignleQuestion = (quesId) => {
    return async (dispatch) => {

        let getQuesDetail = await data.get(`api/question/${quesId}`);
        console.log("getSingleQuestion")
        console.log(getQuesDetail);

        dispatch({ type: "QUESTION", payload: getQuesDetail.data });

    }
}

export const getSignleQuestionUser = (quesId) => {
    return async (dispatch) => {

        let getQuesDetail = await data.get(`api/question/${quesId}`);
        console.log("getSingleQuestion")
        console.log(getQuesDetail);

        dispatch({ type: "SINGLE_QUESTION", payload: getQuesDetail.data });

    }
}

export const getAllImages = () => {
    return async (dispatch) => {
        let imageStrings = await data.get('api/questions/getAllImages');
        let imageStrs = [];

        for (let i = 0; i < imageStrings.data.length; i++) {
            imageStrs.push("data:image/jpeg;base64," + imageStrings.data[i]);
        }

        dispatch({ type: "DISPLAY_POSTS", payload: imageStrs })
    }
}

export const addComment = (quesId, comment) => {
    return async (dispatch) => {

        let addComment = await data.post(`api/question/${quesId}/comment`, {
            userId: comment.userId,
            comment: comment.comment
        });

        console.log(addComment);
        // history.push(`/singleQuestion/${quesId}`);

        dispatch({ type: "QUESTION", payload: addComment.data })
    }
}

export const updateQuestion = (quesId, updateDetails, userId) => {
    return async (dispatch) => {

        let obj = {};

        for (let prop in updateDetails) {
            obj[prop] = updateDetails[prop];
        }

        obj["userId"] = userId;

        // console.log(quesId);
        // console.log(updateDetails);

        let updateQuestion = await data.patch(`/api/question/${quesId}`, obj);

        dispatch({ type: "UPDATE_QUESTIONS", payload: updateQuestion.data });

    }
}

export const updateUpVote = (quesId, udateDetails, userId) => {
    return async (dispatch) => {

        let obj = {};

        for (let prop in udateDetails) {
            obj[prop] = udateDetails[prop];
        }

        console.log(userId);
        obj["userId"] = userId;

        data.post(`/api/question/votes/${quesId}`, obj);


        let getQuesDetail = await data.get(`api/question/${quesId}`);

        // console.log("upvoteids");

        // console.log(updatedQues);


        dispatch({ type: "QUESTION", payload: getQuesDetail.data });

    }
}

