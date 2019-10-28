import React,  {Component} from 'react';

import { Container, Row,
Col,Card, CardImg, 
CardText, CardBody,
CardTitle, Button} from 'reactstrap';

import './AppNowPlaying.css';
import star from '../../images/star.png';
import see from '../../images/see.png'

class AppNowPlaying extends Component{

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      movies: []
    }
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
    const response = await fetch('api/nowPlaying');
    const body = await response.json();
    this._isMounted && this.setState({
      movies: body,
      isLoading: false
    });
  }

    render() {
      const { movies, isLoading} = this.state;

      if(isLoading){
        return(
          <div className="loader"></div>
        )
      }


      const columns = movies.map((movie, index) => {
        let movieName = movie.title;
        if(movie.title.length>27){
           movie.title =  movie.title.substring(0,24) + "..." 
        }

        return(
          <Col xs="6" sm="4" key={index}>
            <div style={{paddingTop:"25px"}}>
              <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
                <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"auto",border:"4px solid black"}} src={`http://image.tmdb.org/t/p/original${movie.posterPath}`} alt="Card image cap"/>
                  <CardBody className="paddingCardbody">
                      <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={movieName}>{movie.title}</CardTitle>

                      <CardText className="paddingCardbody" style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}}>{movie.director}</CardText>
                      <CardText>
                          <p style={{float: "left", paddingRight:"3.5px"}}><img src={star} height="20px" width="20px" border="1px" alt=""></img></p>
                          <p style={{fontSize:"19px", color:"#FFFFFF"}}>{movie.score}</p>
                      </CardText>
                      <Button  color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
                  </CardBody>


                </Card>
            </div>
          </Col>
        );
      });

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
                  {columns}
                </Row>
              </div>
            </Container>
          </div>

        );
      }

}




export default AppNowPlaying;