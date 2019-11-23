import React,  {Component, useState} from 'react';
import { NavLink as Link} from 'react-router-dom';

import './UserPageContent.css'

import see from '../../images/see.png'
import noPoster from '../../images/imageUnavailable.png';
import loading from '../../images/theFlashLoading.gif';

import { Container, Row,NavLink,
    Col,Card, CardImg, 
    CardText, CardBody,Table,
    CardTitle,CardSubtitle, Button,Modal, ModalHeader, ModalBody, ModalFooter,
    Nav, NavItem, TabContent, TabPane,CardDeck} from 'reactstrap';

class UserPageContent extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading: false
        }
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted  = true;
        this._isMounted && this.getMovieList();
       
      }
    
      componentWillUnmount(){
        this._isMounted = false;
      }

    async getMovieList(){
        const username = JSON.parse(localStorage.getItem("user"))
        const response = await fetch('/api/user/'+username);
        const body = await response.json();
        console.log(body.id);

        const id = body.id;

        const movieListResponse = await fetch(`api/users/${id}/movies`)
        const movieListBody = await movieListResponse.json()
        console.log(movieListBody);

    }


    render(){

        return(
            <div className="containerDiv" style={{background:"#1c1b1b" ,maxHeight:"100%"}}>
                <Container>
                    <div className="backgroundUpcoming" style={{maxHeight:"100%"}}>
                        <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b"}}>
                        <div style={{maxHeight:"100%", maxWidth:"100%"}}>
                        <CardTitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", background:"#1c1b1b", fontWeight:"bold", fontSize:"40px"}}>
                            Hi, {JSON.parse(localStorage.getItem("user"))}
                        </CardTitle>
                        </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default UserPageContent;