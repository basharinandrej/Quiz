import React from 'react'
import './index.css'
import {NavLink} from "react-router-dom";

class QuizList extends React.Component {

    renderListQuiz() {
        return [1, 2, 3].map((el, idx)=> {
            return (
                <li key={idx}>
                    <NavLink to={"quiz/" + el}>
                        Тест - {el}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className="quiz-list__page">
                <div className="container">
                    <h1>QuizList</h1>

                    <ul className="quiz-list__list">
                        {this.renderListQuiz()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default QuizList
