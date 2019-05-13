
export default (state = {}, action) => {


    switch (action.type) {

        case "QUESTION":

            let obj = {};
            obj = action.payload;
            return { ...obj };
        default:
            return state;
    }

}