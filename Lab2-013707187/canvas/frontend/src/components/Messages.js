import React, { Component } from 'react'
import axios from 'axios';

export default class Messages extends Component {
    constructor(props) {
        super(props);
        console.log(props); 
        this.state={
           
           StudentMessages:[],
           message:"",
           status:"",
           status1:0,
           temp:0,
           vis:"hidden"
        };
        
    }
onChangeHandler=(e)=>{
    this.setState({
        message:e.target.value
    })
}
    sendMessage=()=>{
        // alert("hi")
        if(this.state.message==null){
            alert("please enter message")
        }
        else{
        axios.defaults.withCredentials = true;
        const data={
         fromId:localStorage.getItem('loginid'),
        toId:this.props.student.studentid,
        fromName:localStorage.getItem('stuname'),
        message:this.state.message,
        studentname:this.props.student.name,
       }
           axios.post('http://localhost:3001/sendmessage',data)
           .then((response) => {
             if(response.status === 200){
                    //   alert("success")
               console.log("success")
               console.log(response.data)
           //update the state with the response data
           this.setState({
              status:response.data,
              message:""
           });
           console.log(this.state.status)
         }
       });
    }
    }
   
    componentDidUpdate(){
        // alert("hi")
        axios.defaults.withCredentials = true;
        const data={
         fromId:localStorage.getItem('loginid'),
         fromName:localStorage.getItem('stuname'),
        toId:this.props.student.studentid
       }
           axios.post('http://localhost:3001/getmessages',data)
           .then((response) => {
             if(response.status === 200){
                    //   alert("hello")
            //    console.log("success")
               console.log("temp",this.state.temp,response.data)
            //   alert(this.state.status1)
            if(this.state.status1!=2){
                this.setState({
                    StudentMessages:response.data,
                    status1:parseInt(this.state.status1) + 1,
                   
                })
                
            
            }
            else{
                this.state.status1=0
            }
            //    this.state.StudentMessages = response.daxta
                  
                  
               
           //update the state with the response data
        
        
        //    console.log(this.state.StudentMessages)
         }  
       });
    }

  render() {
    //   alert("hihi")
      console.log("props",this.props.student)
      console.log(this.state.StudentMessages)
      if(this.props.student.length>0 || this.props.student){
          this.state.vis = "visible"
      }
      else{
        this.state.vis = "hidden"
      }
      var messagelist = null;
      if(this.state.StudentMessages.length>0){
        var messagelist = this.state.StudentMessages.map(studentmessage => {
            return(
            <div>
            <label>{studentmessage[0].studentname}</label> &nbsp; &nbsp; &nbsp; &nbsp;
            <label>{studentmessage[1].message}</label>
            </div>
            )
        })
      }
    return (
      <div style={{visibility:this.state.vis,height:"700px"}} class="border">
      <div style={{height:"600px",overflow:"scroll"}}>
          {messagelist}
          </div>
          <div class="form-group">
                <input type="text"  class="form-control" value={this.state.message} placeholder="Enter your Message" onChange={this.onChangeHandler}></input>
               
                <button type="button" style={{width:"30%",marginLeft:"70%"}} class="form-control btn btn-primary"  onClick =  {this.sendMessage}>Send</button>
                </div>


      </div>
    )
  }
}
