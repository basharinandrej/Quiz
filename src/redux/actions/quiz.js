import axios from "axios";
import {baseUrl} from "../../helpers/baseUrl";
import {
        FETCH_QUIZZES_START,
        FETCH_QUIZZES_SUCCESS,
        FETCH_QUIZZES_ERROR
} from "./actionType";

export function fetchQuizzes() {
    return async dispatch => {
        dispatch(fetchQuizzesStart())
        try {
            const response = await axios.get(`${baseUrl}/quizes.json`)
            const quizzes = []

            Object.keys(response.data).forEach(key => {
                quizzes.push({
                    id: key,
                    title: response.data[key][0].question
                })
            })
            dispatch(fetchQuizzesSuccess({quizzes}))
        } catch (e) {
            console.log('Error in fetchQuizzes', e)
            dispatch(fetchQuizzesError({error: e}))
        }
    }
}

export function fetchQuizzesStart() {
    return {
        type: FETCH_QUIZZES_START
    }
}

export function fetchQuizzesSuccess(payload) {
    return {
        type: FETCH_QUIZZES_SUCCESS,
        quizzes: payload.quizzes
    }
}

export function fetchQuizzesError(payload) {
    return {
        type: FETCH_QUIZZES_ERROR,
        error: payload.error
    }
}