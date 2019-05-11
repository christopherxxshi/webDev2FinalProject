
export default (state = {}, action) => {


    switch (action.type) {

        case "DISPLAY_QUESTIONS":

            // console.log("action reducer")
            // console.log(action.payload);
            var obj = {};
            obj["question"] = action.payload;
            return obj;

        default:
            return state;
    }

}