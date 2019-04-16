import React, { Component } from 'react'
import Graderesult from './Graderesults'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
export default class Grades extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            id:localStorage.getItem('courseid'),
            date1:"",
            grades:[],
            selected:"",
            courseres:[],
            people:[],
            assignments:[],
            updated_marks:[],
            assignmentid:"1",
            marks:"",
            btnvis:"hidden"
        }
if(localStorage.getItem('stufac')=="faculty"){
    this.state.btnvis = "visible"
}
else{
    this.state.btnvis = "hidden"
}
    
    }
    courseidfilChangeHandler = (e) => {
        this.setState({
            id : e.target.value
        })
    }
    sortfilChangeHandler=(e)=>{
        this.setState({
            date1: e.target.value
       })
    }
    componentDidMount(){
       
        axios.defaults.withCredentials = true;
    
        const data_people={
            courseid:localStorage.getItem('courseid')
          }
          axios.defaults.withCredentials = true;
         
            axios.post('http://localhost:3001/getpeople',data_people)
            .then((response) => {
              if(response.status === 200){
                
                console.log("response",response.data)
             
            //update the state with the response data
            this.setState({
                people:response.data
            });
          
          }
        });

        const data_assignments={
            courseid:localStorage.getItem('courseid')
          }
          axios.defaults.withCredentials = true;
         
            axios.post('http://localhost:3001/getassignment',data_assignments)
            .then((response) => {
              if(response.status === 200){
                       
                console.log("success")
                console.log(response.data)
             
            //update the state with the response data
            this.setState({
                assignments:response.data
            });
            console.log(this.state.assignments)
          }
        });
        //make a post request with the user data
        const data2 = {
            id:localStorage.getItem('loginid'),
            stuname:localStorage.getItem('stuname'),
            stufac:localStorage.getItem('stufac')
        }
     
       
        axios.post('http://localhost:3001/getcourselist',data2)
            .then(response => {
                console.log("Status Code child: ",response.status);
                if(response.status === 200){
                 
                   console.log("success child")
                   console.log(response.data)
                    this.setState({ 
                        courseres:response.data
                    })

                    console.log("hiii",this.state.courseres)

                }
            });
           
   

    }
    assignmentUpdate=(e)=>{
        this.setState({
            assignmentid:e.target.value
        })

    }
    submitGrades=(e)=>{
        const data_grades={
            courseid:localStorage.getItem('courseid'),
            grade_details:this.state.updated_marks
          }
          axios.defaults.withCredentials = true;
         
            axios.post('http://localhost:3001/updategrades',data_grades)
            .then((response) => {
              if(response.status === 200){
                       alert("grades updated")
                       
                console.log("success")
                console.log(response.data)
             
            //update the state with the response data
        
            console.log(this.state.assignments)
          }
        });
        // alert("hi")
        window.location.reload();
    }
    add_marks=(val,e)=>{
        e.preventDefault();
        var data1 = {"studentid":val,"score":this.state.marks,assignmentid:this.state.assignmentid}
        console.log("data1",data1);
this.state.updated_marks.push(data1)
console.log(this.state.updated_marks)
        
alert(val)
    }
    marksChange=(e)=>{
     
        this.setState({
            marks:e.target.value
        })
console.log("student state",this.state.marks)
        
    }
   
    gradesearch=async(e)=>{
        
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
     
        const gradelist = {
            id : this.state.id,
            stufac:localStorage.getItem('stufac'),
            loginid:localStorage.getItem('loginid'),
            date1 : this.state.date1
        }
      
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        await axios.post('http://localhost:3001/gradesearch',gradelist)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    
                   console.log("success parent")
                   console.log(response.data)
                   
                    this.setState({
                        grades: response.data
                    });

                    console.log("grades value",this.state.grades)
                 
            
                }
                
            });
           
    }

    render() {

        if(this.state.assignments){
            var assignmentslist = this.state.assignments.map(assignment=>{
              return (
              
              <option value ={assignment.assignmentid} class="border stl">{assignment.assignmentid}</option>
             
           )})
              }

        console.log(this.state.status)
        if(this.state.people.length>0){
          var getpeople=this.state.people.map((person,idx)=>{
          // alert(idx)
    
              return(
            <tr>
            <td>{person.studentid}</td>
            <td><input type ="number" name={person.studentid} onChange={this.marksChange} placeholder="Enter Marks"></input></ td>
            <button onClick={this.add_marks.bind(this,person.studentid)}>Add Marks</button>
            {/* <td><button class="btn btn-primary" onClick={this.dropstud(person)} style={{visibility:this.state.btnvis}}>Drop Student</button></td> */}
        </tr>
              )
    
          })
          
        }
    
    
        var courses_display = this.state.courseres.map(course1 => {
            {console.log("hello",course1.coursename,course1.courseid)};
            if(course1.courseid==localStorage.getItem('courseid')){
                this.state.selected = "selected"
            }
            else{
                this.state.selected = ""
            }
            return(
            <option value={course1.courseid} selected={this.state.selected}>{course1.coursename}</option>
                
            )
    })

        return (
            <div>
               
                <div class="container" style={{height:"200px"}}>
                    <div style={{width:"100%",height:"10%"}}>
                        <h2>Grades for Madhusudhan Shagam</h2>
                        <div class="lessspace"></div>
                        <span class=" doublepad" style={{marginLeft:"-60px"}}>Course</span>
                        
                        <span class="  doublepad"style={{marginLeft:"30px"}}>Arrange By</span>
                        <br></br>
                        </div>
                    <div>
                        <div class="lessspace"></div>
                        <select name="Coursefilter" onChange={this.courseidfilChangeHandler} class="lesspad col-sm-2">
                        {courses_display}
                            {/* <option value={localStorage.getItem('courseid')}>course1</option>
                            <option value="course2">course2</option>
                            <option value="course3">course3</option>
                            <option value="course4">course4</option> */}
                        </select>
                  
                        <select name="sortfilt" onChange={this.sortfilChangeHandler} class=" lesspad col-sm-2">
                            <option value="duedate">Due Date</option>
                            <option value="Assignmentgroup">Assignment Group</option>
                            <option value="course3">Title</option>
                        </select>
                        <div ></div>
                        <button onClick={this.gradesearch} class="btn btn-primary lesspad col-sm-1">Apply</button>
                    </div>
                    <div class="col col-sm-1"></div>
                    <button  class="btn btn-primary" data-toggle="modal" data-target="#myModal" style={{padding:"10px",visibility:this.state.btnvis}}>Grade Assigments</button>
        <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog" style={{width:"30%"}}>
    
   
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
         <center> <h4 class="modal-title">Grade Students</h4></center>
         <div class="lessspace"></div>
        </div>
        <div class="modal-body">
        <center>
        <form  style={{width:"1-0%"}}>
        <select  onChange={this.assignmentUpdate}>
            {assignmentslist}

        </select>
        <table class="table">
                            <thead>
                                <tr>
                                    <th >Student Id</th>
                                    <th>Marks</th>
                                 
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {getpeople}
                              {/* <button onClick={this.previous}   class="btn btn-primary" type="button" style={{marginLeft:"100px"}}>Previous</button>

                              <button onClick={this.next}  class="btn btn-primary" type="button" style={{marginLeft:"350px"}}>Next</button> */}
                            </tbody>
                        </table>
                {/* <div class="row">
                <div  class=" form-group col col-sm-5" > 
                    Announcement Name
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.anctnameChangeHandler} type="text" name="antname" class="form-control" placeholder="Ancmnt Name"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                    Announcement Details
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.anctdetChangeHandler}  type="text" name="antdet" class="form-control" placeholder="Ancmnt Details"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div>
                <div  class=" form-group col col-sm-5" > 
                    Date
               </div>
               <div class="col col-sm-7">
                    <input  onChange={this.anctdateChangeHandler} type="date" name="antdate" class="form-control"></input>
                </div>
                </div>
                <div class="space"></div>
             
                <div class="form-group" style={{width:"40%"}}>
                    <button onClick={this.ancmntupdate} type="submit" class="btn btn-primary btn-block">Update</button>
                </div>         */}
            </form>
            </center>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button  class="btn btn-primary" onClick={this.submitGrades}>Update Grades</button>
        </div>
      </div>
      
    </div>
  </div>



                </div>
                <div>
                    <Graderesult grades={this.state.grades}/>
                </div>
            </div>
        )
    }
}
