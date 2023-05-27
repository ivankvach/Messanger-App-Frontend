const userTokenReducer = (state = "", action) => {
    switch (action.type) {

        case 'SET_TOKEN_TO_REDUX':
            return state = action.payload;

        default:
            return state;
    }
};

export default userTokenReducer;