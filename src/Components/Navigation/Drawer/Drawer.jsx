import React, {Fragment} from 'react'
import './Drawer.css'
import {Backdrop} from "../../../UI/BackDrop/Backdrop"
import {NavLink} from "react-router-dom";

const links = [
    {to: '/auth', text: 'Авторизация'},
    {to: '/', text: 'Список Тестов'},
    {to: '/quiz-create', text: 'Создать Тест'},
]

class Drawer extends React.Component {
    setCloseDrawer = () => this.props.onClick()


    render() {

        const cls = ['drawer']
        cls.push(this.props.isOpenMenu ? 'open' : '')

        return(
            <Fragment>
                <div className={cls.join(' ')}>
                    <ul className="drawer__list">
                        {links.map((el, idx)=> {
                            return (
                                <NavLink to={el.to} key={el.text} onClick={this.setCloseDrawer}>
                                    <li>{idx + 1} - { el.text }</li>
                                </NavLink>
                            )
                        })}
                    </ul>
                </div>
                {this.props.isOpenMenu ? <Backdrop onClick={this.setCloseDrawer}/> : null }
            </Fragment>
        )
    }
}

export default Drawer
