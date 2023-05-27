const userLoginReducer = (state = "", action) => {
    switch (action.type) {

        case 'SET_USER_TO_REDUX':
            return state = action.payload;

        default:
            return state;
    }
};

export default userLoginReducer;