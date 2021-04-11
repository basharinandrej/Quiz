import React from 'react'
import './index.css'
import FinishedQuiz from "../FinishedQuiz/FinishedQuiz";
import ActiveQuiz from "./ActiveQuiz/ActiveQuiz";
import axios from "axios";
import {Loader} from "../Loader/Loader";
import {baseUrl} from "../../helpers/baseUrl";

class Quiz extends React.Component{
    state = {
        results: {},
        currentQuestion: 0,
        isFinished: false,
        answerState: {},
        isLoading: true,
        quiz: []
    }

    async componentDidMount() {
        const quiz = []
        try {
            const response = await axios.get(`${baseUrl}/quizes/${this.props.idQuiz}.json`)

            quiz.push(...response.data)
            this.setState({
                quiz,
                isLoading: false
            })
        } catch (e) {
            console.log('Error in componentDidMount', e)
        }
    }

    isFinishedQuiz = () => {
        return this.state.currentQuestion + 1 === this.state.quiz.length
    }

    clickAnswerHandler = answerId => {
        if (this.state.answerState) {
            if (this.state.answerState[Object.keys(this.state.answerState)] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.currentQuestion]
        const rightAnswer = question.rightAnswerId
        const results = this.state.results

        if (answerId === rightAnswer) {
            if (!results[question.id]) {
                results[question.id] = 'success'
                this.setState({
                    results
                })
            }

            this.setState({
                answerState: {[answerId]: 'success'}
            })

            const intervalTransferQuestion = window.setTimeout(() => {
                if(this.isFinishedQuiz()) {
                    this.setState({
                        isFinished: true
                    })
                }
                this.setState({
                    currentQuestion: this.state.currentQuestion + 1,
                    answerState: {}
                })
                clearTimeout(intervalTransferQuestion)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    onClickResetStateHandler = () => {
        this.setState({
            results: {},
            currentQuestion: 0,
            isFinished: false,
            answerState: {}
        })
    }

    renderContentQuiz() {
        return this.state.isFinished
            ? <FinishedQuiz
                result={this.state.results}
                quiz={this.state.quiz}
                onResetState={this.onClickResetStateHandler}
            />
            : <ActiveQuiz
                question={this.state.quiz[this.state.currentQuestion].question}
                currentQuestion={this.state.currentQuestion + 1}
                totalQuestion={this.state.quiz.length}
                answers={this.state.quiz[this.state.currentQuestion].answers}
                onClickAnswerHandler={this.clickAnswerHandler}
                answerState={this.state.answerState}
            />
    }

    render() {

        return(
            this.state.isLoading
                ? <Loader />
                : this.renderContentQuiz()
        )
    }
}

export default Quiz