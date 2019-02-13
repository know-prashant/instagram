const emailValidation = (email) => {
    return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
}

module.exports = {
    emailValidation
};