import { LOGIN_CHECK, LOGIN_SUCCESS,SIGNOUT_CHECK, LOGIN_ERROR } from '../actions/types';
const initialState = {
    logsuccess: localStorage.getItem('logsuccess'),
    response: ""
  };
  export default function (state = initialState, action) {
   
    switch (action.type) {
        case LOGIN_CHECK:
        if (action.payload === 200) {
         
            console.log("login success",action.payload)
            localStorage.setItem('logsuccess',true)
            return {
                ...state,
                logsuccess: true,
                response: action.payload
              }
        }
        else{
        if (action.payload === 406) {
         
          localStorage.setItem('logsuccess',false)
          alert("Invalid Password")

         }
         else{
          localStorage.setItem('logsuccess',false)
          alert("Invalid Username")
         }

          // if(action.payload===406){
          //   alert("Invalid Password")
          // }
          // else{
          //   alert("Invalid Username")

          // }
            console.log("login failed",action.payload)
            // localStorage.setItem('logsuccess',false)
            return {
                ...state,
                logsuccess: false,
                response: action.payload
              }
        }
        case SIGNOUT_CHECK:
        // alert("signing out")
        console.log("Reducer :  Signout successful !");
        // alert("in logout reducer")
        localStorage.setItem('logsuccess',false)
        return {
          ...state,
          response: "",
          logsuccess: false
        }
        default:
     return state;
  }

    }
    
