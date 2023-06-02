const reRender = (state = "", action) => {
    switch (action.type) {

        case 'SET_RENDER_FROM':
            return state = action.payload;

        default:
            return state;
    }
};

export default reRender;