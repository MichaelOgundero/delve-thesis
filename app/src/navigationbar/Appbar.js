import React, {Component} from 'react';

import { NavLink as Link, Redirect  } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
   NavLink ,
   Col,
  Input,
  InputGroup,
   Row} from 'reactstrap';

  import './Appbar.css';
  


 class Appbar extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(event){
    this.setState({
      value: event.target.value.toUpperCase()
    });
  }

  redirectToTarget(){
    this.props.history.push('/search')
  }


  handleSubmit(event){
    if(event.key === 'Enter'){
      return <Redirect exact to="/search"/>
    }
    //event.preventDefault();
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    console.log(this.state.value)
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
                 <Input type="text" style={{width:"770px", background:"transparent", border:"none", color:"white"}} placeholder="Search for a movie" value={this.state.value} onChange = {this.handleChange} onKeyPress={this.handleSubmit}/>
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

export default Appbar;