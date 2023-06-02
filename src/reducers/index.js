import userReducer from './user';
import userLoginReducer from './userLogin';
import userTokenReducer from './token';
import reRender from './rerender';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    user: userReducer,
    loginUser: userLoginReducer,
    token: userTokenReducer,
    rerender: reRender
});

export default allReducers;