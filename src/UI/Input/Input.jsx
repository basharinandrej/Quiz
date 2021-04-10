import React from 'react'
import './Input.css'

const Input = props => {
    const {
        typeInput,
        value,
        label,
        errorMessage,
        placeholder,
        onChange
    } = props

    const classNameForInput = ['main-input']
    const generateId = `${label} - ${Math.random()}`
    const type = typeInput || 'text'

    const isInValid = ({ valid, dirty, shouldValidate, isFormValid, isFormSubmitted }) => {
        if (!isFormValid && isFormSubmitted  && !dirty) {
            return !valid && shouldValidate && !dirty
        }
        return !valid && shouldValidate && dirty
    }

    if (isInValid(props)) {
        classNameForInput.push('main-input--invalid')
    }

    return (
        <label htmlFor={generateId} className={`${classNameForInput.join(' ')}`}>
            <span className="main-input__legend">{label}</span>
            <input
                id={generateId}
                type={type}
                value={value}
                className="main-input__input"
                placeholder={placeholder}
                onChange={onChange}
            />

            { isInValid(props)
                ? <p className="main-input__paragraph">{ errorMessage || 'Введите корректное значение'}</p>
                : null
            }
        </label>
    )
}

export default Input