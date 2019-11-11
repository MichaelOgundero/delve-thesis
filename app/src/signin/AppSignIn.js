import React, {Component} from 'react';
import { NavLink as Link} from 'react-router-dom';
import AppFooter from '../footer/AppFooter.js'
import facebookIcon from '../images/facebookIcon.png';
import googleIcon from '../images/googleIcon.png';
import cinemaChair from '../images/collageMovies.jpg';

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

  
class AppSignIn extends Component{

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
                
                    <div style={{background:"#1c1b1b", height:"600px", width:"700px", position:"absolute",
                                 left:"0", right:"0", top:"0", bottom:"0", margin:"auto",
                                 maxHeight:"100%", maxWidth:"100%"}}>
                        <div style={{position: "relative",display:"inline-block", width:"350px", height:"550px", marginLeft:"20px", marginTop:"25px", background:"#1c1b1b"}}>
                            <div style={{ marginTop:"10px", marginLeft:"10px", marginRight:"10px"}}>
                                <p style={{color:"#fec106", fontWeight:"bold", fontSize:"32px"}}>Sign In</p>
                            </div>
                            <div style={{ marginTop:"50px", marginLeft:"10px", marginRight:"10px"}}>
                                <Form>
                                    <FormGroup>
                                        <Input style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}} type="name" placeholder="Username" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Input style={{background:"#1c1b1b", border:"1px solid #fec106", color:"white"}} type="password" name="password" id="examplePassword" placeholder="Password" />
                                    </FormGroup>

                                    <div style={{marginTop:"50px"}}>
                                        <Button color="warning" size="lg">Log in</Button>
                                    </div>
                                </Form>
                            </div>
                            
                            <div style={{marginTop:"155px", marginLeft:"10px", marginRight:"10px"}}>
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
                        <div style={{position: "absolute",display:"inline-block", width:"300px", height:"550px",marginLeft:"10px", marginTop:"25px", background:"#1c1b1b"}}>
                            <div style={{maxWidth:"300px", maxHeight:"300px", marginTop:"105px"}}>
                                <img src={cinemaChair}   style={{maxWidth:"300px", maxHeight:"300px"}}></img>
                            </div> 
                            <div style={{marginLeft:"60px",marginTop:"60px"}}>
                                <NavLink tag={Link} activeClassName="current" exact to="/signUp" style={{margin:"0", padding:"0"}}>
                                    <p style={{color:"white", fontWeight:"bold",width:"136px"}}>Create an account</p>
                                </NavLink>  
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


export default AppSignIn;