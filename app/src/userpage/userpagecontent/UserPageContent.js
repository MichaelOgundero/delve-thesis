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
    }



    render(){

        return(
            <div className="containerDiv" style={{background:"#1c1b1b" ,maxHeight:"100%"}}>
                <Container>
                    <div>
                        HI AVA
                    </div>
                </Container>
            </div>
        )
    }
}

export default UserPageContent;