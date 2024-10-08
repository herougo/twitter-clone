const emailValidator = (val) => {
    return /^.+@.+\..+$/.test(val);
}

module.exports = {
    emailValidator
}