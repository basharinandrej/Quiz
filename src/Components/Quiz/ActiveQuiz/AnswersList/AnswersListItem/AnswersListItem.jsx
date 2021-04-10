import React from 'react'


class AnswersListItem extends React.Component{

    render() {
        const classes = ['quiz-list__item', this.props.answerState]

        return (
            <li className={classes.join(' ')}
                onClick={() => this.props.clickAnswerHandler(this.props.id)}
            >
                <strong>{this.props.id} &nbsp;</strong>
                {this.props.answers}
            </li>
        )
    }
}

export default AnswersListItem