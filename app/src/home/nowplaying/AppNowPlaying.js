import React,  {Component} from 'react';
import { NavLink as Link} from 'react-router-dom';

import { Container, Row,NavLink,
Col,Card, CardImg, 
CardText, CardBody,
CardTitle, Button} from 'reactstrap';

import './AppNowPlaying.css';
import star from '../../images/star.png';
import see from '../../images/see.png'


let movieId;

class AppNowPlaying extends Component{

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      movies: []
  
    }
    this._isMounted = false;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMovieId = this.getMovieId.bind(this);

  }

  getMovieId(val){
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
    this._isMounted && this.getInformation();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  

 

  async getInformation(){
    const response = await fetch('api/nowPlaying');
    const body = await response.json();
    this._isMounted && this.setState({
      movies: body,
      isLoading: false
    });
  }

    render() {
      const { movies, isLoading,} = this.state;
      
      let xxx;

      

     /* function getMovieId(val){
        movieId =val
        
        console.log(val)
       
      }*/

      //this.getMovieIdTop(getMovieId(val))

      if(isLoading){
        return(
          <div className="loader"></div>
        )
      }
      

      
       const myfunc =()=> {

        let card = []


        for(let i=0;i<movies.length;i++){

          let movieName = movies[i].title;
          if(movies[i].title.length>27){
            movies[i].title =  movies[i].title.substring(0,24) + "..." 
          }
          card.push(
            <Col xs="6" sm="4" key={i}>
            <div style={{paddingTop:"25px"}}>
              <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
                <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"auto",border:"4px solid black"}} src={`http://image.tmdb.org/t/p/original${movies[i].poster_path}`} alt="Card image cap"/>
                  <CardBody className="paddingCardbody">
                      <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={`${movieName}`}>{`${movies[i].title}`}</CardTitle>

                      <CardText className="paddingCardbody" style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}}>{`${movies[i].director}`}</CardText>
                      <CardText>
                          <p style={{float: "left", paddingRight:"3.5px"}}><img src={`${star}`} height="20px" width="20px" border="1px" alt=""></img></p>
                          <p style={{fontSize:"19px", color:"#FFFFFF"}}>{`${movies[i].vote_average}`}</p>
                      </CardText>
                      
                      <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", fontSize:"0", margin:"0", padding:"0"}}>
                          <div style={{  display:"inline-block"}}>
                          <Button onClick={()=>{this.getMovieId(`${movies[i].id}`)}}  color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${see}`} alt=""></img></span>See More</Button>{' '}
                          </div>
                     </NavLink>
                        

                      </CardBody>
                </Card>
            </div>
          </Col>
          )
        }


        
        return card;
      }
      console.log(movieId)

     /* const columns = movies.map((movie, index) => {
        movieIds.push(movie.id)
        console.log(movieIds)
        let movieName = movie.title;
        if(movie.title.length>27){
           movie.title =  movie.title.substring(0,24) + "..." 
        }

        return(
          <Col xs="6" sm="4" key={index}>
            <div style={{paddingTop:"25px"}}>
              <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
                <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"auto",border:"4px solid black"}} src={`http://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Card image cap"/>
                  <CardBody className="paddingCardbody">
                      <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={movieName}>{movie.title}</CardTitle>

                      <CardText className="paddingCardbody" style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}}>{movie.director}</CardText>
                      <CardText>
                          <p style={{float: "left", paddingRight:"3.5px"}}><img src={star} height="20px" width="20px" border="1px" alt=""></img></p>
                          <p style={{fontSize:"19px", color:"#FFFFFF"}}>{movie.vote_average}</p>
                      </CardText>
                      
                      
                        <NavLink tag={Link} exact to="/details" style={{ display:"inline-block", height:"100%", fontSize:"0", margin:"0", padding:"0"}}>
                          <div style={{  display:"inline-block"}}>
                          <Button onClick={this.getIndex(index), this.handleSubmit} color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
                          </div>
                        </NavLink>
                        

                      </CardBody>
                </Card>
            </div>
          </Col>
        );
      });*/

        return (
          
          <div className="containerDiv">
            <Container style={{paddingBottom: "10px",width:"100%", display:"block", marginLeft:"auto", marginRight:"auto"}}>
              <div className="borderNowplaying"> 
                <div>
                  <p className="nowPlayingText" style={{paddingRight:"5px"}}>Now Playing</p>
                </div> 
              </div>
              <div className="imagesNowPlaying"> 
                <Row noGutters={false} className="paddingFirst">
                  {myfunc()}
                </Row>
              </div>
            </Container>
          </div>

        );
      }

}




export default AppNowPlaying;