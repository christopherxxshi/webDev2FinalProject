
export default (state = {}, action) => {


    switch (action.type) {

        case "DISPLAY_QUESTIONS":

            // console.log("action reducer")
            // console.log(action.payload);
            var obj = {};
            obj["question"] = action.payload;
            return obj;

        case "UPDATE_QUESTIONS":

            // console.log(state);
            let arr = state.question.map(question => {
                if (question._id === action.payload._id) {
                    return action.payload;
                }
                else {
                    return question;
                }
            });
            console.log(arr);
            return { question: arr };

        default:
            return state;
    }

}