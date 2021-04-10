import React from 'react'
import './Select.css'


const Select = props => {
    const {label, options, onChange} = props

    const generateId = `${label}-${Math.random()}`

    return (
        <label htmlFor={generateId} className="select">
            <span className="select__legend">{label}</span>
            <select
                className="select__select"
                id={generateId}
                onChange={onChange}
            >
                {options.map((option, idx) => {
                    return (
                        <option
                            key={idx + Math.random}
                            value={option.id}
                        >{option.text}</option>
                    )
                })}
            </select>
        </label>
    )
}

export default Select