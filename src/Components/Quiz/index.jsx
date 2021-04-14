import React from 'react'
import './index.css'
import FinishedQuiz from "../FinishedQuiz/FinishedQuiz";
import ActiveQuiz from "./ActiveQuiz/ActiveQuiz";
import {Loader} from "../Loader/Loader";
import {connect} from 'react-redux'
import {
    fetchQuizById,
    onClickRightAnswer, setAnswerStateError,
    setAnswerStateSuccess, setDefaultStateCurrentQuiz,
    setFinishedAction,
    setNextQuestion
} from "../../redux/actions/quiz";

class Quiz extends React.Component{

    async componentDidMount() {
        this.props.fetchQuizById(this.props.idQuiz)
    }

    isFinishedQuiz = () => {
        return this.props.currentQuestion + 1 === this.props.quiz.length
    }

    clickAnswerHandler = answerId => {
        if (this.props.answerState) {
            if (this.props.answerState[Object.keys(this.props.answerState)] === 'success') {
                return
            }
        }

        const question = this.props.quiz[this.props.currentQuestion]
        const rightAnswer = question.rightAnswerId
        const results = this.props.results

        if (answerId === rightAnswer) {
            if (!results[question.id]) {
                results[question.id] = 'success'
                this.props.onClickRightAnswer(results)
            }

            this.props.setAnswerStateSuccess({[answerId]: 'success'})

            const intervalTransferQuestion = window.setTimeout(() => {
                if(this.isFinishedQuiz()) {
                    this.props.setFinished()
                }
                this.props.setNextQuestion()
                clearTimeout(intervalTransferQuestion)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.props.setAnswerStateError({[answerId]: 'error'}, results)
        }
    }

    onClickResetStateHandler = () => {
        this.props.setDefaultStateCurrentQuiz()
    }

    renderContentQuiz() {
        return this.props.isFinished
            ? <FinishedQuiz
                result={this.props.results}
                quiz={this.props.quiz}
                onResetState={this.onClickResetStateHandler}
            />
            : <ActiveQuiz
                question={this.props.quiz[this.props.currentQuestion].question}
                currentQuestion={this.props.currentQuestion + 1}
                totalQuestion={this.props.quiz.length}
                answers={this.props.quiz[this.props.currentQuestion].answers}
                onClickAnswerHandler={this.clickAnswerHandler}
                answerState={this.props.answerState}
            />
    }

    render() {
        return(
            this.props.isLoading || !this.props.quiz.length
                ? <Loader />
                : this.renderContentQuiz()
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        currentQuestion: state.quiz.currentQuestion,
        isFinished: state.quiz.isFinished,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quizItem,
        isLoading: state.quiz.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        onClickRightAnswer: results => dispatch(onClickRightAnswer(results)),
        setFinished: () => dispatch(setFinishedAction()),
        setNextQuestion: () => dispatch(setNextQuestion()),
        setAnswerStateSuccess: answerState => dispatch(setAnswerStateSuccess(answerState)),
        setAnswerStateError: (answerState, results) => dispatch(setAnswerStateError(answerState, results)),
        setDefaultStateCurrentQuiz: () => dispatch(setDefaultStateCurrentQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)