
export default (state = {}, action) => {


    switch (action.type) {

        case "LANGUAGE":

            var obj = {
                language: action.payload
            };
            return { ...obj };


        default:
            return state;
    }

}