import React, {Component} from 'react';
import { NavLink as Link} from 'react-router-dom';

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
    NavItem,
     NavLink,
     Row,
     Container, Col, Button, Form, FormGroup, Label, Input
   } from 'reactstrap';


class AppSignUp extends Component{

    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    
      render() {
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
                                <Form>
                                    <FormGroup>
                                        <Input style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}} type="name" placeholder="Username" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}} type="email" name="email" id="exampleEmail" placeholder="Email@Example.com" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}} type="password" name="password" id="examplePassword" placeholder="Password" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}}  name="password" id="examplePassword" placeholder="Repeat Password" />
                                    </FormGroup>
                                    <div style={{marginTop:"50px"}}>
                                        <Button color="warning" size="lg">Register</Button>
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


export default AppSignUp;