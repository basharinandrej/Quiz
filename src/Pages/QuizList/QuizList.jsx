import React from 'react'
import './QuizList.css'
import {NavLink} from "react-router-dom";
import axios from "axios";
import {Loader} from "../../Components/Loader/Loader";
import {baseUrl} from "../../helpers/baseUrl";

class QuizList extends React.Component {

    state = {
        quizzes: [],
        isLoading: true
    }

    renderListQuiz() {
        return this.state.quizzes.map((el, idx)=> {
            return (
                <li key={idx}>
                    <NavLink to={"quiz/" + el.id}>
                        { el.title }
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`${baseUrl}/quizes.json`)
            const quizzes = []

            Object.keys(response.data).forEach(key => {
                quizzes.push({
                    id: key,
                    title: response.data[key][0].question
                })

                this.setState({
                    quizzes,
                    isLoading: false
                })
            })
        } catch (e) {
            console.log('Error in componentDidMount', e)
        }
    }


    render() {

        return (
            <div className="quiz-list__page">
                <div className="container">
                    <h1>QuizList</h1>

                    <ul className="quiz-list__list">
                        {this.state.isLoading
                            ? <Loader />
                            : this.renderListQuiz()
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default QuizList
