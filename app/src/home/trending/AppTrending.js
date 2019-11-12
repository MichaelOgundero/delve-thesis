import React,  {Component} from 'react';
import { NavLink as Link} from 'react-router-dom';

import { Container,Card, CardImg, NavLink, CardBody,
  CardTitle, Button} from 'reactstrap';

import './AppTrending.css';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import see from '../../images/see.png'
import noPoster from '../../images/imageUnavailable.png';


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
let movieId;
class AppTrending extends Component{
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

   
    const response = await fetch('api/trending');
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
    const movieRow =()=>{
      let card = []
    
    for(let i=0;i<movies.length;i++){
      let movieName = movies[i].title;
      if(movies[i].title.length>27){
        movies[i].title =  movies[i].title.substring(0,24) + "..." 
      }
      let poster = `http://image.tmdb.org/t/p/original${movies[i].poster_path}`;
      if(!movies[i].hasOwnProperty("poster_path")){
        poster = noPoster;
      }
      card.push(
        <div style={{paddingTop:"25px"}} key={i}>
          <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
            <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"185px",border:"4px solid black"}} src={`${poster}`} alt="Card image cap"/>
              <CardBody className="paddingCardbody">
                  <CardTitle  style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={`${movieName}`}>{`${movies[i].title}`}</CardTitle>
                  
                  <NavLink tag={Link} exact to="/details" style={{ display:"inline-block", height:"100%", fontSize:"0", margin:"0", padding:"0"}}>
                    <div style={{  display:"inline-block"}}>
                        <Button onClick={()=>{this.getMovieId(`${movies[i].id}`)}}  color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${see}`} alt=""></img></span>See More</Button>{' '}
                      </div>
                  </NavLink>      
                    

                  </CardBody>
            </Card>
        </div>
    
      )
    }
      return card
  }
    /*const columns = movies.map((movie, index) => {
        let movieName = movie.title;
        if(movie.title.length>27){
           movie.title =  movie.title.substring(0,24) + "..." 
        }        
      return(

        <div style={{paddingTop:"25px"}} key={index}>
        <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
          <CardImg  
            src={`http://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Card image cap" style={{border:"4px solid black", height:"278px", width:"185px",maxHeight:"278px", maxWidth:"185px",}} />
            <CardBody className="paddingCardbody">
                <CardTitle  style={{color:"#fec106", textTransform:"capitalize", fontSize:"13px"}} title={movieName}>{movie.title.substring(0,27)}</CardTitle>
                <NavLink tag={Link} exact to="/details" style={{ display:"inline-block", height:"100%", fontSize:"0", margin:"0", padding:"0"}}>
                  <div style={{ display:"inline-block"}}>
                    <Button color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
                  </div>
                </NavLink>             
            </CardBody>
          </Card>
      </div>
      );
    });*/
    return (
          
      <div className="containerDiv" style={{paddingBottom: "10px"}}>
        <Container style={{paddingBottom: "10px"}}>
          <div className="borderUpcoming"> 
            <div>
              <p className="UpcomingText" style={{paddingRight:"5px"}}>Trending</p>
            </div> 
          </div>

        <div className="backgroundUpcoming">
          <div className="imagesUpcoming" > 
           <Carousel arrows={false} infinite={true} responsive={responsive}  autoPlay={this.props.deviceType !== "mobile" ? true : false} autoPlaySpeed={3000}>
            {movieRow()}
            </Carousel>;
          </div>
        </div>
        </Container>
      </div>

    );
  }

}
export default AppTrending;