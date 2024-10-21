const validateUsername = (text) => {
    if (text === '') {
        return ['Username is empty'];
    }
    return []
}

const validatePassword = (text) => {
    if (text === '') {
        return ['Password is empty'];
    }
    return []
}

const validatePasswordConfirmation = (password, confirmation) => {
    if (password !== confirmation) {
        return ['Passwords do not match'];
    }
    return []
}

const validateEmail = (text) => {
    if (text === '') {
        return ['Email is empty'];
    }
    if (!(/^.+@.+\..+$/.test(text))) {
        return ['Email is not valid'];
    }
    return []
}

const validateName = (text, kind='First') => {
    if (text === '') {
        return [`${kind} name is empty`];
    }
    return []
}

const validateLogin = ({username, password}) => {
    let errorMessages = [];
    errorMessages = errorMessages.concat(validateUsername(username));
    errorMessages = errorMessages.concat(validatePassword(password));
    return errorMessages;
}

const validateSignUp = ({username, password, passwordConfirmation, email, firstName, lastName}) => {
    let errorMessages = [];
    errorMessages = errorMessages.concat(validateUsername(username));
    errorMessages = errorMessages.concat(validatePassword(password));
    errorMessages = errorMessages.concat(
        validatePasswordConfirmation(password, passwordConfirmation)
    );
    errorMessages = errorMessages.concat(validateEmail(email));
    errorMessages = errorMessages.concat(validateName(firstName, 'First'));
    errorMessages = errorMessages.concat(validateName(lastName, 'Last'));
    return errorMessages;
}

export {
    validateUsername,
    validatePassword,
    validateEmail,
    validateName,
    validateLogin,
    validateSignUp
};