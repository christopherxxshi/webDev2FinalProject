import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import questions from "./questions";
import question from "./question";

export default combineReducers({

    auth: authReducer,
    questions: questions,
    question : question

}); 