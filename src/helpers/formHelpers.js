export const createControl = (config, validation) => {
    return {
        ...config,
        value: '',
        valid: !validation,
        dirty: false,
        typeInput: 'text',
        validation
    }
}

export const isValidateControl = (value, control) => {
    if (!control.validation) {
        return true
    }

    let isValid = true

    if(control.validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    return isValid
}
