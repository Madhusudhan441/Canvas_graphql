import { PROFILE_UPDATE } from '../actions/types';
const initialState = {
    out: localStorage.getItem('profileupd')
};
export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_UPDATE:
            if (action.payload === 200) {
                localStorage.setItem('profileupd',200)
                console.log("Profile Updated", action.payload)
                alert("success 1")
                return {
                    ...state,
                    out: action.payload
                }
            }
            else {
                console.log("Profile Update failed", action.payload)

                return {
                    ...state,
                    out: action.payload
                }
            }

        default:
            return state;
    }

}

