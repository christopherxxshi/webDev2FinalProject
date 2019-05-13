import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import questions from "./questions";
import question from "./question";
import singleQuestion from "./singleQuestion";
import language from "./language";


export default combineReducers({

    auth: authReducer,
    questions: questions,
    question: question,
    singleQuestion: singleQuestion,
    language: language
}); 