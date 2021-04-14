import React from 'react'
import './QuizList.css'
import {NavLink} from "react-router-dom";
import {Loader} from "../../Components/Loader/Loader";
import {connect} from 'react-redux'
import {fetchQuizzes} from "../../redux/actions/quizzes";
import {setDefaultStateCurrentQuiz} from "../../redux/actions/quiz";

class QuizList extends React.Component {


    renderListQuiz() {
        return this.props.quizzesList.map((el, idx)=> {
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
        this.props.setDefaultStateCurrentQuiz()
    }

    render() {
        return (
            <div className="quiz-list__page">
                <div className="container">
                    <h1>QuizList</h1>

                    <ul className="quiz-list__list">
                        {this.props.isLoading && this.props.quizzesList.length
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
        quizzesList: state.quizzes.quizzesList,
        isLoading: state.quizzes.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchQuizzes: () => dispatch(fetchQuizzes()),
        setDefaultStateCurrentQuiz: () => dispatch(setDefaultStateCurrentQuiz())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
