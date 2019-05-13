import { SIGNUP_CHECK } from '../actions/types';
const initialState = {
    output: ""
  };
  export default function (state = initialState, action) {
    // alert("Inside Signup Reducer")
    switch (action.type) {
        case SIGNUP_CHECK:
        alert("Inside Signup Check")
        if (action.payload === 200) {
            alert("signup reducer")
            alert(action.payload)
            console.log("login success",action.payload)
            return {
                ...state,
                output: action.payload
              }
        }
        else{
            console.log("login failed",action.payload)
            alert("signup reducer failed")
            return {
                ...state,
                output: action.payload
              }
        }
        
        default:
     return state;
  }

    }
    
