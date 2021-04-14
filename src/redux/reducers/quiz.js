import {
    CLICK_RIGHT_ANSWER,
    FETCH_QUIZ_BY_ID_ERROR,
    FETCH_QUIZ_BY_ID_START,
    FETCH_QUIZ_BY_ID_SUCCESS,
    IS_FINISHED_QUIZ,
    SET_ANSWER_STATE_ERROR,
    SET_ANSWER_STATE_SUCCESS,
    SET_DEFAULT_STATE_CURRENT_QUIZ,
    SET_NEXT_QUESTION
} from "../actions/actionType";

const initialState = {
    isLoading: false,
    quizItem: [],
    error: null,
    results: {},
    currentQuestion: 0,
    isFinished: false,
    answerState: {}
}

export function quizReducer(state=initialState, action) {

    switch(action.type){
        case FETCH_QUIZ_BY_ID_START:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_QUIZ_BY_ID_SUCCESS:
            return {
                ...state,
                quizItem: action.quiz,
                isLoading: false
            }
        case FETCH_QUIZ_BY_ID_ERROR:
            return {
                ...state,
                error: action.error
            }
        case CLICK_RIGHT_ANSWER:
            return {
                ...state,
                results: action.results
            }
        case IS_FINISHED_QUIZ:
            return {
                ...state,
                isFinished: true
            }
        case SET_NEXT_QUESTION:
            return {
                ...state,
                currentQuestion: state.currentQuestion + 1,
                answerState: {}
            }
        case SET_ANSWER_STATE_SUCCESS:
            return {
                ...state,
                answerState: action.answerState
            }
        case SET_ANSWER_STATE_ERROR:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            }
        case SET_DEFAULT_STATE_CURRENT_QUIZ:
            return {
                ...state,
                results: {},
                currentQuestion: 0,
                isFinished: false,
                answerState: {}
            }
        default:
            return {
                ...state
            }
    }
}