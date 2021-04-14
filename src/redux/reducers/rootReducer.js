import {combineReducers} from 'redux'
import quizzesReducer from './quizzes'
import {quizReducer} from "./quiz";

export default combineReducers({
    quizzes: quizzesReducer,
    quiz: quizReducer
})