const userReducer = (state = "", action) => {
    switch (action.type) {
        case 'SEND_USER_TO_RIGHTBAR':
            // return [
            //     ...state,
            //     {    
            //       text: action.payload,
            //     }
            //   ]
            return state = action.payload;
        case 'INITIAL_STATE_FROM_SERVER':
            return state = action.payload;

        case 'DELETE_ITEM_FROM_BASKET':
            return [
                ...state.filter((card) => card._id !== action.payload)
            ]
        default:
            return state;
    }
};

export default userReducer;