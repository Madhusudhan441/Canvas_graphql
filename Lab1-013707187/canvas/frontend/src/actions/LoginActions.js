import { Login_SUCCESS, LOGIN_ERROR, SIGNOUT_CHECK, LOGIN_CHECK, SIGNUP_CHECK, } from './types';
import axios from "axios";

export const submitLogin = (username, password, stufac) => dispatch => {
    const data = {
        username: username,
        password: password,
        stufac: stufac
    }
    // alert("Inside Submit Login Actions")
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/login', data)
        .then(response => {
            console.log("token",response)
            localStorage.setItem('token',response.data.token)
            dispatch({
                type: LOGIN_CHECK,
                payload: response.status,
                stuname: response.data
            })
            console.log("Status Code : ", response.status);

        })
        .catch((error) => {
            console.log("in error",error)
            dispatch({
                
                //ERROR 400 status
                type: LOGIN_CHECK,
                payload: "400",
                stuname: ""
            })
        })          

}
export const signup = (id, username, password, owner) => async (dispatch) => {
    const datasignup = {
        loginid: id,
        username: username,
        password: password,
        owner: owner
    }
    // alert("Inside signup Actions")
    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:3001/signup', datasignup)
        .then((response) => {
            // alert("response")
            // alert(response.status)
            
            dispatch({
                type: SIGNUP_CHECK,
                payload: response.status,
            })
        })
        .catch((error) => {
            alert("error")
            console.log("in error")
            dispatch({
                //ERROR 400 status
                type: SIGNUP_CHECK,
                payload: error.response.status
            })
        })

}

export const signout = () => dispatch => {
    // alert("in sign out actions")
    console.log("Actions : signing out ...");
    dispatch({
        type: SIGNOUT_CHECK,
        payload: false
    })
} 
