import React from 'react'
import './QuizList.css'
import {NavLink} from "react-router-dom";
import {Loader} from "../../Components/Loader/Loader";
import {connect} from 'react-redux'
import {fetchQuizzes} from "../../redux/actions/quiz";

class QuizList extends React.Component {


    renderListQuiz() {
        return this.props.quizzes.map((el, idx)=> {
            return (
                <li key={idx}>
                    <NavLink to={"quiz/" + el.id}>
                        { el.title }
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
       this.props.fetchQuizzes()
    }

    render() {
        return (
            <div className="quiz-list__page">
                <div className="container">
                    <h1>QuizList</h1>

                    <ul className="quiz-list__list">
                        {this.props.isLoading && this.props.quizzes.length
                            ? <Loader />
                            : this.renderListQuiz()
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        quizzes: state.quiz.quizzes,
        isLoading: state.quiz.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchQuizzes: () => dispatch(fetchQuizzes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
