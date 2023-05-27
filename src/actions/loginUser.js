export const loginUser = (data) => {
    return {
        type: 'SET_USER_TO_REDUX',
        payload: data
    };
};