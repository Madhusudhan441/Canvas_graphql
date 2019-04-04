import { PROFILE_UPDATE } from './types';
import axios from "axios";

export const profileUpdate = (stufac, loginid, name, email, phonenumber, about, city, country, company, hometown, language, school, gender)  => async(dispatch) => {
        const data1 = {
            stufac: stufac,
            loginid: loginid,
            name: name,
            email: email,
            phonenumber: phonenumber,
            about: about,
            city: city,
            country: country,
            company: company,
            hometown: hometown,
            language: language,
            school: school,
            gender: gender
        }
        axios.defaults.withCredentials = true;
        await axios.post('http://localhost:3001/updateprofile', data1)
            .then((response) => {
                alert("response")
                alert(response.status)
                dispatch({
                    type: PROFILE_UPDATE,
                    payload: response.status,
                })
            })
            .catch((error) => {
                alert("error")
                console.log("in error")
                dispatch({
                    //ERROR 400 status
                    type: PROFILE_UPDATE,
                    payload: error.response.status
                })
            })
    }

