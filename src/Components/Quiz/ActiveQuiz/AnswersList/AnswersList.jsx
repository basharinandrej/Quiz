import React from 'react'
import AnswersListItem from "./AnswersListItem/AnswersListItem"

class AnswersList extends React.Component{
    render() {

        return (
            <ul className="quiz-list">
                {this.props.answers.map(answer => {
                    const answerState = this.props.answerState ? this.props.answerState[answer.id] : null
                    return <AnswersListItem
                        clickAnswerHandler={this.props.clickAnswerHandler}
                        answerState={answerState}
                        answers={answer.text}
                        id={answer.id}
                        key={answer.id}
                    />
                })}
            </ul>
        )
    }
}

export default AnswersList