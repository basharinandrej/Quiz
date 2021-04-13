import {FETCH_QUIZZES_ERROR, FETCH_QUIZZES_START, FETCH_QUIZZES_SUCCESS} from "../actions/actionType";

const initialState = {
    quizzes: [],
    isLoading: false,
    error: null
}

export default function quizReducer(state=initialState, action) {

    switch(action.type){
        case FETCH_QUIZZES_START:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_QUIZZES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quizzes: action.quizzes
            }
        case FETCH_QUIZZES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return {
                ...state
            }
    }
}