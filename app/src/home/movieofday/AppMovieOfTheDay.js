import React,  {Component} from 'react';
import { NavLink as Link} from 'react-router-dom';

import { Container,Card, NavLink, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,UncontrolledCollapse, Button} from 'reactstrap';

import './AppMovieOfTheDay.css';
import see from '../../images/see.png'
import star from '../../images/star.png';
import overView from '../../images/overView.png';
import { instanceOf } from 'prop-types';

let movieId;
let movieIds = []
let activeIndex;
class AppMovieOfTheDay extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      movies: [],
   
    }
    

    this._isMounted = false;
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  getIndex(val){
    activeIndex = val;
    
 }
  handleSubmit(){
  
    this.props.handleSeeMore(movieIds[activeIndex])
    console.log(movieIds[activeIndex])
  }

  componentDidMount(){
    this._isMounted  = true;
    this._isMounted && this.getInformation();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }


  async getInformation(){
    const response = await fetch('api/movieofday');
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
      movieIds.push(movie.movieId)
      console.log(movieIds)
      movieId = movie.id
      const genre = movie.genres;
      let genreContent
      if(genre.length === 0){
        genreContent = "N/A"
      }
      else if(genre.length === 1){
       genreContent = genre[0]
      }
      else if(genre.length === 2){
         genreContent = genre[0] + " | " + genre[1]
      }
      else {
        genreContent = genre[0] + " | " + genre[1] + " | " + genre[2];
      }
      

      const language = movie.language;
      const runtime = movie.runtime + " min";
      const year = movie.releaseDate.substring(0,4);
      return(

      <div style={{ maxHeight:"100%", maxwidth:"100%"}}>
        
        <div style={{display: "inline-block",maxHeight:"100%", marginTop:"10px", marginBottom:"10px", maxWidth:"185px"}} key={index}>
              <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
                <CardImg  
                  src={`http://image.tmdb.org/t/p/original${movie.posterPath}`} alt="Card image cap" style={{border:"4px solid black", height:"278px", width:"185px",maxHeight:"278px", maxWidth:"185px"}} />
                </Card>
        </div>

        <div style={{display: "inline-block", verticalAlign:"top",  maxHeight:"100%", maxWidth:"100%" , marginTop:"10px", marginBottom:"10px"}} key={index}> 
        
            
               <CardBody style={{ margin:0, padding:0, marginLeft:"40px"}}>
                 <div style={{ maxHeight:"100%"}}>
                 <CardTitle className="paddingCardbody" style={{color:"#fec106", width:"410px", maxwidth:"410px", fontSize:"32px", textTransform:"capitalize"}}>{movie.title}</CardTitle>
                 </div>

                 <div style={{ maxHeight:"100%"}}>
                 <CardText className="paddingCardbody" style={{color:"#FFFFFF", width:"410px", maxwidth:"410px", textTransform:"capitalize"}}>{movie.director}</CardText>

                 </div>

                 <div style={{ maxHeight:"100%"}}>
                 <CardSubtitle className="paddingCardbody" style={{color:"#FFFFFF", width:"410px", maxwidth:"410px", textTransform:"capitalize"}}>{genreContent} </CardSubtitle>

                 </div>

                 <div style={{ maxHeight:"100%"}}>
                  <CardText className="paddingCardbody" style={{color:"#FFFFFF", width:"410px", maxwidth:"410px"}}>
                    <small>{language} - {runtime} - {year}</small>
                  </CardText>
                 </div>

                 <div style={{ maxHeight:"100%"}}>
                  <CardText >
                    <p style={{float: "left", paddingRight:"3.5px"}}><img src={star} height="20px" width="20px" border="1px" alt=""></img></p>
                    <p style={{fontSize:"19px", color:"#FFFFFF"}}>{movie.score}</p>
                  </CardText>
                 </div>

                 <div style={{maxHeight:"100%"}}>
                  <div style={{paddingTop: "10px"}}>
                    <div style={{  display:"inline-block"}}>
                      <Button  id="toggler" color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"3px", paddingRight:"2px"}} src={overView} alt=""></img></span>Overview</Button>{' '}
                    </div>
         
                    <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", marginLeft:"5px", padding:"0"}}>
               
                      <Button onClick={this.getIndex(index),this.handleSubmit} color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
             
                    </NavLink>
 
    
        
                  </div>
                </div>

                 <div style={{ maxHeight:"100%", marginTop:"10px", marginBottom:"10px"}}>

                 <UncontrolledCollapse toggler="#toggler">
                    <CardText  style={{color:"#FFFFFF", width:"410px", maxwidth:"410px"}}>
                    <small >{movie.overview}</small>
                    </CardText >
                    </UncontrolledCollapse>



                 </div>

                 

              </CardBody>
            </div>
 
     
      </div>
      );
    });
    return (
          
      <div className="containerDiv">
        <Container style={{paddingBottom: "10px"}}>
          <div className="borderUpcoming"> 
            <div>
              <p className="UpcomingText" style={{paddingRight:"5px"}}>Movie of the Day</p>
            </div> 
          </div>

        <div className="backgroundUpcoming" style={{paddingLeft:"47px"}}>
          {columns}
        </div>
        </Container>
      </div>

    );
  }

}
export default AppMovieOfTheDay;