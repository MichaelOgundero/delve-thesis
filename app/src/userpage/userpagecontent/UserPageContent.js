import React,  {Component, useState} from 'react';



import { NavLink as Link} from 'react-router-dom';

import './UserPageContent.css'

import see from '../../images/see.png'
import noPoster from '../../images/imageUnavailable.png';
import loading from '../../images/theFlashLoading.gif';
import rateStar from '../../images/rateStar.png';
import detailStar from '../../images/detailStar.png'
import noProfilePic from '../../images/noProfilePic.png'

import { Container, Row,NavLink,
    Col,Card, CardImg, 
    CardText, CardBody,Table,ModalHeader,
    CardTitle,CardSubtitle, Button, Modal 
    ,Form, FormGroup, Label, Input, FormText,ModalBody} from 'reactstrap';

let movieId;
class UserPageContent extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            userMovies: [],
            isOpen: false,
            activeIndex: 0,
            ratingOpen: false,
            movieDescription: "",
            movieRating: 1,
            userId: 0,
            movieId: 0,
            profilePic: ""
        }
        this._isMounted = false;
        this.toggle = this.toggle.bind(this);
        this.getActive = this.getActive.bind(this);

        this.toggleRating = this.toggleRating.bind(this)
        this.getRatingActive = this.getRatingActive.bind(this)

        this.handleDescription = this.handleDescription.bind(this)
        this.handleRating = this.handleRating.bind(this)
        this.getMovieId = this.getMovieId.bind(this);
        this.handleRateMovie = this.handleRateMovie.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMovieId = this.getMovieId.bind(this);
    }

    getMovieID(val){
        movieId =val
        
        console.log(movieId)
       this.handleSubmit()
      }
      
      handleSubmit(){
        
        this.props.handleSeeMore(movieId)
    
      console.log("movie id sent"+ movieId)
      
    
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
        console.log(body.profilePicture);

        if(body.profilePicture === null){
            this.setState({
                profilePic: noProfilePic,
                userId: body.id
            })
        }else{
            this.setState({
                userId: body.id,
                profilePic: body.profilePicture
            })
        }

      

        const movieListResponse = await fetch(`api/users/${this.state.userId}/movies`)
        const movieListBody = await movieListResponse.json()
        //console.log(movieListBody);
        this.setState({
            userMovies: movieListBody
        })
        console.log(this.state.profilePic)
    }

    toggle(){
        const {isOpen} = this.state
        this.setState({
            isOpen: !isOpen
        })
    }
    toggleRating(){
        const {ratingOpen} = this.state
        this.setState({
            ratingOpen: !ratingOpen
        })
    }

    getActive(val){
     
        this.setState({
            activeIndex: val
        })

        this.toggle()
    }

    getMovieId(val){
        this.setState({
            movieId: val
        })

        //this.handleRateMovie()
    }

    getRatingActive(val){
        this.setState({
            activeIndex: val
        })

        this.toggleRating()
    }

    handleDescription(event){
        this.setState({
            movieDescription: event.target.value
        })
    }

    handleRating(event){
        this.setState({
            movieRating: event.target.value
        })
    }

    async handleRateMovie(event){
        event.preventDefault();
        const{userMovies, userId, movieDescription, movieRating, activeIndex, movieId} = this.state
        
        //console.log(movieDescription)
        //console.log(movieRating)
        const movieUpdate = {
            "movieTitle": "xxx",
	        "movieImage": "xxx",
	        "movieId": "xxx",
            "movieRating": movieRating,
            "movieDescription": movieDescription
        }


        await fetch(`api/users/${userId}/movieList/${movieId}`,{
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(movieUpdate)
        })

        userMovies[activeIndex].movieRating = movieRating;
        userMovies[activeIndex].movieDescription = movieDescription

        this.toggle()

        this.setState({
            movieDescription: "",
            movieRating: ""
        })

    }


    render(){

        const {userMovies, isOpen, activeIndex, ratingOpen, movieDescription, movieRating, userId, movieId} = this.state;
        console.log(userMovies)
        console.log(userId)
        console.log(movieId)
        console.log(movieDescription);
        console.log(movieRating);

        let Watchlist
        if(userMovies.length !== 0){
             Watchlist =()=>{
                const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px', color:"#FFFFFF" }} onClick={this.toggle}>&times;</button>;
                const externalCloseBtnRating = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px', color:"#FFFFFF" }} onClick={this.toggleRating}>&times;</button>;
    
                let card = []
    
                for(let i=0;i<userMovies.length;i++){
                    console.log(userMovies[i].id)
                    let poster = `http://image.tmdb.org/t/p/original${userMovies[i].movieImage}`
                    let rating, description;
                    if(userMovies[i].movieRating !== null){
                        rating = <CardSubtitle onClick={()=>{this.getRatingActive(i)}} style={{color:"#FFFFFF", fontSize:"13px", cursor:"pointer"}}>
                            <span> <img width="15px" height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${detailStar}`} alt=""></img></span>
                            {userMovies[i].movieRating}
                            </CardSubtitle>
                    }else{
                        rating = <CardSubtitle style={{color:"#FFFFFF", fontSize:"13px", fontStyle:"italic"}}>Not Rated</CardSubtitle>
                    }
    
                    //console.log(i)
                    card.push(
                    <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b"}} key={i}>
                        <tbody>
                        <tr >
                          <td style={{}}>
                            <CardImg style={{maxHeight:"138px", maxWidth:"92px",height:"138px", width:"92px", border:"4px solid black"}} src={`${poster}`} alt="Card image cap"></CardImg>
                          </td>
                          <td style={{ width:"400px", maxWidth:"400px", display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"16px", fontWeight:"bold"}}>{`${userMovies[i].movieTitle}`}</CardSubtitle>
                          </td>
                          <td style={{ width:"100px",maxWidth:"100px", display:"table-cell", verticalAlign:"middle"}}>
                            {rating}
                          </td>
                          <td  style={{ width:"300px",maxWidth:"300px", display:"table-cell", verticalAlign:"middle"}}>
                            <div style={{ }}>
                            <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", padding:"0"}}>
                                <div style={{  display:"inline-block"}}>        
                                <Button size="sm" onClick={()=>{this.getMovieID(userMovies[i].movieId)}} color="warning" style={{display:"inline-block", marginRight:"5px"}}><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${see}`} alt=""></img></span>See More</Button>
                                </div>
                            </NavLink> 
                                <Button size="sm" onClick={()=>{this.getActive(i); this.getMovieId(userMovies[i].id)}} color="warning" style={{display:"inline-block", marginLeft:"5px"}}><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"5px", paddingRight:"2px"}} src={`${rateStar}`} alt=""></img></span>Rate Movie</Button>
                            </div>
                          </td>
                        </tr> 
    
      
                        <Modal isOpen={isOpen} toggle={this.toggle} style={{background:"#1c1b1b"}} external={externalCloseBtn}>
                            <ModalHeader style={{background:"#1c1b1b"}}>
                                <CardTitle style={{color:"#FFFFFF", fontSize:"20px", fontWeight:"bold"}}>Rate {userMovies[activeIndex].movieTitle}</CardTitle>
                            </ModalHeader>
                            <ModalBody style={{background:"#1c1b1b"}}>
                                <Form >
                                    <FormGroup>
                                    <Label for="rating"><CardSubtitle style={{color:"#FFFFFF", fontSize:"16px"}}>How Many Stars</CardSubtitle></Label>
                                    <Input type="number" name="select" id="rating"
                                    value={movieRating} onChange={this.handleRating}/>
                                      
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="description"><CardSubtitle style={{color:"#FFFFFF", fontSize:"16px"}}>Description</CardSubtitle></Label>
                                        <Input type="textarea" name="text" id="description" 
                                        value={movieDescription} onChange={this.handleDescription}/>
                                    </FormGroup>
                                    <Button onClick={this.handleRateMovie} color="warning" style={{float:"right"}} type="submit">Submit</Button>
                                </Form>
                            </ModalBody>
                        </Modal> 
    
                        <Modal isOpen={ratingOpen} toggle={this.toggleRating} style={{background:"#1c1b1b"}} external={externalCloseBtnRating}>
                            <ModalHeader style={{background:"#1c1b1b"}}>
                                <CardTitle style={{color:"#FFFFFF", fontSize:"20px", fontWeight:"bold"}}>Rating for {userMovies[activeIndex].movieTitle}</CardTitle>
                            </ModalHeader>
                            <ModalBody style={{background:"#1c1b1b"}}>
                            <div style={{display: "inline-block",maxHeight:"138px", marginTop:"10px", marginBottom:"10px", maxWidth:"92px"}}>
                            <CardImg src={`http://image.tmdb.org/t/p/original${userMovies[activeIndex].movieImage}`} alt="Card image cap" style={{border:"4px solid black", height:"138px", width:"92px",maxHeight:"138px", maxWidth:"92px"}} />
                            </div>
                            <div style={{display: "inline-block", verticalAlign:"top",  maxHeight:"100%", maxWidth:"100%" , marginTop:"10px", marginBottom:"10px"}}> 
                            <CardBody style={{ margin:0, padding:0, marginLeft:"10px"}}>
                                <div style={{ maxHeight:"100%"}}>
                                    <CardText className="paddingCardbody" style={{color:"#FFFFFF", width:"100%", maxwidth:"100%", fontSize:"15px", textTransform:"capitalize"}}>Rating: {userMovies[activeIndex].movieRating} stars</CardText>
                                </div>
                                <div style={{ maxHeight:"100%", marginTop:"10px"}}>
                                <CardTitle className="paddingCardbody" style={{color:"#FFFFFF", width:"350px", maxwidth:"350px", fontSize:"15px"}}>Description: {userMovies[activeIndex].movieDescription}</CardTitle>
                                </div>
                            </CardBody>
                            </div>
                            </ModalBody>
                        </Modal>      
                        </tbody>
                    </div>
                    )
                }
    
                return card;
            }
        }else{
            Watchlist =()=> {
                let card = []
                card.push(
                <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b"}}>
                    <tbody>
                        <tr style={{}}>
                        <CardSubtitle style={{color:"#FFFFFF", fontWeight:"bold", fontSize:"20px", fontStyle:"italic"}}>List is currently empty</CardSubtitle>
                        </tr>
                    </tbody>
                </div>
                )

                return card;
            }
        }



        return(
            <div className="containerDiv" style={{background:"#1c1b1b" ,maxHeight:"100%"}}>
                <Container>
                    <div className="backgroundUpcoming" style={{maxHeight:"100%"}}>
                        <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b"}}>
                        <div style={{maxHeight:"100%", maxWidth:"100%"}}>
                        <CardImg src={this.state.profilePic} alt="Card image cap" style={{display:"inline-block",border:"4px solid black", height:"50px", width:"50px",maxHeight:"50px", maxWidth:"50px", marginBottom:"20px"}} />

                        <CardTitle style={{display:"inline-block",color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", background:"#1c1b1b", fontWeight:"bold", fontSize:"40px", marginLeft:"5px"}}>
                            Hi, {JSON.parse(localStorage.getItem("user"))}
                        </CardTitle>
                        </div>
                        </div>
                    </div>
                </Container>
                <Container>
                    <div className="backgroundUpcoming" style={{maxHeight:"100%"}}>
                      <div style={{background:"#1c1b1b", maxHeight:"100%",  marginTop:"30px"}}>
                        <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b", borderBottom:"1px solid #fec106"}}>
                          <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Watchlist</CardSubtitle>
                        </div>
                        <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px",background:"#1c1b1b"}}>
                          <div style={{background:"#1c1b1b", maxHeight:"100%", maxWidth:"100%"}}> 
                            <Table style={{maxWidth:"100%", maxheight:"100px"}}>
                                {Watchlist()}
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Container>

            </div>
        )
    }
}

export default UserPageContent;