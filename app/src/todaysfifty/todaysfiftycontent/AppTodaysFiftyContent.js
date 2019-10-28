import React,  {Component} from 'react';

import { Container,Card, CardImg, CardText, CardBody,
  CardTitle, Button, Alert } from 'reactstrap';

import './AppTodaysFiftyContent.css';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import see from '../../images/see.png';
import add from '../../images/addIcon.png';
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

let currentIndexOne;
let sectionOne;

let currentIndexTwo;
let sectionTwo;

let currentIndexThree;
let sectionThree;

let currentIndexFour;
let sectionFour;

let currentIndexFive;
let sectionFive;

class AppTodaysFiftyContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      movies: [],
      visibleOne: false,
      visibleTwo: false,
      visibleThree: false,
      visibleFour: false,
      visibleFive: false
    }
    this._isMounted = false;
  }


  sectionOneOnclick(movie){
    this.setState({visibleOne:true},()=>{
      window.setTimeout(()=>{
        this.setState({visibleOne:false})
      },3000)
    });
    currentIndexOne = sectionOne[movie].title;
  }
  sectionTwoOnclick(movie){
    this.setState({visibleTwo:true},()=>{
      window.setTimeout(()=>{
        this.setState({visibleTwo:false})
      },3000)
    });
    currentIndexTwo = sectionTwo[movie].title;
  }
  sectionThreeOnclick(movie){
    this.setState({visibleThree:true},()=>{
      window.setTimeout(()=>{
        this.setState({visibleThree:false})
      },3000)
    });
    currentIndexThree = sectionThree[movie].title;
  }
  sectionFourOnclick(movie){
    this.setState({visibleFour:true},()=>{
      window.setTimeout(()=>{
        this.setState({visibleFour:false})
      },3000)
    });
    currentIndexFour = sectionFour[movie].title;
  }
  sectionFiveOnclick(movie){
    this.setState({visibleFive:true},()=>{
      window.setTimeout(()=>{
        this.setState({visibleFive:false})
      },3000)
    });
    currentIndexFive = sectionFive[movie].title;
  }

  componentDidMount(){
    this._isMounted  = true;
    this._isMounted && this.getInformation();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }


  async getInformation(){

   
    const response = await fetch('api/todaysfifty');
    const body = await response.json();
    this._isMounted && this.setState({
      movies: body,
      isLoading: false
    });
  }

  addedMovie(){
    return(
      <div>
                  <Alert color="info" isOpen={this.state.visible} >
                    I am an alert and I will disappear in 2sec.!
                  </Alert>
      </div>
    );
  }

 


  render() {
    const { movies, isLoading} = this.state;

    let sectionOneTitle;
    let sectionTwoTitle;
    let sectionThreeTitle;
    let sectionFourTitle;
    let sectionFiveTitle;



    if(isLoading){
      return(
        <div className="loader"></div>
      )
    }

     sectionOne = movies.slice(0,10);
    const genreOne = sectionOne.map((movie, index) => {

        sectionOneTitle = movies[0].genreId;
        let movieName = movie.title;
        if(movie.title.length>27){
          movieName =  movieName.substring(0,24) + "..." 
        }
        if(movie.director === null){
          movie.director = "N/A"
        }
        let poster = `http://image.tmdb.org/t/p/original${movie.posterPath}`;
        if(movie.posterPath === null){
          poster = noPoster;
        }

      return(

        <div style={{paddingTop:"25px"}} key={index}>

        <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
          <CardImg  
            src={poster} alt="Card image cap" style={{border:"4px solid black", height:"278px", width:"185px",maxHeight:"278px", maxWidth:"185px",}} />
            <CardBody className="paddingCardbody">
                <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize", fontSize:"13px"}} title={movie.title}>{movieName}</CardTitle>
                <CardText className="paddingCardbody" style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}} title={movie.director}>{movie.director}</CardText>
                  <Button color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
                  <Button  onClick={ ()=>{this.sectionOneOnclick(index)}}  style={{color:"black", position:"absolute", right:"0px"}} color="warning" size="sm"><span> <img max-width="10px" max-height="10px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={add} alt=""></img></span>Add</Button>{' '} 

            </CardBody>

          </Card>
      </div>
      );
    });

    sectionTwo  = movies.slice(10,21);
    const genreTwo = sectionTwo.map((movie, index) => {
      sectionTwoTitle = movies[10].genreId;
      let movieName = movie.title;
      if(movie.title.length>27){
        movieName =  movieName.substring(0,24) + "..." 
      }
      if(movie.director === null){
        movie.director = "N/A"
      }
      let poster = `http://image.tmdb.org/t/p/original${movie.posterPath}`;
      if(movie.posterPath === null){
        poster = noPoster;
      }
    return(

      <div style={{paddingTop:"25px"}} key={index}>
      <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
        <CardImg  
          src={poster} alt="Card image cap" style={{border:"4px solid black", height:"278px", width:"185px",maxHeight:"278px", maxWidth:"185px",}} />
          <CardBody className="paddingCardbody">
              <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize", fontSize:"13px"}} title={movie.title}>{movieName}</CardTitle>
              <CardText className="paddingCardbody" style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}} title={movie.director}>{movie.director}</CardText>
              <CardText  style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}}>{movie.releaseDate}</CardText>
              <Button color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
              <Button onClick={()=>{this.sectionTwoOnclick(index)}} style={{color:"black", position:"absolute", right:"0px"}} color="warning" size="sm"><span> <img max-width="10px" max-height="10px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={add} alt=""></img></span>Add</Button>{' '}           </CardBody>
        </Card>
    </div>
    );
  });

    sectionThree = movies.slice(20,31)
    const genreThree = sectionThree.map((movie, index) => {
      sectionThreeTitle = movies[20].genreId;
      let movieName = movie.title;
      if(movie.title.length>27){
        movieName =  movieName.substring(0,24) + "..." 
      }
      if(movie.director === null){
        movie.director = "N/A"
      }
      let poster = `http://image.tmdb.org/t/p/original${movie.posterPath}`;
      if(movie.posterPath === null){
        poster = noPoster;
      }

    return(

      <div style={{paddingTop:"25px"}} key={index}>
      <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
        <CardImg  
          src={poster} alt="Card image cap" style={{border:"4px solid black", height:"278px", width:"185px",maxHeight:"278px", maxWidth:"185px",}} />
          <CardBody className="paddingCardbody">
              <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize", fontSize:"13px"}} title={movie.title}>{movieName}</CardTitle>
              <CardText className="paddingCardbody" style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}} title={movie.director}>{movie.director}</CardText>
              <CardText  style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}}>{movie.releaseDate}</CardText>
              <Button color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
              <Button onClick={()=>{this.sectionThreeOnclick(index)}} style={{color:"black", position:"absolute", right:"0px"}} color="warning" size="sm"><span> <img max-width="10px" max-height="10px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={add} alt=""></img></span>Add</Button>{' '}           </CardBody>
        </Card>
    </div>
    );
  });

  sectionFour = movies.slice(30,41);
  const genreFour = sectionFour.map((movie, index) => {
    sectionFourTitle = movies[30].genreId;
    let movieName = movie.title;
    if(movie.title.length>27){
      movieName = movieName.substring(0,24) + "..." 
    }
    if(movie.director === null){
      movie.director = "N/A"
    }

    let poster = `http://image.tmdb.org/t/p/original${movie.posterPath}`;
    if(movie.posterPath === null){
      poster = noPoster;
    }

  return(

    <div style={{paddingTop:"25px"}} key={index}>
    <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
      <CardImg  
        src={poster} alt="Card image cap" style={{border:"4px solid black", height:"278px", width:"185px",maxHeight:"278px", maxWidth:"185px",}} />
        <CardBody className="paddingCardbody">
            <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize", fontSize:"13px"}} title={movie.title}>{movieName}</CardTitle>
            <CardText className="paddingCardbody" style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}} title={movie.director}>{movie.director}</CardText>
            <CardText  style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}}>{movie.releaseDate}</CardText>
            <Button color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
            <Button onClick={()=>{this.sectionFourOnclick(index)}} style={{color:"black", position:"absolute", right:"0px"}} color="warning" size="sm"><span> <img max-width="10px" max-height="10px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={add} alt=""></img></span>Add</Button>{' '}         </CardBody>
      </Card>
    </div>
    );
  });

  sectionFive = movies.slice(40,51);
  const genreFive = sectionFive.map((movie, index) => {
    sectionFiveTitle = movies[40].genreId;
    let movieName = movie.title;
    if(movie.title.length>27){
      movieName =  movieName.substring(0,24) + "..." 
    }
    if(movie.director === null){
      movie.director = "N/A"
    }

    let poster = `http://image.tmdb.org/t/p/original${movie.posterPath}`;
    if(movie.posterPath === null){
      poster = noPoster;
    }

  return(

    <div style={{paddingTop:"25px"}} key={index}>
    <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
      <CardImg  
        src={poster} alt="Card image cap" style={{border:"4px solid black", height:"278px", width:"185px",maxHeight:"278px", maxWidth:"185px",}} />
        <CardBody className="paddingCardbody">
            <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize", fontSize:"13px"}} title={movie.title}>{movieName}</CardTitle>
            <CardText className="paddingCardbody" style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}} title={movie.director}>{movie.director}</CardText>
            <CardText  style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}}>{movie.releaseDate}</CardText>
            <Button color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
            <Button onClick={()=>{this.sectionFiveOnclick(index)}} style={{color:"black", position:"absolute", right:"0px"}} color="warning" size="sm"><span> <img max-width="10px" max-height="10px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={add} alt=""></img></span>Add</Button>{' '}         </CardBody>
      </Card>
    </div>
    );
  });

    return (
    
      <div className="containerDiv">
        <div style={{textAlign:"center", position:"absolute", left:"0"}}>

            <Alert style={{position:"fixed", top:"0px", zIndex:"10", width:"100%"}} color="success" isOpen={this.state.visibleOne} >
                 <div style={{display:"inline-block"}}> <span style ={{fontWeight:"bold", width:"100%"}}>{currentIndexOne}</span> <span>added to movie list</span></div>
            </Alert>

            <Alert style={{position:"fixed", top:"0px", zIndex:"10", width:"100%"}} color="success" isOpen={this.state.visibleTwo} >
                 <div style={{display:"inline-block"}}> <span style ={{fontWeight:"bold", width:"100%"}}>{currentIndexTwo}</span> <span>added to movie list</span></div>
            </Alert>

            <Alert style={{position:"fixed", top:"0px", zIndex:"10", width:"100%"}} color="success" isOpen={this.state.visibleThree} >
                 <div style={{display:"inline-block"}}> <span style ={{fontWeight:"bold", width:"100%"}}>{currentIndexThree}</span> <span>added to movie list</span></div>
            </Alert>

            <Alert style={{position:"fixed", top:"0px", zIndex:"10", width:"100%"}} color="success" isOpen={this.state.visibleFour} >
                 <div style={{display:"inline-block"}}> <span style ={{fontWeight:"bold", width:"100%"}}>{currentIndexFour}</span> <span>added to movie list</span></div>
            </Alert>

            <Alert style={{position:"fixed", top:"0px", zIndex:"10", width:"100%"}} color="success" isOpen={this.state.visibleFive} >
                 <div style={{display:"inline-block"}}> <span style ={{fontWeight:"bold", width:"100%"}}>{currentIndexFive}</span> <span>added to movie list</span></div>
            </Alert>
    
        </div>

        <Container style={{paddingBottom: "10px"}}>
          <div className="borderUpcoming"> 
            <div>
              <p className="UpcomingText" style={{paddingRight:"5px"}}>{sectionOneTitle}</p>
            </div> 
          </div>

        <div className="backgroundUpcoming">
          <div className="imagesUpcoming" > 
           <Carousel arrows={false} infinite={true} responsive={responsive}  autoPlay={this.props.deviceType !== "mobile" ? true : false} autoPlaySpeed={3000}>
            {genreOne}
            </Carousel>;
          </div>
        </div>
        </Container>

        <Container style={{paddingBottom: "10px"}}>
          <div className="borderUpcoming"> 
            <div>
              <p className="UpcomingText" style={{paddingRight:"5px"}}>{sectionTwoTitle}</p>
            </div> 
          </div>

        <div className="backgroundUpcoming">
          <div className="imagesUpcoming" > 
           <Carousel arrows={false} infinite={true} responsive={responsive}  autoPlay={this.props.deviceType !== "mobile" ? true : false} autoPlaySpeed={3000}>
            {genreTwo}
            </Carousel>;
          </div>
        </div>
        </Container>

        <Container style={{paddingBottom: "10px"}}>
          <div className="borderUpcoming"> 
            <div>
              <p className="UpcomingText" style={{paddingRight:"5px"}}>{sectionThreeTitle}</p>
            </div> 
          </div>

        <div className="backgroundUpcoming">
          <div className="imagesUpcoming" > 
           <Carousel arrows={false} infinite={true} responsive={responsive}  autoPlay={this.props.deviceType !== "mobile" ? true : false} autoPlaySpeed={3000}>
            {genreThree}
            </Carousel>;
          </div>
        </div>
        </Container>

        <Container style={{paddingBottom: "10px"}}>
          <div className="borderUpcoming"> 
            <div>
              <p className="UpcomingText" style={{paddingRight:"5px"}}>{sectionFourTitle}</p>
            </div> 
          </div>

        <div className="backgroundUpcoming">
          <div className="imagesUpcoming" > 
           <Carousel arrows={false} infinite={true} responsive={responsive}  autoPlay={this.props.deviceType !== "mobile" ? true : false} autoPlaySpeed={3000}>
            {genreFour}
            </Carousel>;
          </div>
        </div>
        </Container>

        <Container style={{paddingBottom: "10px"}}>
          <div className="borderUpcoming"> 
            <div>
              <p className="UpcomingText" style={{paddingRight:"5px"}}>{sectionFiveTitle}</p>
            </div> 
          </div>

        <div className="backgroundUpcoming">
          <div className="imagesUpcoming" > 
           <Carousel arrows={false} infinite={true} responsive={responsive}  autoPlay={this.props.deviceType !== "mobile" ? true : false} autoPlaySpeed={3000}>
            {genreFive}
            </Carousel>;
          </div>
        </div>
        </Container>
      </div>

    );
  }

}
export default AppTodaysFiftyContent;