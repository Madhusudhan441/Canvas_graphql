
import { gql } from 'apollo-boost';

const signupmutation = gql`

mutation addUser($studentid:String,$username:String, $password:String, $stufac:String){
    addUser(studentid:$studentid,username:$username,password:$password, stufac:$stufac){
    status
}
}
   
`;


const addCoursemutation = gql`

mutation addCourse($coursename:String,$courseid:String, $coursedes:String, $coursedept:String,$courseterm:String, $coursecol:String, $coursecap:String,$coursewaitcap:String, $courseroom:String, $facultyid:String){
    addCourse(coursename:$coursename,courseid:$courseid,coursedes:$coursedes, coursedept:$coursedept,courseterm:$courseterm,coursecol:$coursecol, coursecap:$coursecap,coursewaitcap:$coursewaitcap,courseroom:$courseroom,facultyid:$facultyid){
    status
}
}
   
`;

export {signupmutation,addCoursemutation};