    
import { gql } from 'apollo-boost';


const checkUEmail = gql`
    query User($studentid:String, $password:String,$stufac:String){
        User(studentid:$studentid,password:$password,stufac:,$stufac){
        status
        data{
            username
            studentid
        }
      

    }
  }
`;
const signup = gql`
    query User($studentid:String,$username:String, $password:String, $stufac:String){
        User(studentid:$studentid,username:$username,password:$password, stufac:$stufac){
        status
    }
  }
`;

const getCourses = gql`
    query Courselist($studentid:String,$stuname:String, $stufac:String){
        Courselist(studentid:$studentid,stuname:$stuname,stufac:$stufac){

            course_result{
            courseid,
            coursecol,
            coursename,
            coursestatus,
            
        }
        status
    }
  }
`;
const getProfile = gql`
    query getProfile($loginid:String, $stufac:String){
        getProfile(loginid:$loginid,stufac:$stufac){
        result{
            name
            email 
            phonenumber
            about
            school
            city
            country
            company
            hometown
            language
            gender
        }
        status
    }
  }
`;

export {checkUEmail,signup,getCourses,getProfile}