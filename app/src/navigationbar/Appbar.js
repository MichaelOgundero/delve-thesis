import React, {Component} from 'react';


import { NavLink as Link} from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
   NavLink ,
   CardTitle,
   Col,
   Button,
   InputGroupAddon,UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
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
      value: '',
      loginNum: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleKeyPress = this.handleKeyPress.bind(this);
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


  render() {
    console.log(this.state.value)
    const {loginNum} = this.state
    if(loginNum === 1){
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
                Hi, Ava
              </DropdownToggle>
              <DropdownMenu right style={{background:"#1c1b1b"}}>
                <DropdownItem >
                  <NavLink tag={Link} style={{color:"#fec106"}}  exact to="/">My Page</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem >
                  <NavLink tag={Link} style={{color:"#fec106"}}  exact to="/">Sign Out</NavLink>
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
                <NavLink tag={Link} activeClassName="current" className="navLink" exact to="/signIn">Sign In</NavLink>
            </NavItem>

            <NavItem style={{paddingTop:"50px", fontWeight:"bold"}}>
              <NavLink tag={Link} activeClassName="current" className="navLink" exact to="/signUp">Sign Up</NavLink>
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