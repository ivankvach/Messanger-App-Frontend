export const setToken = (data) => {
    return {
        type: 'SET_TOKEN_TO_REDUX',
        payload: data
    };
};