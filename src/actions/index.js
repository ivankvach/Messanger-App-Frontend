export const sendUser = (data) => {
    return {
        type: 'SEND_USER_TO_RIGHTBAR',
        payload: data
    };
};