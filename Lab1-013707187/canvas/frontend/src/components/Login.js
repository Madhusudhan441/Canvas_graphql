import React, { Component } from 'react'
import { Redirect } from 'react-router';
import '.././App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { submitLogin } from '../actions/LoginActions';
import { stat } from 'fs';
import { browserHistory } from 'react-router'

class Login extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username: "",
            password: "",
            stufac: "student",
            authFlag: false
        }
    }
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    dropdownChangeHandler = (e) => {
        this.setState({
            stufac: e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    Login = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        let { username, password, stufac } = this.state;
        this.props.submitLogin(this.state.username, this.state.password, this.state.stufac)
        localStorage.setItem("loginid", username)
        // localStorage.setItem("stuname", password)
        localStorage.setItem('stufac', stufac)
        setTimeout(() => {
            console.log("hello", this.props.response, this.props.logsuccess)
            // alert(this.props.logsuccess)
            if (this.props.logsuccess === true) {
                // alert("logged")
           console.log("logged")
            }
        
            
        }, 500);

    }

    render() {
        let redirectVar = null;
        // alert(this.props.logsuccess)
    //    alert(this.props.logsuccess)
        if (this.props.logsuccess===true) {
         
            // localStorage.setItem('logsuccess',false)
            // alert(this.props.logsuccess)
            redirectVar = <Redirect to="/home" />
        }
        // else{

        //     redirectVar = <Redirect to="/login" />
        // }
        return (

            <div>
                {redirectVar}
                
                <center>
                    <div class="lessspace"> </div>
                    <h3 style={{ color: "#777777" }}>
                        <div class="aligncenter">Connecting to SJSU </div></h3>
                    <span style={{ color: "#777777" }}><div class="aligncenter">Sign-in with your San Jose State University account to access</div>
                        <div class="aligncenter"> SJSU Single Sign-on</div>
                    </span>

                    <div class="signin-form mx-auto">

                        <div class="border center">

                            <img src={require("./sjsu_login.png")} alt="SJSU LOGO" style={{ height: "100%", width: "60%" }}></img>
                        </div>
                        <div class="border">
                            <form >
                                <h5 class="text-center" style={{ color: "#5E5E5E", fontWeight: "bold" }}>Sign in</h5>
                                <div class="form-group">
                                    <input type="number" onChange={this.usernameChangeHandler} name="uname" class="form-control" placeholder="SJSU ID Number" required="required"></input>
                                </div>
                                <div class="form-group">
                                    <input type="password" onChange={this.passwordChangeHandler} name="pwd" class="form-control" placeholder="Password" required="required"></input>
                                </div>

                                <div class="form-group">
                                    <select name="dropdown" onChange={this.dropdownChangeHandler} class="col col-sm-4" style={{ marginLeft: "0px", padding: "6px", color: "grey" }}>
                                        <option value="student">Student</option>
                                        <option value="faculty">Faculty</option>
                                    </select>
                                </div>
                                <div class="space"></div>
                                <div class="form-group">
                                    <button onClick={this.Login} class="btn btn-primary btn-block">Sign in</button>
                                </div>
                                <div>
                                    <a href="/Signup">New user Create Account</a>
                                </div>

                            </form>
                        </div>

                    </div>
                </center>

            </div>

        )
    }
}
//subscribe to Redux store updates.
const mapStateToProps = (state) => ({
    // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
    logsuccess: state.loginState.logsuccess,
    response: state.loginState.response,
    stuname: state.loginState.stuname
})

export default connect(mapStateToProps, { submitLogin })(Login);
//export default Login;
