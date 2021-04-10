import React from 'react'
import './index.css'
import MainForm from "../../Components/MainForm/MainForm";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

class Auth extends React.Component {

    state = {
        isFormValid: false,
        isFormSubmitted: false,
        formControls: {
            email: {
                value: '',
                valid: false,
                dirty: false,
                type: 'email',
                label: 'Email',
                errorMassage: 'Введите корректный Email',
                placeholder: 'admin@mail.ru',
                validation: {
                    required: true,
                    pattern: /\S+@\S+\.\S+/
                }
            },
            password: {
                value: '',
                valid: false,
                dirty: false,
                type: 'password',
                label: 'Пароль',
                errorMassage: 'Минимальная длина пароля 6 символов | сейчас ',
                currentLengthPassword: 0,
                placeholder: null,
                validation: {
                    required: true,
                    pattern: /[0-9a-zA-Z]{6,}/
                }
            }
        }
    }

    registerHandler() {
        this.state.isFormValid ? console.log('Регистрация') : console.log('НЕТ Регистрация')
    }

    loginHandler() {
        this.state.isFormValid ? console.log('Вход') : console.log('НЕТ Вход')
    }

    isFormValid() {
        const formControls = {...this.state.formControls}
        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            isFormValid
        })
    }

    onSubmitHandler(e) {
        e.preventDefault()
        let isFormSubmitted = true
        const formControls = {...this.state.formControls}

        Object.keys(formControls).forEach(controlName => {
            const control = formControls[controlName]

            control.valid = this.isValidateControls(control.value, control)
            control.dirty = true

            formControls[controlName].valid = control.valid

            this.setState({
                formControls, isFormSubmitted
            })
        })

        this.isFormValid()
    }

    isValidateControls(value, control) {
        if (!control.validation) {
            return true
        }

        let isValid = true

        if(control.validation.required) {
            isValid = control.value.trim() && isValid
        }

        if(control.validation.pattern) {
            isValid = control.validation.pattern.test(control.value) && isValid
        }

        return  isValid
    }

    setErrorMessageForControls(control, controlName) {
        if (controlName === 'email') {
            return control.errorMassage
        }  else if (controlName === 'password') {
            return `${control.errorMassage.substring(0, control.errorMassage.length - 1)} ${control.currentLengthPassword}`
        }
    }

    onChangeHandler(e, controlName) {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = e.target.value
        control.currentLengthPassword = e.target.value.length
        control.errorMassage = this.setErrorMessageForControls(control, controlName)
        this.state.isFormSubmitted
            ? control.valid = this.isValidateControls(control.value, control)
            : control.valid = false
        formControls[controlName] = control

        this.isFormValid()

        this.setState({
            formControls
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, idx) => {
            const control = {...this.state.formControls[controlName]}

            return (
                <Input
                    key={control.label + idx}
                    typeInput={control.type}
                    value={control.value}
                    label={control.label}
                    errorMessage={control.errorMassage}
                    dirty={control.dirty}
                    placeholder={control.placeholder}
                    shouldValidate={!!control.validation}
                    valid={control.valid}
                    onChange={e => this.onChangeHandler(e, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className="auth">
                <div className="container">
                    <h1 className="auth__title">Auth</h1>

                    <MainForm
                        onSubmit={e => this.onSubmitHandler(e)}
                    >
                        {this.renderInputs()}

                        <Button
                            typeButton="success"
                            onClick={this.loginHandler.bind(this)}
                        >
                            Вход
                        </Button>
                        <Button
                            typeButton="primary"
                            onClick={this.registerHandler.bind(this)}
                        >
                            Авторизоваться
                        </Button>
                    </MainForm>
                </div>
            </div>
        )
    }
}

export default Auth
