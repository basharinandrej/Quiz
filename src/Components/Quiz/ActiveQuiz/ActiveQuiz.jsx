import React from 'react'
import QuizHead from "./QuizHead/QuizHead";
import AnswersList from "./AnswersList/AnswersList";


class ActiveQuiz extends React.Component{
    render() {
        return(
            <div className="quiz">
                <QuizHead
                    question={this.props.question}
                    currentQuestion={this.props.currentQuestion}
                    totalQuestion={this.props.totalQuestion}
                />

                <AnswersList
                    answers={this.props.answers}
                    clickAnswerHandler={this.props.onClickAnswerHandler}
                    answerState={this.props.answerState}
                />
            </div>
        )
    }
}

export default ActiveQuiz