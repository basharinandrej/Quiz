import React, {Fragment} from 'react'
import './index.css'
import FinishedQuiz from "../FinishedQuiz/FinishedQuiz";
import ActiveQuiz from "./ActiveQuiz/ActiveQuiz";

class Quiz extends React.Component{
    state = {
        results: {},
        currentQuestion: 0,
        isFinished: false,
        answerState: {},
        quiz: [
            {
                id: 1,
                question: 'Сколько мне лет ?',
                rightAnswerId: 2,
                answers: [
                    {id: 1, text: '12 лет'},
                    {id: 2, text: '22 лет'},
                    {id: 3, text: '21 лет'},
                    {id: 4, text: '50 лет'}
                ]
            },
            {
                id: 2,
                question: 'Когда основали Вологду ?',
                rightAnswerId: 3,
                answers: [
                    {id: 1, text: '1000'},
                    {id: 2, text: '2000'},
                    {id: 3, text: '1147'},
                    {id: 4, text: '1589'}
                ]
            }
        ]
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

    render() {
        return(
            <Fragment>
                {this.state.isFinished
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
            </Fragment>
        )
    }
}

export default Quiz