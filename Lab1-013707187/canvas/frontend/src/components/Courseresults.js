import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
export default class Courseresults extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    
    this.state = {
        regbtnflag:"disabled",
        status:"initial",
        permission:"hidden",
        coursestatus:"",
        code:0,
        courseidclick:"",
        
        coursestatus:"Not Enrolled",
        flag:0
    }}
    
    // componentDidMount(){
    //     axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    //     const data2 = {
    //         stuname:localStorage.getItem('stuname'),
    //         stufac:localStorage.getItem('stufac')
    //     }
       
        
    //     alert("hello")
    //     axios.post('http://localhost:3001/getcourselist',data2)
    //         .then(response => {
    //             console.log("Status Code child: ",response.status);
    //             if(response.status === 200){
                 
    //                console.log("success child")
    //                console.log(response.data)
    //                 this.setState({ 
    //                     courseres:response.data
    //                 })

    //             }
    //         });
       
   

    // }
    permissionchangeHandler=(e)=>{
        this.setState({
            code: e.target.value
        })
    }
   cregister=(e)=>{
    var headers = new Headers();
    e.preventDefault();
       console.log(e.target.value.coursestatus)
    const stat= JSON.parse(e.target.value)
   
    //    if(stat.coursestatus!="not registered"){
    //    alert("already registered")
     
    //     return;
    //    }
    //    else{
         
           const data1={
               enrollstatus:stat.enrollstatus,
               courseid:stat.courseid,
               id:localStorage.getItem('loginid'),
               coursename:stat.coursename,
               courseterm:stat.courseterm,
               stuname:localStorage.getItem('stuname'),
               
           }
        
        axios.defaults.withCredentials = true;
        console.log("res",data1)
        // alert("in results")
        //make a post request with the user data
        axios.post('http://localhost:3001/regcourse',data1)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                 alert("success")
                   console.log("success")
                   console.log(response.data)
                   
                this.setState({
                    status:"updated"
                })
                
                this.props.callbackFromParent()

                }
            });
       
   }    

   requestpermission=(val)=>(e)=>{
    //  alert("Permission Number generated")
      const datap={
           courseid:val,
           loginid:localStorage.getItem('loginid'),
           code:this.state.code
           
       }
       e.preventDefault();
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/requestpermission',datap)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    coursestatus:"updated"
                })
                console.log("permission number")
     alert("Permission Number generated")

            //  alert("Course Added")
               console.log("success")
               console.log(response.data)
               
           alert("permission number generated")
            
            // this.props.callbackFromParent()
            window.location.reload();


            }
            // else{
            //     this.setState({
            //         coursestatus:"not updated"
            //     })
            //     console.log("not updated")
            //     alert("invalid permission number")
            // this.props.callbackFromParent()
            
            // }
        })
        .catch(error=> {
            // handle error 
            // alert("invalid permission number")
            // this.setState({
            //         coursestatus:"not updated"
            //     })
            // this.props.callbackFromParent()
            window.location.reload();

            console.log(error);
          })
        
   }
  render() {
  console.log("courseres...updated...",this.props.data,this.state.status)
    var courseResult = null

  
    if (this.props.data.Courses != null) 
    // alert("inside results")
        courseResult = this.props.data.Courses.map(course => {
            this.state.coursestatus="Not Enrolled"
            this.state.regbtnflag = "Register"
            this.state.permission = "hidden"
if(this.props.data.courseres  != null){
            this.props.data.courseres.map(course1 => {
                console.log(course1.courseid,course.courseid)
                if(course1.courseid==course.courseid){
                   this.state.regbtnflag="Drop",
                   this.state.coursestatus=course1.coursestatus
                   console.log("coursesta",this.state.coursestatus)
                    }
                    if(this.state.coursestatus=="waitlist"){
                        this.state.permission = "visible"
                    }
                   
              
               
        })
    }
        console.log("coursestatus",this.state.coursestatus,course.courseid)
          
            return (
                
                <tr>
                <td>{course.courseterm}</td>
                <td>{course.courseid}</ td>
                <td>{course.coursename}</td>
                <td><button type="submit" class="btn btn-primary" onClick={this.cregister} value={JSON.stringify({"courseid":course.courseid,"courseterm":course.courseterm,"enrollstatus":this.state.regbtnflag})} >{this.state.regbtnflag}</button></td>
                <td>{this.state.coursestatus}</td>
                {/* <td><button onClick={this.requestpermission(course.courseid)} style={{visibility:this.state.permission}}>Request Permission Number</button></td> */}
                <td><button onClick={()=>{this.setState({courseidclick:course.courseid})}} data-toggle="modal" data-target="#myModal" style={{visibility:this.state.permission}}>Request Permission Number</button></td>
           
           
            <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog" style={{width:"30%"}}>
    
   
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
         <center> <h4 class="modal-title">Request Form</h4></center>
         <div class="lessspace"></div>
        </div>
        <div class="modal-body">
        <center>
        <form  style={{width:"1-0%"}}>
                <div class="row">
                <div class="space"></div>
                <div  class=" form-group col col-sm-5" > 
                
                    Enter Permission Number
               </div>
              

               <div class="col col-sm-7">
                    <input onChange={this.permissionchangeHandler} type="text" name="permissionnumber" class="form-control" placeholder="Permission Number"></input>
                </div>
                </div>
                <div class="space"></div>
             
                <div class="form-group" style={{width:"40%"}}>
                  <a href="http://localhost:3001/coursesearch">  <button onClick={this.requestpermission(this.state.courseidclick)}  type="submit" class="btn btn-primary btn-block">Submit</button></a>
                </div>        
            </form>
            </center>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
  </tr>
            )
        })
    
   
    return (
        
      <div>
     
      
          
        <div class="container" style={{width:"100%"}}>
                    
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Term</th>
                                    <th>Course Id</th>
                                    <th>Course Name</th>
                                    <th>Register</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {courseResult}
                            </tbody>
                        </table>
                </div> 
      </div>
    )
  }
}
