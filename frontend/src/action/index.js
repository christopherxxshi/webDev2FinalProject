import data from "../api";

export const signIn = (user) => {

    return async (dispatch) => {

        // console.log(user);

        if (user.email) {
            user.emailVerified = true;
        }

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
            imgUrl: ""
        };

        dispatch({ type: "SIGN_OUT", payload: signOutUser });

    }
}

export const displayQuestions = () => {
    return async (dispatch) => {

        console.log("display questions");

        let getQuestions = await data.get("/api/question");

        let allQuestions = [];

        for(let prop in getQuestions.data){
            // allQuestions.push(getQuestions.data[prop]);
            for(let i =0;i<getQuestions.data[prop].length;i++){
                allQuestions.push(getQuestions.data[prop][i]);
            }
            console.log(allQuestions);
        }

        // console.log(allQuestions);
        // let allQuestions = JSON.parser(JSON.stringify(getQuestions) );
        // console.log(allQuestions);
        
       
        
        

        dispatch({ type: "DISPLAY_QUESTIONS", payload: allQuestions });

    }
}


