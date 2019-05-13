import { connect } from 'react-redux';
import {signup } from '../actions/LoginActions';
import { Redirect } from 'react-router';
import React, { Component } from 'react'
import axios from 'axios';
import {withApollo} from 'react-apollo';
import { graphql } from 'react-apollo';

import { signupmutation } from '../../src/components/mutation/mutations';
class Signup extends Component {
  constructor() {
    super();
    this.state = {
        status:"",
        id:"",
        username:"",
        password:"",
        errormessage:"",
        owner:"student",
        status1:""
    }

}
signChangeHandler=(e)=>{
 
  if(e.target.name=="id"){
    this.setState({
      id:e.target.value
    })
  }
  if(e.target.name=="username"){
    this.setState({
      username:e.target.value
    })
  }
  if(e.target.name=="password"){
    this.setState({
      password:e.target.value
    })
  }
  if(e.target.name=="owner"){
    this.setState({
      owner:e.target.value
    })
  }
}

 signup=async(e)=>{
   alert("in signup")
   let {id,username,password,owner} = this.state
  await this.props.signupmutation({
 
    variables: {
      studentid : id,
            username: username,
            password : password,
            stufac:owner
     
    }
}).then(async(response)=>{
  alert("hi")
  console.log("res",response)
  localStorage.setItem("res",response.addUser)
  alert("hey")
 await this.setState({
   status1:"updated"
 })
 alert(response.data.addUser)

})
.catch((err)=>{
  console.log(err)
  alert(err)
  localStorage.setItem("Error",err)
  alert("in error")
  alert("sdds")

 
})




//   console.log("hi")
//   let {id,username,password,owner} = this.state
// await this.props.signup(id,username,password,owner)
// await alert("signup"+this.props.output)
// await this.props.client.query({
//   query : signup,
//   variables: {

//       studentid : id,
//       username: username,
//       password : password,
//       stufac:owner
//   }
// })
// .then(async (response)=>{
// console.log("response",response)

// })
 }
  render() {
  //   let redirectVar = null
  // alert("helo")
    
  //   if (this.props.output==200) {
  //     alert("mem"+this.props.output)
  //     redirectVar = <Redirect to="/login" />
  // }

 
    return (
      <div>
        {/* {redirectVar} */}
        <center>
    <div class = "lessspace"> </div>
<h3 style={{color:"#777777"}}>
  <div class = "aligncenter">Connecting to SJSU </div></h3>
  <span style={{color:"#777777"}}><div class = "aligncenter">Sign-in with your San Jose State University account to access</div>
  <div class = "aligncenter"> SJSU Single Sign-on</div>
  </span>

<div class="signin-form mx-auto">

<div class = "border center">

<img  src={require("./sjsu_login.png")} alt = "SJSU LOGO" style={{height:"100%",width:"60%"}}></img>
</div>
<div class = "border">
            <form>
              <label>{this.state.errormessage}</label>
                <h5 class="text-center" style={{color:"#5E5E5E",fontWeight:"bold"}}>Sign up</h5>       
                <div class="form-group">
                    <input type="number"  onChange={this.signChangeHandler} name="id" class="form-control" placeholder="SJSU ID Number" required="required"></input>
                </div>
                <div class="form-group">
                    <input type="text"  onChange={this.signChangeHandler} name="username" class="form-control" placeholder="Name" required="required"></input>
                </div>
                <div class="form-group">
                    <input type="password" onChange={this.signChangeHandler}  name="password" class="form-control"  placeholder="Password" required="required"></input>
                </div>
                
                <div class="form-group">
                <select onChange={this.signChangeHandler} name="owner" class="form-control">
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                 
                </select>
                </div>
                
                
                <div class="form-group">
                    <button onClick={this.signup} class="btn btn-primary btn-block">Sign up</button>
                </div>        
                <div>
                    <a href="/login">Login here</a>
                </div>
            </form>
    </div>
    
    </div>
    </center>
 
      </div>
    )
  }
}
// const mapStateToProps = (state) => ({
//   // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
//   output: state.signupState.output
// })

export default graphql(signupmutation, { name: "signupmutation" })(Signup);
