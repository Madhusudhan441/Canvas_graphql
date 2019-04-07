import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import Messages from './Messages'
export default class Inbox extends Component {
    constructor(props) {
        super(props);
        console.log(props); 
        this.state={
           students:[],
           id:""
        };
        
    }
    sendid(val){
        console.log("value",val)
this.setState({
    id:val
})

    }


    componentDidMount(){
        axios.defaults.withCredentials = true;
        
           axios.post('http://localhost:3001/getstudents')
           .then((response) => {
             if(response.status === 200){
                      
               console.log("retrieved students")
               console.log(response.data)
           //update the state with the response data
           this.setState({
               students:response.data
           });
           console.log(this.state.students)
         }
       });
    }
 
  render() {
      var studentlist = null
      if(this.state.students.length>0){
        studentlist = this.state.students.map(student => {
            if(student.studentid!=localStorage.getItem('loginid')){
            return(
                <div>
<li style={{padding:"3px"}}>
    <div><a  onClick={this.sendid.bind(this,student)}>{student.name}</a></div>
</li>
<hr></hr>
</div>
            )
            }
        })
        
      }

    return (
      <div>
        <div className='container contmain' >
                    <div class="row rowC"></div>
                    <div class='col col-sm-2'>
                        <Navbar />
                    </div>
                <div class = "col col-sm-3">
                <ul style={{padding:"6px"}}>
                   {studentlist}
                   </ul>
                    </div>
                    
                <div class = "col col-sm-4">
              <Messages student={this.state.id}/>
                </div>
                    </div>
      </div>
    )
  }
}