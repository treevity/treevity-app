export const getErrors = (error) => {
    let errorMsg: string = '';
    let errors: any = [];
    if (error.graphQLErrors && error.graphQLErrors.length) {
        errors = error.graphQLErrors.map(error => error.message.message || error.message.error);
    } else if (error.networkError && error.networkError.result.errors.length) {
        errors = error.networkError.result.errors.map(error => error.message || error.error);
    }

    if (errors.length) {
        errors = errors.map(error => `<li>${error}</li>`);
        errorMsg = `<ul class="errors">${errors.join('\n')}</ul>`;
    } else {
        errorMsg = error.message;
    }

    return errorMsg;
};
