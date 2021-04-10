import React from 'react'
import './Button.css'


const Button = ({onClick, children, typeButton, disabled}) => {
    const cls = ['main-btn', typeButton]

    return (

        <button
            onClick={onClick}
            className={cls.join(' ')}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
