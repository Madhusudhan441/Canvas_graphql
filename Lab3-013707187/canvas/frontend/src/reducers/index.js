import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import ProfileReducer from './ProfileReducer'

export default combineReducers({
    loginState: loginReducer,
    signupState: signupReducer,
    profileupdate:ProfileReducer
    
});