import React from 'react'
import Layout from "./hoc/Layout"
import PageQuiz from "./Pages/PageQuiz"
import ToggleMenu from "./Components/Navigation/ToggleMenu/ToggleMenu"
import Drawer from "./Components/Navigation/Drawer/Drawer"
import {Switch, Route} from "react-router-dom"
import QuizList from "./Pages/QuizList"
import PageQuizCreate from "./Pages/QuizCreate"
import PageAuth from "./Pages/PageAuth"


class App extends React.Component {

    state = {
        openMenu: false
    }

    onClickToggleMenu = () => {
        this.setState({
            openMenu: !this.state.openMenu
        })
    }

    render() {
        return (
            <Layout>
                <Drawer
                    isOpenMenu={this.state.openMenu}
                    onClick={this.onClickToggleMenu}
                />
                <ToggleMenu
                    isOpenMenu={this.state.openMenu}
                    onClick={this.onClickToggleMenu}
                />

                <Switch>
                    <Route path="/" exact component={QuizList}/>
                    <Route path="/quiz/:id" component={PageQuiz}/>
                    <Route path="/quiz-create" component={PageQuizCreate}/>
                    <Route path="/auth" component={PageAuth}/>
                </Switch>
            </Layout>
        )
    }
}

export default App;
