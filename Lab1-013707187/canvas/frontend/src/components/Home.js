import React, { Component } from 'react'
import '.././App.css';
import axios from 'axios';
import Navbar from './Navbar'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import BrowserHistory from 'react';
// const BrowserHistory = require('react-router/lib/BrowserHistory').default;

export default class Home extends Component {
    constructor(){
        super();
        this.state = {  
            courses:[],
            temp : 0

          }
        
    }  
    dragstart=(e)=>{
      // alert("drag start")
      // e.preventDefault();

      e.dataTransfer.setData("txt1", e.target.id);
      this.setState({
        temp:1
      })
      // var idx1 = e.target.id
      // var idx2 = this.state.courses.length -1;
      // console.log(idx1,idx2)
      // var b = this.state.courses[idx1];
      // this.state.courses[idx1] = this.state.courses[idx2];
      // this.state.courses[idx2] = b;
      // this.setState({
      //   temp:1
      // })
      console.log("courseres",this.state.courses)
    }
    dragend=(e)=>{
    
   
      e.preventDefault();
      // alert("hi")
     
    }
    drop=(val,e)=>{
      // alert("hi")
      e.preventDefault();
      var idx1 = e.dataTransfer.getData("txt1");
      var idx2 = val;
      console.log("id",val)
      console.log("hi",idx1)
      var b = this.state.courses[idx1];
      this.state.courses[idx1] = this.state.courses[idx2];
      this.state.courses[idx2] = b;

      console.log("courseres",this.state.courses)
    }
    componentDidUpdate(){

    }
    componentDidMount(){
 
      const dataq={
        id:localStorage.getItem('loginid'),
        stuname:localStorage.getItem('stuname'),
        stufac:localStorage.getItem('stufac')
      }
      axios.defaults.withCredentials = true;
     
        axios.post('http://localhost:3001/getcourselist',dataq)
        .then((response) => {
          if(response.status === 200){
            console.log("success dashboard")
            console.log(response.data)
        //update the state with the response data
        
          console.log(this.state.temp)
        this.setState({
            courses:response.data
        });
      
     
        console.log("coursresults",this.state.courses)
      }
    });
  

    }
    
  render() {
    // let redirectVar = null;
    //     if(localStorage.getItem('logsuccess')){
    //         redirectVar = <Redirect to= "/home"/>
    //     }
    //     else{
         
    //         redirectVar = <Redirect to= "/login"/>
    //     }
   
 
    let coursedet = this.state.courses.map((course,idx) => {
      
        return(
           
            <div  class = "col-12 col-sm-4 " id = {idx} draggable = "true" onDragOver={this.dragend} onDrop={this.drop.bind(this,idx)} onDragStart={this.dragstart}>
          
           <div class="shadow">
            <div class = " tileborder" style={{marginTop:"6%",boxShadow: "0px 0px 1px 0px grey",borderTopLeftRadius:"6px",borderTopRightRadius:"6px", backgroundColor:course.coursecol}} >
            
            <div class = "space"></div>
            <div class = "space" ></div> 
            <div class = "lessspace"></div>
            </div>
            <div class = "tileborder" style={{borderBottomLeftRadius:"6px",boxShadow: "0px 1px 1px 0px grey",borderBottomRightRadius:"6px"}}>
            <a onClick={sto=>{localStorage.setItem("courseid",course.courseid)}} href="/coursehome"><span style={{fontWeight:"bold",color:course.coursecol}}>{course.coursename}</span></a>
            <a href="#"><p style={{color:"#6C757C"}}>{course.coursename}</p></a>
            
            <button type="button" class="btn btn-link fal fa-bullhorn  designcol"></button>
            <button type="button" class="btn btn-link fal fa-file-edit designcol"></button>
            <button type="button" class="btn btn-link fal fa-envelope-open designcol"></button>
            <button type="button" class="btn btn-link fal fa-file  designcol"></button>
            </div>
            </div>
            </div>
        )
    })
  
    return (
      <div>
 {/* {redirectVar} */}
        <div className='container' style={{marginLeft:"-15px",float:"left",padding:"0px"}}>
        <div class="row rowC"></div>
        <div class='col col-sm-2'>
        <Navbar/>
        </div>
        <div class="col col-sm-10">
        <div class = "container" style={{marginLeft:"-15px",padding:"0px"}}>
        <div class = "row">

            <h2 >Dashboard</h2>
            <hr style={{borderTop: "1px solid #ccc"}}></hr>
        </div>  
       <div style={{width:"70%"}}>
       {coursedet}
       </div>
        
       </div>
      
        </div>
      </div>
      </div>
      
    )
  }
}
