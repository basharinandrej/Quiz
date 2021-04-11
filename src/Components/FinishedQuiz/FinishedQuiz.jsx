import React, {Fragment} from 'react'
import './FinishedQuiz.css'
import Button from "../../UI/Button/Button";
import {NavLink} from "react-router-dom";

class FinishedQuiz extends React.Component{

    render() {
        const getTotalSuccessAnswer = Object.keys(this.props.result).reduce((total, el) => {
            return this.props.result[el] === 'success' ? total + 1 : total
        }, 0)

        return (
            <Fragment>
                <h2 className="finished__title">Finished</h2>

                <ul className="finished-list">
                    {this.props.quiz.map((el, idx) => {
                        const statusAnswer = this.props.result[el.id]
                        const classes = ['finished-list__item', statusAnswer]
                        const classesIcon = ['fa']

                        classesIcon.push( statusAnswer === 'success' ? 'fa-check' : 'fa-times')

                        return (
                            <li key={idx} className={classes.join(' ')}>
                                <span>{idx + 1})&nbsp;</span>
                                {el.question}
                                <i className={classesIcon.join(' ')}/>
                            </li>
                        )
                    })}
                </ul>

                <div className="result-box">
                    <p className="result-paragraph">
                        Правильно
                        <strong>{getTotalSuccessAnswer}</strong>
                        из
                        <strong>{this.props.quiz.length}</strong>
                    </p>
                </div>

                <div className="box-btn">
                    <Button
                        onClick={this.props.onResetState}
                        typeButton="primary"
                    >
                        Пройти снова
                    </Button>

                    <NavLink to="/">
                        <Button
                            typeButton="success"
                        >
                            Перейти к списку тестов
                        </Button>
                    </NavLink>
                </div>
            </Fragment>
        )
    }
}

export default FinishedQuiz