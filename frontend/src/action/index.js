import data from "../api";
// import store from "../"

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
            userId : ""
        };

        dispatch({ type: "SIGN_OUT", payload: signOutUser });

    }
}

export const displayQuestions = () => {
    return async (dispatch) => {

        // console.log("display questions");

        let getQuestions = await data.get("/api/question");

        let allQuestions = [];

        for (let prop in getQuestions.data) {
            // allQuestions.push(getQuestions.data[prop]);
            for (let i = 0; i < getQuestions.data[prop].length; i++) {
                allQuestions.push(getQuestions.data[prop][i]);
            }
            // console.log(allQuestions);
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

        let insertQuestion = {
            title : questionDetails.title,
            desc : questionDetails.description
        }

        let addQuestion = await data.post(`/api/question/user/${userId}`,{
            title : questionDetails.title,
            desc : questionDetails.description
        });
        console.log(addQuestion);

    }
}

// export const getUserQuestions = ()=>{

// return async (dispatch)=>{

// }

// }


