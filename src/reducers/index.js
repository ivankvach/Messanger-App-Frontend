import userReducer from './user';
import userLoginReducer from './userLogin';
import userTokenReducer from './token';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    user: userReducer,
    loginUser: userLoginReducer,
    token: userTokenReducer
});

export default allReducers;