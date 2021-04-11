import React from 'react'
import './PageQuiz.css'
import Quiz from "../../Components/Quiz"

class PageQuiz extends React.Component {
    render() {
        return (
            <div className="quiz-section">
                <h1 className="quiz-section__title">Quiz</h1>

                <Quiz
                    idQuiz={this.props.match.params.id}
                />
            </div>
        )
    }
}

export default PageQuiz
