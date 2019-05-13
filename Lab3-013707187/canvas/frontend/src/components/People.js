import React, { Component } from 'react'
import axios from 'axios';
export default class People extends Component {
    constructor(props) {
        super(props);
        this.state={
            people:[],
            btnvis:"hidden",
            status:"",
            status1:"",
            prevcount:0,
            nextcount:2,
            disablenextstat:"",
            disableprevstat:""
        }
        if(localStorage.getItem('stufac')=="faculty"){
          this.state.btnvis="visible"
        }
        else{
          this.state.btnvis="hidden"
        }
    }
    dropstud=(val)=>(e)=>{
      const data1={
        enrollstatus:"Drop",
        courseid:localStorage.getItem('courseid'),
        coursename:"",
        id:val.studentid,
        courseterm:"",
        stuname:val.username
        
    }
 alert("hi")
 axios.defaults.withCredentials = true;
 //make a post request with the user data
 axios.post('http://localhost:3001/regcourse',data1)
     .then(response => {
         console.log("Status Code : ",response.status);
         if(response.status === 200){
          
            console.log("success")
            console.log(response.data)
      
            this.setState({
              people:response.data,
              status:"updated"
          });
          
    // this.props.callbackFromParent();

         }
     });
    }
    componentDidUpdate(){
      
      const dataq={
        courseid:localStorage.getItem('courseid')
      }
      axios.defaults.withCredentials = true;
     
        axios.post('http://localhost:3001/getpeople',dataq)
        .then((response) => {
          if(response.status === 200){
            
            console.log("response",response.data)
         
        //update the state with the response data
     
     if(this.state.status1!="updated"){
      this.setState({
        people:response.data,
        status1:"updated"
    });
    
     }
      
      }
    });
    }
    next=(e)=>{
      if(this.state.nextcount<this.state.people.length){
      this.setState({
        nextcount:this.state.nextcount+2,
        prevcount:this.state.prevcount+2
      })
    }
      if(this.state.nextcount>=this.state.people.length){
       
        alert("no next items")

      }
      

    }
    previous=(e)=>{
      if(this.state.prevcount>1){
      this.setState({
        nextcount:this.state.nextcount-2,
        prevcount:this.state.prevcount-2
      })
    }
      if(this.state.prevcount<=0){  
        alert("no previous items")
      }
     

    }
  componentDidMount(){
        
      const dataq={
        courseid:localStorage.getItem('courseid')
      }
      axios.defaults.withCredentials = true;
     
        axios.post('http://localhost:3001/getpeople',dataq)
        .then((response) => {
          if(response.status === 200){
            
            console.log("response",response.data)
         
        //update the state with the response data
        this.setState({
            people:response.data
        });
      
      }
    });
    // var a = 1
    // while(a<4){
    //   a = a+1
    //   alert("hi")
    // }
  
      }
  render() {
    console.log(this.state.status)
    if(this.state.people.length>0){
      var getpeople=this.state.people.map((person,idx)=>{
      // alert(idx)
if(idx>=this.state.prevcount && idx<this.state.nextcount){
          return(
        <tr>
        <td>{person.studentname}</td>
        <td>{person.studentid}</ td>
        <td><button class="btn btn-primary" onClick={this.dropstud(person)} style={{visibility:this.state.btnvis}}>Drop Student</button></td>
    </tr>
          )
}
      })
      
    }
    return (
      <div>
          
        <div style={{float:"right",width:"80%"}}>
        <h3>People</h3>
          <table class="table">
                            <thead>
                                <tr>
                                    <th >Student Name</th>
                                    <th>Student Id</th>
                                     <th style={{visibility:this.state.btnvis}}>Drop Student</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {getpeople}
                              <button onClick={this.previous}   class="btn btn-primary" type="button" style={{marginLeft:"100px"}}>Previous</button>

                              <button onClick={this.next}  class="btn btn-primary" type="button" style={{marginLeft:"350px"}}>Next</button>
                            </tbody>
                        </table>
          
          </div>
          </div>
         
    
      
    )
  }
}
