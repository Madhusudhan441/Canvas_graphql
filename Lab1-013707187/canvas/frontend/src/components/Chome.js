import React, { Component } from 'react'
import axios from 'axios';

export default class Chome extends Component {
  constructor(props) {
    super(props);
 

this.state = {
   btnvisible:"hidden",
   status:""
}
if(localStorage.getItem('stufac')=="student"){
  this.state.btnvisible = "hidden"
}
else{
  this.state.btnvisible = "visible"
  
}

}

generateButton=(e)=>{
  
  axios.defaults.withCredentials = true;
  console.log("res",data1)
  const data1 = {
    courseid:localStorage.getItem('courseid')
  }
  // alert("in results")
  //make a post request with the user data
  axios.post('http://localhost:3001/generatepermissioncodes',data1)
      .then(response => {
          console.log("Status Code : ",response.status);
          if(response.status === 200){
           alert("success")
             console.log("success")
             console.log(response.data)
             
          this.setState({
              status:"updated"
          })


          }
      });
}
  render() {
    return (
      <div>
        <h2>CMPE {localStorage.getItem('courseid')} - Spring 19</h2>
        <div class="space"></div>
        <p>Content goes here</p>
        <button onClick={this.generateButton} style={{visibility:this.state.btnvisible}} class="btn btn-primary">Generate Permission Numbers</button>
      </div>
    )
  }
}
