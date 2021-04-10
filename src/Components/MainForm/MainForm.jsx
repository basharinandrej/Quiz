import React from 'react'
import './MainForm.css'

const MainForm = props => {
    const { children, onSubmit } = props

    return (
        <form className="main-form" onSubmit={onSubmit}>
            { children }
        </form>
    )
}

export default MainForm
