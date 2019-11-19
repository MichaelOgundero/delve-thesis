import React, {Component} from 'react';
import { NavLink as Link, withRouter} from 'react-router-dom';

import AppFooter from '../footer/AppFooter.js'
import "./AppSignUp.css";
import cinemaChair from '../images/collageMovies2.jpg';
import facebookIcon from '../images/facebookIcon.png';
import googleIcon from '../images/googleIcon.png';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,UncontrolledAlert ,
    NavLink, Input,Alert,
    Row,FormFeedback, Button, Form,
    Container, FormGroup
   } from 'reactstrap';

   let vld
   let passwordMatch
   let alertSignup
class AppSignUp extends Component{

    emptyUser = {
        username: "",
        email: "",
        password: ""
    }

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            user: this.emptyUser,
            usernameVal: "",
            emailVal: "",
            passwordVal: "",
            passwordRptVal: "",
            signUpAlert:""
        };
        this.toggle = this.toggle.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordRpt = this.handleChangePasswordRpt.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
        this.routeChange = this.routeChange.bind(this);
      }

      routeChange(){
          let path = "/";
          this.props.history.push(path);
      }
    
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      handleChangeUsername(event){
        this.setState({
            usernameVal: event.target.value,
          });
      }
      handleChangeEmail(event){
        this.setState({
            emailVal: event.target.value
          });
      }
      handleChangePassword(event){
        this.setState({
            passwordVal: event.target.value
          });
      }
      handleChangePasswordRpt(event){
        this.setState({
            passwordRptVal: event.target.value
          });
      }

      async handleSubmit(event){
        event.preventDefault();
        const {user,usernameVal,emailVal,passwordVal,passwordRptVal} = this.state;
        user.username = usernameVal;
        user.email = emailVal;
        if(passwordRptVal === passwordVal){
            user.password = passwordVal;
        }else{
            alert("password not the same!!!")
        }
        
        if(user.username!==""&&user.email!==""&&user.password!==""){
            await fetch('api/user', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(user)
            })
            this.setState({
                signUpAlert:       <UncontrolledAlert color="success">
                                    Registration successfull
                                   </UncontrolledAlert>
            })

            //localStorage.setItem("currentUsername", JSON.stringify(user.username))
            this.props.getUsername(user.username);
            this.routeChange()

        }else{
            this.setState({
                signUpAlert:       <UncontrolledAlert color="danger">
                                    Fields can't be empty
                                   </UncontrolledAlert>
            })
        }


      }
    
      render() {
          const {usernameVal, emailVal, passwordVal, passwordRptVal, signUpAlert} = this.state;
          console.log(usernameVal)
          console.log(emailVal)
          console.log(passwordVal)
          console.log(passwordRptVal)

          let username =  <Input style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}} 
                        type="name" placeholder="Username" 
                         value={usernameVal} onChange={this.handleChangeUsername}/>

          vld = <Input style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}}  
          type="password" name="password" id="examplePassword" placeholder="Repeat Password" 
          value={passwordRptVal} onChange={this.handleChangePasswordRpt}/>;

            if(passwordVal!==""){
            if(passwordRptVal !== passwordVal){
                vld = <div><Input invalid ={true} style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}}  
                            type="password" name="password" id="examplePassword" placeholder="Repeat Password" 
                            value={passwordRptVal} onChange={this.handleChangePasswordRpt}/>
                            
                      </div> 
            }
            if(passwordRptVal === passwordVal){
                passwordMatch = ""
                vld = <div><Input valid style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}}  
                            type="password" name="password" id="examplePassword" placeholder="Repeat Password" 
                            value={passwordRptVal} onChange={this.handleChangePasswordRpt}/>
                            <FormFeedback valid>{passwordMatch}</FormFeedback>
                      </div> 
            }
        }

          
        return (
        <div>
            <div>
                <Navbar  style={{background:"#1c1b1b", margin: "auto"}} expand="md">
                <NavLink className="navBarBrand" tag={Link} activeClassName="current" exact to="/">
                    <NavbarBrand style={{fontSize:"25px"}}  className="navBarBrand" >DELVE</NavbarBrand>
                </NavLink>
                <NavbarToggler onClick={this.toggle}/>
                 <Collapse isOpen={this.state.isOpen} navbar>

                </Collapse>
                </Navbar>
            </div>
            {signUpAlert}
        
            <Container>
            {/*Navigation*/}
                <Row style={{paddingTop:"20px"}}>
                
                    <div style={{ background:"#1c1b1b", height:"600px", width:"700px", position:"absolute",
                                 left:"0", right:"0", top:"0", bottom:"0", margin:"auto",
                                 maxHeight:"100%", maxWidth:"100%"}}>
                        <div style={{display:"inline-block", position:"relative", width:"300px", background:"#1c1b1b", height:"550px", marginLeft:"20px", marginTop:"25px"}}>
                            <div style={{maxWidth:"300px", maxHeight:"300px", marginTop:"105px"}}>
                                <img src={cinemaChair}   style={{maxWidth:"300px", maxHeight:"300px"}}></img>
                            </div> 
                            <div style={{marginLeft:"50px",marginTop:"62px"}}>
                                <NavLink tag={Link} activeClassName="current" exact to="/signIn" style={{margin:"0", padding:"0"}}>
                                    <p style={{color:"white", fontWeight:"bold"}}>I'm already a member</p>
                                </NavLink>  
                            </div>                          
                        </div>
                        <div style={{position: "absolute", display:"inline-block", width:"350px", height:"550px",marginLeft:"10px", marginTop:"25px", background:"#1c1b1b"}}>
                            <div style={{ marginTop:"10px", marginLeft:"10px", marginRight:"10px"}}>
                                <p style={{color:"#fec106", fontWeight:"bold", fontSize:"32px"}}>Sign Up</p>
                            </div>
                            <div style={{ marginTop:"50px", marginLeft:"10px", marginRight:"10px"}}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                    {username}
                                    </FormGroup>
                                    <FormGroup>
                                        <Input style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}} 
                                        type="email" name="email" id="exampleEmail" placeholder="Email@Example.com" 
                                        value={emailVal} onChange={this.handleChangeEmail}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input  style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}} 
                                        type="password" name="password" id="examplePassword" placeholder="Password" 
                                        value={passwordVal} onChange={this.handleChangePassword}/>
                                    </FormGroup>
                                    <FormGroup>
                                    {vld}
                                    </FormGroup>
                                    <div style={{marginTop:"50px"}}>
                                        <Button color="warning" size="lg" type="submit">Register</Button>
                                    </div>
                                </Form>
                            </div>
                            
                            <div style={{marginTop:"50px", marginLeft:"10px", marginRight:"10px"}}>
                                <div style={{display:"inline-block"}}>
                                    <p style={{color:"white", fontWeight:"bold", fontSize:"15px"}}>Or Login with</p>
                                </div>
                                <div style={{display:"inline-block", background:"white", padding:"0", margin:"0", marginLeft:"15px"}}>
                                    <img src={facebookIcon} style={{height:"50px", width:"50px"}}></img>
                                </div>
                                <div style={{display:"inline-block", background:"white", padding:"0", margin:"0", marginLeft:"15px"}}>
                                    <img src={googleIcon} style={{height:"50px", width:"50px"}}></img>
                                </div>
                            </div>


                        </div>
                    </div>
               
                </Row>
            </Container>

        <div>
            <AppFooter/>
        </div>

        </div>




        );
      }

}


export default withRouter(AppSignUp);