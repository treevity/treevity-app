export const getErrors = (error) => {
    let errorMsg = '';
    if (error.graphQLErrors && error.graphQLErrors.length) {
        const errors = error.graphQLErrors.map(error => error.message.message || error.message.error);
        errorMsg = errors.join('\n');
    } else if (error.networkError && error.networkError.result.errors.length) {
        const errors = error.networkError.result.errors.map(error => error.message || error.error);
        errorMsg = errors.join('\n');
    } else {
        errorMsg = error.message;
    }

    return errorMsg;
};
