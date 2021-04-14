import axios from "axios";
import {baseUrl} from "../../helpers/baseUrl";
import {
    CLICK_RIGHT_ANSWER,
    FETCH_QUIZ_BY_ID_ERROR,
    FETCH_QUIZ_BY_ID_START,
    FETCH_QUIZ_BY_ID_SUCCESS,
    IS_FINISHED_QUIZ, SET_ANSWER_STATE_ERROR, SET_ANSWER_STATE_SUCCESS, SET_DEFAULT_STATE_CURRENT_QUIZ,
    SET_NEXT_QUESTION
} from "./actionType";

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizByIdStart())
        const quiz = []

        try {
            const response = await axios.get(`${baseUrl}/quizes/${quizId}.json`)

            quiz.push(...response.data)
            dispatch(fetchQuizByIdSuccess({quiz}))
        } catch (e) {
            dispatch(fetchQuizByIdError())
            console.log('Error in componentDidMount', e)
        }
    }
}

export function fetchQuizByIdStart() {
    return {
        type: FETCH_QUIZ_BY_ID_START
    }
}

export function fetchQuizByIdSuccess(payload) {
    return {
        type: FETCH_QUIZ_BY_ID_SUCCESS,
        quiz: payload.quiz
    }
}

export function fetchQuizByIdError(e) {
    return {
        type: FETCH_QUIZ_BY_ID_ERROR,
        error: e
    }
}

export function onClickRightAnswer(payload) {
    return {
        type: CLICK_RIGHT_ANSWER,
        results: payload
    }
}

export function setFinishedAction() {
    return {
        type: IS_FINISHED_QUIZ
    }
}

export function setNextQuestion() {
    return {
        type: SET_NEXT_QUESTION
    }
}

export function setAnswerStateSuccess(payload) {
    return {
        type: SET_ANSWER_STATE_SUCCESS,
        answerState: payload
    }
}

export function setAnswerStateError(answerState, results) {
    return {
        type: SET_ANSWER_STATE_ERROR,
        answerState: answerState,
        results: results
    }
}

export function setDefaultStateCurrentQuiz() {
    return {
        type: SET_DEFAULT_STATE_CURRENT_QUIZ
    }
}








