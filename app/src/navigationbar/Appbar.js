import React, {Component} from 'react';

import FacebookLogin from 'react-facebook-login'

import AppSignUp from '../signup/AppSignUp.js'
import AppSignIn from '../signin/AppSignIn.js'
import cinemaChair from '../images/collageMovies2.jpg';
import facebookIcon from '../images/facebookIcon.png';
import googleIcon from '../images/googleIcon.png';
import "../signup/AppSignUp.css";

import { NavLink as Link,Switch, Route} from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
   NavLink ,
   CardTitle,
   Col,Form,FormFeedback,FormGroup,UncontrolledAlert,
   Button,Modal, ModalHeader, ModalBody, ModalFooter,
   InputGroupAddon,UncontrolledDropdown,
   DropdownToggle,Container,
   DropdownMenu,
   DropdownItem,
  Input,
  InputGroup,
   Row} from 'reactstrap';

  import './Appbar.css';
  
  let xxx="";
  let vld
  let passwordMatch
 
 class Appbar extends Component{

  emptyUser = {
    username: "",
    email: "",
    password: "",
    profilePicture:null
}
  constructor(props) {
    super(props);

    //localStorage.setItem("currentUsername", "")

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      value: '',
      username:"",
      modal: false,
      signInModal: false,
      user: this.emptyUser,
      usernameVal: "",
      emailVal: "",
      passwordVal: "",
      passwordRptVal: "",
      signUpAlert:"",
      signInAlert:"",
      isLoggedIn: false
     
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordRpt = this.handleChangePasswordRpt.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleSubmitSignIn = this.handleSubmitSignIn.bind(this);

    this.toggle = this.toggle.bind(this);

    this.toggleSignIn = this.toggleSignIn.bind(this)
    this.toggleSignUp = this.toggleSignUp.bind(this)

    this.componentClicked = this.componentClicked.bind(this)
    this.responseFacebook = this.responseFacebook.bind(this)

    this._isMounted = false;

  }

  componentDidMount(){
    this._isMounted  = true;
    this._isMounted && this.getInformation();
   
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  async getInformation(){
    Promise.all([
        fetch(`api/users`)
    ]).
    then(([Usernames]) => {
        return Promise.all([Usernames.json()])
    }).
    then(([Usernames])=>{
        
      this.setState({
        usernames: Usernames
      })
  })

  

  }
  
  

  toggleSignUp(){
    const{modal} = this.state
    this.setState({modal:!modal})
  }

  toggleSignIn(){
    const{signInModal} = this.state;
    this.setState({signInModal: !signInModal})
  }


  handleChange(event){
    this.setState({
      value: event.target.value
    });
   // this.props.handleLanguage(event.target.value)
  
  }

  handleKeyPress(event){
    if(event.key === 'Enter'){
      console.log(this.state.value)
      
    }
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

  async handleSubmitSignIn(event){
    event.preventDefault();
    const {user, usernameVal, passwordVal} = this.state;
    user.username = usernameVal;
    user.password = passwordVal;

    const response = await fetch(`api/user/${user.username}`);
    const body = await response.json();

    console.log(body);
    if(body.username===user.username && body.password===user.password){
      localStorage.setItem("user", JSON.stringify(user.username))
      this.setState({
        username: JSON.parse(localStorage.getItem("user")),
        user: this.emptyUser,
        usernameVal: "",
        emailVal: "",
        passwordVal: "",
        passwordRptVal: ""
      })
    }else{
        this.setState({
          signInAlert:  <UncontrolledAlert color="danger" style={{zIndex:"10"}}>
                        Incorrect Credentials
                      </UncontrolledAlert>
        })
    }

  }
  
  async handleSubmitForm(event){
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
            signUpAlert:       <UncontrolledAlert color="success" style={{zIndex:"10"}}>
                                Registration successfull
                               </UncontrolledAlert>
        })

        //localStorage.setItem("currentUsername", JSON.stringify(user.username))
      
        localStorage.setItem("user", JSON.stringify(user.username))
        this.setState({
          username: JSON.parse(localStorage.getItem("user")),
          user: this.emptyUser,
          usernameVal: "",
          emailVal: "",
          passwordVal: "",
          passwordRptVal: ""

        })

    }else{
        this.setState({
            signUpAlert:       <UncontrolledAlert style={{position:"fixed", top:"0px", zIndex:"10", width:"100%"}} color="danger" style={{zIndex:"10"}}>
                                Fields can't be empty
                               </UncontrolledAlert>,
            user: this.emptyUser,
            usernameVal: "",
            emailVal: "",
            passwordVal: "",
            passwordRptVal: ""
        })
    }


  }

 

  handleSubmit(event){
    //console.log(event.target.value)
    //if(!this.state.value === " "){
      this.props.handleSearch(this.state.value)
 
   /* }else{
      this.props.handleSearchPage(this.state.value)
    }*/
   
    //this.props.handleSearch(this.state.searchPageValue)
    console.log("sent")
 
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentClicked(){
    console.log("clicked")
  }
  async responseFacebook(response){
    const{user} = this.state
    console.log(response)

    user.username = response.name
    user.email = response.email
    user.password = "password"
    user.profilePicture = response.picture.data.url

    this.setState({
      isLoggedIn: true
    })

    await fetch('api/user', {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(user)
  })


  }

  render() {
    console.log(this.state.usernames)
    console.log(this.state.value)
    console.log(this.props.username)
    const{username, modal,signInModal,usernameVal, emailVal, passwordVal, passwordRptVal,signUpAlert,signInAlert} = this.state
    //this.setUsername();
    console.log(username)

    

    //localStorage.setItem("currentUsername", JSON.stringify(""))

    let fbLogin
    if(this.state.isLoggedIn){
      localStorage.setItem("user", JSON.stringify(this.state.user.username))
    }else{
      fbLogin = (  <FacebookLogin
        appId="734552237042758"
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook} />)
    }


    if(localStorage.getItem("user")!== null){
      return(
        <div>
         <div style={{height:"85px", maxHeight:"100px", background: "black"}} className="topNavbarDiv">
          <Navbar  className="topNavbar" style={{background:"black",height:"85px", width: "800px", margin: "auto"}} expand="md">
           <NavLink className="navBarBrand" tag={Link} activeClassName="current" exact to="/">
              <NavbarBrand style={{fontSize:"35px", paddingTop:"40px"}} className="navBarBrand" >DELVE</NavbarBrand>
           </NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={{paddingTop:"50px", fontWeight:"bold"}}>
                <NavLink tag={Link} activeClassName="current" className="navLink" exact to="/todays50">Todays 50</NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar style={{paddingTop:"50px", fontWeight:"bold", background:"black"}}>
              <DropdownToggle nav caret style={{color:"#FFFFFF"}}>
               {JSON.parse(localStorage.getItem("user"))}
              </DropdownToggle>
              <DropdownMenu right style={{background:"#1c1b1b",border:"1px solid #FFFFFF"}}>
                <DropdownItem >
                  <NavLink tag={Link} style={{color:"#fec106"}}  exact to="/userpage">My Page</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem >
                  <NavLink tag={Link} style={{color:"#fec106"}} exact to="/" onClick={()=>{localStorage.removeItem("user")}}>Sign Out</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
              
            </Nav>
          </Collapse>
          </Navbar>
        </div>
        <div style={{background: "black", paddingBottom:"5px", paddingTop:"10px"}}>
            <div style={{height:"50px",width: "800px", margin:"auto", maxHeight:"50px", background: "black", borderTop:"1px solid #fec106"}} className="topNavbarDiv">
          <Navbar  className="topNavbar" style={{background:"black",height:"50px", width: "800px", margin: "auto"}} expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Row>
                <Col sm="12">
                 <InputGroup >
                  <Input type="text" style={{width:"690px", background:"transparent",  color:"white", border:"1px solid #fec106", marginLeft:"0px"}} placeholder="Search for a movie" value={this.state.value} onChange = {this.handleChange} onKeyPress={this.handleKeyPress}/>
                  <NavLink style={{ maxHeight:"38px", maxWidth:"75px"}} tag={Link} exact to="/search">
                  <InputGroupAddon addonType="append">
                      <Button onClick={this.handleSubmit} style={{maxHeight:"auto", maxWidth:"auto", position:"relative", left:"-8px", top:"-8px"}} outline color="warning">Search</Button>{' '}
                  </InputGroupAddon>
                  </NavLink>
                </InputGroup>
               
                </Col>
                </Row>
              </NavItem>
            </Nav>
          </Collapse>
          </Navbar>
    
        </div>

        </div>
      </div>
      )
    }else{
      const externalCloseBtn = <div style={{position:"relative"}}>
                                <button className="close"  style={{display:"inline-block", position: 'absolute', top: '15px', right: '15px', }} onClick={()=>this.setState({modal: !modal})}><span style={{color:"#FFFFFF"}}>&times;</span></button>
                              </div>
      const extCloseBtn = <div style={{position:"relative"}}>
                                <button className="close"  style={{display:"inline-block", position: 'absolute', top: '15px', right: '15px', }} onClick={()=>this.setState({signInModal: !signInModal})}><span style={{color:"#FFFFFF"}}>&times;</span></button>
                          </div>

      
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
         <div style={{height:"85px", maxHeight:"100px", background: "black"}} className="topNavbarDiv">
          <Navbar  className="topNavbar" style={{background:"black",height:"85px", width: "800px", margin: "auto"}} expand="md">
           <NavLink className="navBarBrand" tag={Link} activeClassName="current" exact to="/">
              <NavbarBrand style={{fontSize:"35px", paddingTop:"40px"}} className="navBarBrand" >DELVE</NavbarBrand>
           </NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={{paddingTop:"50px", fontWeight:"bold"}}>
                <NavLink tag={Link} activeClassName="current" className="navLink" exact to="/todays50">Todays 50</NavLink>
              </NavItem>

            <NavItem style={{paddingTop:"50px", fontWeight:"bold"}}>
                <NavLink tag={Link}  className="navLink" exact to="/" onClick={()=>this.setState({signInModal: !signInModal})}>Sign In</NavLink>
            </NavItem>
            <div style={{background:"#1c1b1b"}}>
                <Modal isOpen={signInModal} toggle={this.toggleSignIn} external={extCloseBtn} style={{ position:"relative", top:"20%", background:"#1c1b1b"}} size="lg">
                  
                <ModalBody style={{maxHeight:"600px", maxWidth:"100%",height:"600px", width:"100%", margin:"0", padding:"0", boxSizing:"border-box", background:"#1c1b1b"}}>
                
                <Container>
            {/*Navigation*/}
                <Row style={{paddingTop:"20px"}}>
                {signInAlert}
                    <div style={{background:"#1c1b1b", height:"600px", width:"700px", position:"absolute",
                                 left:"0", right:"0", top:"0", bottom:"0", margin:"auto",
                                 maxHeight:"100%", maxWidth:"100%"}}>
                        <div style={{position: "relative",display:"inline-block", width:"350px", height:"550px", marginLeft:"20px", marginTop:"25px", background:"#1c1b1b"}}>
                            <div style={{ marginTop:"10px", marginLeft:"10px", marginRight:"10px"}}>
                                <p style={{color:"#fec106", fontWeight:"bold", fontSize:"32px"}}>Sign In</p>
                            </div>
                            <div style={{ marginTop:"50px", marginLeft:"10px", marginRight:"10px"}}>
                                <Form onSubmit={this.handleSubmitSignIn}>
                                    <FormGroup>
                                        <Input style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}} 
                                        type="name" placeholder="Username" 
                                        value={usernameVal} onChange={this.handleChangeUsername}/>
                                    </FormGroup>

                                    <FormGroup>
                                        <Input style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}} 
                                        type="password" name="password" id="examplePassword" placeholder="Password" 
                                        value={passwordVal} onChange={this.handleChangePassword}/>

                                    </FormGroup>

                                    <div style={{marginTop:"50px"}}>
                                        <Button color="warning" size="lg" type="submit">Log in</Button>
                                    </div>
                                </Form>
                            </div>
                            
                            <div style={{marginTop:"155px", marginLeft:"10px", marginRight:"10px"}}>
                                {fbLogin}
                            </div>
                        </div>
                        <div style={{position: "absolute",display:"inline-block", width:"300px", height:"550px",marginLeft:"10px", marginTop:"25px", background:"#1c1b1b"}}>
                        
                            <div style={{maxWidth:"300px", maxHeight:"300px", marginTop:"105px"}}>
                                <img src={cinemaChair}   style={{maxWidth:"300px", maxHeight:"300px"}}></img>
                            </div> 
                            <div style={{marginLeft:"75px",marginTop:"60px"}}>
                                <NavLink tag={Link} exact to="/" onClick={()=>this.setState({signInModal: !signInModal, modal:!modal})} style={{margin:"0", padding:"0"}}>
                                    <p style={{color:"white", fontWeight:"bold",width:"136px"}}>Create an account</p>
                                </NavLink>  
                            </div>    
                        </div>
                    </div>
               
                </Row>
            </Container>
                </ModalBody>
                  
                </Modal>
            </div>



            <NavItem style={{paddingTop:"50px", fontWeight:"bold"}}>
              <NavLink tag={Link}  className="navLink" exact to="/" onClick={()=>this.setState({modal:!modal})}>Sign Up</NavLink>
            </NavItem>
            <div style={{background:"#1c1b1b"}}>
                <Modal isOpen={modal} toggle={this.toggleSignUp} external={externalCloseBtn} style={{ position:"relative", top:"20%", background:"#1c1b1b"}} size="lg">
                  
                <ModalBody style={{maxHeight:"600px", maxWidth:"100%",height:"600px", width:"100%", margin:"0", padding:"0", boxSizing:"border-box", background:"#1c1b1b"}}>
                
                <Container>
                  {/*Navigation*/}
                <Row style={{paddingTop:"20px"}}>
                {signUpAlert}
                
                    <div style={{ background:"#1c1b1b", height:"600px", width:"700px", position:"absolute",
                                 left:"0", right:"0", top:"0", bottom:"0", margin:"auto",
                                 maxHeight:"100%", maxWidth:"100%"}}>
                        <div style={{display:"inline-block", position:"relative", width:"300px", background:"#1c1b1b", height:"550px", marginLeft:"20px", marginTop:"25px"}}>
                            <div style={{maxWidth:"300px", maxHeight:"300px", marginTop:"105px"}}>
                                <img src={cinemaChair}   style={{maxWidth:"300px", maxHeight:"300px"}}></img>
                            </div> 
                            <div style={{marginLeft:"50px",marginTop:"62px"}}>
                                <NavLink tag={Link} exact to="/" onClick={()=>this.setState({modal:!modal,signInModal: !signInModal})} style={{margin:"0", padding:"0"}}>
                                    <p style={{color:"white", fontWeight:"bold"}}>I'm already a member</p>
                                </NavLink>  
                            </div>                          
                        </div>
                        <div style={{position: "absolute", display:"inline-block", width:"350px", height:"550px",marginLeft:"10px", marginTop:"25px", background:"#1c1b1b"}}>
                            <div style={{ marginTop:"10px", marginLeft:"10px", marginRight:"10px"}}>
                                <p style={{color:"#fec106", fontWeight:"bold", fontSize:"32px"}}>Sign Up</p>
                            </div>
                            <div style={{ marginTop:"50px", marginLeft:"10px", marginRight:"10px"}}>
                                <Form onSubmit={this.handleSubmitForm}>
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
                </ModalBody>
                  
                </Modal>
            </div>
              
            </Nav>
          </Collapse>
          </Navbar>
        </div>
        <div style={{background: "black", paddingBottom:"5px", paddingTop:"10px"}}>
            <div style={{height:"50px",width: "800px", margin:"auto", maxHeight:"50px", background: "black", borderTop:"1px solid #fec106"}} className="topNavbarDiv">
          <Navbar  className="topNavbar" style={{background:"black",height:"50px", width: "800px", margin: "auto"}} expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Row>
                <Col sm="12">
                 <InputGroup >
                  <Input type="text" style={{width:"690px", background:"transparent",  color:"white", border:"1px solid #fec106", marginLeft:"0px"}} placeholder="Search for a movie" value={this.state.value} onChange = {this.handleChange} onKeyPress={this.handleKeyPress}/>
                  <NavLink style={{ maxHeight:"38px", maxWidth:"75px"}} tag={Link} exact to="/search">
                  <InputGroupAddon addonType="append">
                      <Button onClick={this.handleSubmit} style={{maxHeight:"auto", maxWidth:"auto", position:"relative", left:"-8px", top:"-8px"}} outline color="warning">Search</Button>{' '}
                  </InputGroupAddon>
                  </NavLink>
                </InputGroup>
               
                </Col>
                </Row>
              </NavItem>
            </Nav>
          </Collapse>
          </Navbar>
    
        </div>

        </div>
 
      </div>


    
   
    
        
    );
    }
   
  }
}

export default Appbar;