module.exports = (success = true, message = '', error = null) => {
        return {
            success,
            message,
            error
        };
};