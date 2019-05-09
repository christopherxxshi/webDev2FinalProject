
export default (state = {}, action) => {


    switch (action.type) {

        case "DISPLAY_QUESTIONS":

            var obj = action.payload;
            return { ...obj };

        default:
            return state;
    }

}