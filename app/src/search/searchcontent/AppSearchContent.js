import React,  {Component} from 'react';

import { Container, Row,
Col,Card, CardImg, 
CardText, CardBody,
CardTitle, Button} from 'reactstrap';

import './AppSearchContent.css';
import noPoster from '../../images/imageUnavailable.png';
import see from '../../images/see.png'

class AppSearchContent extends Component{

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
      const x = "joker"
    const response = await fetch('api/search/' + this.props.searchvalue);
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
        let poster = `http://image.tmdb.org/t/p/original${movie.poster_path}`;
        if(movie.poster_path === null){
          poster = noPoster;
        }

        return(
          <Col xs="6" sm="4" key={index}>
            <div style={{paddingTop:"25px"}}>
              <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
                <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"auto",border:"4px solid black"}} src={poster} alt="Card image cap"/>
                  <CardBody className="paddingCardbody">
                      <CardTitle  style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={movieName}>{movie.title}</CardTitle>
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
                  <p className="nowPlayingText" style={{paddingRight:"5px"}}>Results for "{this.props.searchvalue}"</p>
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




export default AppSearchContent;