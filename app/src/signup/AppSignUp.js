import React, {Component} from 'react';
import { NavLink as Link} from 'react-router-dom';
import AppFooter from '../footer/AppFooter.js'
import "./AppSignUp.css";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
     NavLink,
     Row,
     Container, Col
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
                <Navbar  style={{background:"black", margin: "auto"}} expand="md">
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
                
                    <div style={{border:"1px solid black", height:"700px", width:"700px", position:"absolute",
                                 left:"0", right:"0", top:"0", bottom:"0", margin:"auto",
                                 maxHeight:"100%", maxWidth:"100%", overflow:"auto"}}>
                        <div style={{display:"inline-block", position:"relative", width:"300px", height:"650px", border:"1px solid red", marginLeft:"20px", marginTop:"25px"}}>
                            <div style={{position: "absolute", bottom: "0px", width: "100%", height: "100px", border: "1px solid green"}}>
                                <NavLink tag={Link} activeClassName="current" exact to="/signIn">
                                    <p>I'm already a member</p>
                                </NavLink>   
                            </div>                            
                            </div>
                        <div style={{display:"inline-block", width:"350px", height:"650px", border:"1px solid blue",marginLeft:"10px", marginTop:"25px"}}>

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