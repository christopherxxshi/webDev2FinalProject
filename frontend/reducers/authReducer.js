
export default (state = {}, action) => {


    switch (action.type) {

        case "SIGN_IN":

            var obj = action.payload;
            return { ...obj };

        case "SIGN_OUT":
            var obj = action.payload;
            return { ...obj };
            
        default:
            return state;
    }

}