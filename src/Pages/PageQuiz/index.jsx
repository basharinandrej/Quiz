import React from 'react'
import './index.css'
import Quiz from "../../Components/Quiz"

class PageQuiz extends React.Component {
    render() {
        console.log(this.props.match.params.id);

        return (
            <div className="quiz-section">
                <h1 className="quiz-section__title">Quiz</h1>

                <Quiz />
            </div>
        )
    }
}

export default PageQuiz