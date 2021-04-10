import React from 'react'


class QuizHead extends React.Component {
    render() {
        return (
            <div className="quiz__quiz-head quiz-head">
                <h4 className="quiz-head__title">
                    <strong>{this.props.currentQuestion}. &nbsp;</strong>
                    {this.props.question}
                </h4>

                <div className="quiz-head__cnt-question cnt-question">
                    <p className="cnt-question__paragraph">
                        <span className="cnt-question__current">{this.props.currentQuestion}</span>
                        &nbsp;из&nbsp;
                        <span className="cnt-question__total">{this.props.totalQuestion}</span>
                    </p>
                </div>
            </div>
        )
    }
}

export default QuizHead