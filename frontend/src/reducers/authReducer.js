
export default (state = {}, action) => {


    switch (action.type) {

        case "SIGN_IN":

            var obj1 = action.payload;
            return { ...obj1 };

        case "SIGN_OUT":
            var obj = action.payload;
            return { ...obj };
            
        default:
            return state;
    }

}