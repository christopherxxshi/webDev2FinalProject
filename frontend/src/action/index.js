import axios from "axios";

export const signIn = (user) =>{

return async (dispatch) =>{

    // console.log(user);

    if(user.email){
        user.emailVerified = true;
    }

    user["notExist"] = true; 

    dispatch({ type: "SIGN_IN", payload: user });

} 

}

export const signOut = () =>{
    return async (dispatch) =>{

        console.log("signOut");
        var signOutUser = {
            name : "",
            email:"",
            emailVerified : "",
            imgUrl : ""
        };

        dispatch({type : "SIGN_OUT",payload:signOutUser});

    }
}


