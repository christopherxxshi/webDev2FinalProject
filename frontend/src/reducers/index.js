import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import questions from "./questions";

export default combineReducers({

    auth: authReducer,
    questions: questions

}); 