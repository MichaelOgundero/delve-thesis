import React, {Component} from 'react';

import { NavLink as Link} from 'react-router-dom';


import {
  Carousel as ABD,
  NavLink,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption, Button,
  Modal, ModalHeader, ModalBody,
  Container, Row,
  Col,Card, CardImg, 
  CardText, CardBody,
  CardTitle,CardSubtitle,UncontrolledCollapse
} from 'reactstrap';


import ErrorBoundary from '../../errorhandling/ErrorBoundary.js' 

import './AppHome.css';
import '../carousel/Appcarousel.css';
import Appbar from '../../navigationbar/Appbar.js';

import AppFooter from '../../footer/AppFooter.js'
import loading from '../../images/theFlashLoading.gif'


import ReactPlayer from 'react-player';

import see from '../../images/see.png'
import play from '../../images/play.png'
import noPoster from '../../images/imageUnavailable.png';

import '../nowplaying/AppNowPlaying.css';
import star from '../../images/star.png';

import '../upcoming/AppUpcoming.css';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import '../trending/AppTrending.css';

import overView from '../../images/overView.png';

const items = [
  {
    id: 1,
    altText: '',
    caption: '',
    overview:'',
    src: ''
  },
  {
    id: 2,
    altText: '',
    caption: '',
    overview:'',
    src: ''
  },
  {
    id: 3,
    altText: '',
    caption: '',
    overview:'',
    src: ''
  },
  {
    id: 4,
    altText: '',
    caption: '',
    overview:'',
    src: ''
  },
  {
      id: 5,
      altText: '',
      caption: '',
      overview:'',
      src: ''
  }
];

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


const movieTitles = []
const movieTrailers = []
const movieIds = []

let movieId;

let movieIdsDay = []
let active_Index;

class AppHome extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      searchValue: " ",
      seeMoreValue:" ",
      activeIndex: 0,
      carouselMovies: [],
      nowPlayingMovies:[],
      upcomingMovies:[],
      movieOfDayMovie:[],
      trendingMovies:[],
      trailers: [],
      modal: false,
      playing: true
    }

    this._isMounted = false;
    //carousel
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);

    //nowplaying
    this.getMovieId = this.getMovieId.bind(this);

  
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSeeMore = this.handleSeeMore.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
  
  }


    componentDidMount(){
    this._isMounted  = true;
    this._isMounted && this.getInformation();
   
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  getMovieId(val){
    movieId =val
    
    console.log(movieId)
    this.handleSeeMore(movieId)
  }

  getIndex(val){
    active_Index = val;
    this.handleSeeMore(movieIdsDay[active_Index])
 }

  async getInformation(){
    //475557 joker
    //299536 infinity war
    //1273 tmnt
    //420809 malfic
    //this.props.seeMoreValue


    Promise.all([
        fetch(`api/nowPlayingCarousel`),
        fetch(`api/nowPlaying`),
        fetch(`api/upcoming`),
        fetch(`api/movieofday`),
        fetch(`api/trending`)

    ]).

    then(([carousel,nowPlaying, upcoming, movieOfDay, trending]) => {
        return Promise.all([carousel.json(), nowPlaying.json(),upcoming.json(),movieOfDay.json(),trending.json()])
    }).
    
    then(([carousel,nowPlaying, upcoming, movieOfDay, trending])=>{
        this._isMounted && this.setState({
            carouselMovies: carousel,
            nowPlayingMovies: nowPlaying,
            upcomingMovies: upcoming,
            movieOfDayMovie: movieOfDay,
            trendingMovies:trending,
            isLoading: false
          });
    })

 

  }

  

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  play() {
    this.setState({playing: true});
  }

  stop() {
    this.setState({playing: false});
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      playing: !this.state.playing
    });
  }

  setMovieId(val){
    this.setState({
      movieId: val
    })
  }



  getOverviewButton(movie, activeIndex){
    const ytKey = movieTrailers[activeIndex];
     const asd = movieIds[activeIndex]

     const externalCloseBtn = <div style={{position:"relative"}}>
                              <CardSubtitle style={{display:"inline-block", position: 'absolute', top: '15px', left: '15px', color:"#FFFFFF", fontSize:"32px"}}>{movieTitles[activeIndex]} Trailer</CardSubtitle>
                              <button className="close"  style={{display:"inline-block", position: 'absolute', top: '15px', right: '15px', }} onClick={()=>{this.toggle()}}><span style={{color:"#FFFFFF"}}>&times;</span></button>
                              </div>
     
    return(
      <div>
        <div>{movie.overview}</div>
        <div style={{paddingTop: "10px"}}>
          <div style={{  display:"inline-block"}}>
            <Button onClick={()=> this.toggle()} color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"4px", paddingRight:"2px"}} src={play} alt=""></img></span>Watch Trailer</Button>{' '}
          </div>
         
            <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", marginLeft:"5px", padding:"0"}}>
               
                      <Button onClick={()=>{this.handleSeeMore(asd)}} color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
             
            </NavLink>
 
    
        
        </div>
        <div>
          <Modal size="lg" isOpen={this.state.modal} external={externalCloseBtn} style={{ position:"relative", top:"20%"}}>
          
          <ModalBody style={{maxHeight:"100%", maxWidth:"100%",height:"100%", width:"100%", margin:"0", padding:"0", boxSizing:"border-box"}}>
          <div className="player-wrapper">
            <ReactPlayer
            url= {`https://www.youtube.com/watch?v=${ytKey}`}
            className='react-player'
            playing = {true}
            width='100%'
            height='100%'
            controls ={true}
            light = {true}
            loop = {true}
            />
            </div>
            </ModalBody>
            </Modal>
          </div>
      </div>
    )
  }
  




  handleSearch(value){
    this.setState({searchValue: value});
    this.props.getSearchValue(value);
  }

  handleSeeMore(value){
    this.setState({seeMoreValue: value});
    this.props.getSeeMoreValue(value);
  }

  handleLoading(val){
    this.setState({
      isLoading: val
    })
  }



  
  render(){
    const { activeIndex, carouselMovies, nowPlayingMovies,
      upcomingMovies,movieOfDayMovie, trendingMovies,
       isLoading} = this.state;

    console.log(this.state.seeMoreValue + " got it")
   // this.sendSearchValue()
    if(isLoading){
      return(
        <div className="page-container" style={{background:"#fec106"}}>
          <div className="content-wrap">
            <Appbar handleSearch={this.handleSearch}/>
              <div style={{width:"100%", height:"900px", background:"#1c1b1b", border:"1px solid #1c1b1b"}}>
                <div style={{display:"block", marginLeft:"auto", marginRight:"auto", width:"200px", height:"150px", marginTop:"300px"}}>
                  <div style={{marginLeft:"0",width:"150px", height:"150px"}}>
                    <img src={loading} alt="this slowpoke moves"  width="150px" height="150px"/>
                  </div>
                  <div style={{marginLeft:"53px"}}>
                    <span style={{color:"#FFFFFF"}}>Loading data...</span>
                  </div>
                </div>   
              </div> 
            <AppFooter/>
          </div>
        </div>
      )
    }
    const slides = carouselMovies.map((movie, index) => {
     
      movieTrailers.push(movie.youtubeKey);
      movieTitles.push(movie.title)
      movieIds.push(movie.id)
      console.log(movie.id)
      return (
 
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={index}
          onExiting={this.onExiting}
          onExited={this.onExited} 
          
           
        >
          <img className = "centerImage"  src={`http://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt="" />
          <CarouselCaption  className="content"  captionText={this.getOverviewButton(movie, activeIndex)} captionHeader={movie.title} />
        </CarouselItem>

      );
    });

    const nowPlaying =()=> {

      let card = []


      for(let i=0;i<nowPlayingMovies.length;i++){

        let movieName = nowPlayingMovies[i].title;
        if(nowPlayingMovies[i].title.length>27){
          nowPlayingMovies[i].title =  nowPlayingMovies[i].title.substring(0,24) + "..." 
        }
        card.push(
          <Col xs="6" sm="4" key={i}>
          <div style={{paddingTop:"25px"}}>
            <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
              <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"auto",border:"4px solid black"}} src={`http://image.tmdb.org/t/p/original${nowPlayingMovies[i].poster_path}`} alt="Card image cap"/>
                <CardBody className="paddingCardbody">
                    <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={`${movieName}`}>{`${nowPlayingMovies[i].title}`}</CardTitle>

                    <CardText className="paddingCardbody" style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}}>{`${nowPlayingMovies[i].director}`}</CardText>
                    <CardText>
                        <p style={{float: "left", paddingRight:"3.5px"}}><img src={`${star}`} height="20px" width="20px" border="1px" alt=""></img></p>
                        <p style={{fontSize:"19px", color:"#FFFFFF"}}>{`${nowPlayingMovies[i].vote_average}`}</p>
                    </CardText>
                    
                    <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", fontSize:"0", margin:"0", padding:"0"}}>
                        <div style={{  display:"inline-block"}}>
                        <Button onClick={()=>{this.getMovieId(`${nowPlayingMovies[i].id}`)}}  color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${see}`} alt=""></img></span>See More</Button>{' '}
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

    const upcoming =()=>{
      let card = []
    
    for(let i=0;i<upcomingMovies.length;i++){
      let movieName = upcomingMovies[i].title;
      if(upcomingMovies[i].title.length>27){
        upcomingMovies[i].title =  upcomingMovies[i].title.substring(0,24) + "..." 
      }
      let poster = `http://image.tmdb.org/t/p/original${upcomingMovies[i].poster_path}`;
      if(!upcomingMovies[i].hasOwnProperty("poster_path")){
        poster = noPoster;
      }
      card.push(
        <div style={{paddingTop:"25px", paddingBottom:"20px"}} key={i}>
          <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
            <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"185px",border:"4px solid black"}} src={`${poster}`} alt="Card image cap"/>
              <CardBody className="paddingCardbody">
                  <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={`${movieName}`}>{`${upcomingMovies[i].title}`}</CardTitle>
                  <CardText className="paddingCardbody" style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}}>{`${upcomingMovies[i].director}`}</CardText>
                  <CardText  style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}}>{`${upcomingMovies[i].release_date}`}</CardText>
                  
                  <NavLink tag={Link} exact to="/details" style={{ display:"inline-block", height:"100%", fontSize:"0", margin:"0", padding:"0"}}>
                    <div style={{  display:"inline-block"}}>
                        <Button onClick={()=>{this.getMovieId(`${upcomingMovies[i].id}`)}}  color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${see}`} alt=""></img></span>See More</Button>{' '}
                      </div>
                  </NavLink>      
                    

                  </CardBody>
            </Card>
        </div>
    
      )
    }
      return card
    }

    const movieofDay = movieOfDayMovie.map((movie, index) => {
      movieIdsDay.push(movie.movieId)
      console.log(movieIdsDay)
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
               
                      <Button onClick={()=>{this.getIndex(index)}} color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
             
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

    const trending =()=>{
      let card = []
    
    for(let i=0;i<trendingMovies.length;i++){
      let movieName = trendingMovies[i].title;
      if(trendingMovies[i].title.length>27){
        trendingMovies[i].title =  trendingMovies[i].title.substring(0,24) + "..." 
      }
      let poster = `http://image.tmdb.org/t/p/original${trendingMovies[i].poster_path}`;
      if(!trendingMovies[i].hasOwnProperty("poster_path")){
        poster = noPoster;
      }
      card.push(
        <div style={{paddingTop:"25px"}} key={i}>
          <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
            <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"185px",border:"4px solid black"}} src={`${poster}`} alt="Card image cap"/>
              <CardBody className="paddingCardbody">
                  <CardTitle  style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={`${movieName}`}>{`${trendingMovies[i].title}`}</CardTitle>
                  
                  <NavLink tag={Link} exact to="/details" style={{ display:"inline-block", height:"100%", fontSize:"0", margin:"0", padding:"0"}}>
                    <div style={{  display:"inline-block"}}>
                        <Button onClick={()=>{this.getMovieId(`${trendingMovies[i].id}`)}}  color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${see}`} alt=""></img></span>See More</Button>{' '}
                      </div>
                  </NavLink>      
                    

                  </CardBody>
            </Card>
        </div>
    
      )
    }
      return card
  }
  
    
 
    return(

      <div className="page-container" style={{background:"#fec106"}}>
        <div className="content-wrap">

          <Appbar handleSearch={this.handleSearch} username={this.props.username}/>
        
          <div>
            <style>
            {
            `.custom-tag {
                max-width: 100%;
                height: 439px;
                background: black;
              }`
            }
            </style>
            <ABD
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
            pause = {false}
            ride="carousel"
            slide={true}
            interval={this.state.playing ? 5000 : false}
            >
          
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </ABD>
          </div>

          <div className="containerDiv">
            <Container style={{paddingBottom: "10px",width:"100%", display:"block", marginLeft:"auto", marginRight:"auto"}}>
              <div className="borderNowplaying"> 
                <div>
                  <p className="nowPlayingText" style={{paddingRight:"5px"}}>Now Playing</p>
                </div> 
              </div>
              <div className="imagesNowPlaying"> 
                <Row noGutters={false} className="paddingFirst">
                  {nowPlaying()}
                </Row>
              </div>
            </Container>
          </div>

          <div className="containerDiv">
            <Container style={{paddingBottom: "10px"}}>
              <div className="borderUpcoming"> 
                <div>
                  <p className="UpcomingText" style={{paddingRight:"5px"}}>Upcoming</p>
                </div> 
              </div>

              <div className="backgroundUpcoming">
                <div className="imagesUpcoming" > 
                  <Carousel arrows={false} infinite={true} responsive={responsive}  autoPlay={this.props.deviceType !== "mobile" ? true : false} autoPlaySpeed={3000}>
                  {upcoming()}
                  </Carousel>
                </div>
              </div>
            </Container>
          </div>

          <div className="containerDiv">
            <Container style={{paddingBottom: "10px"}}>
              <div className="borderUpcoming"> 
                <div>
                  <p className="UpcomingText" style={{paddingRight:"5px"}}>Movie of the Day</p>
                </div> 
              </div>

              <div className="backgroundUpcoming" style={{paddingLeft:"47px"}}>
              {movieofDay}
              </div>
            </Container>
          </div>

          
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
                  {trending()}
                  </Carousel>;
                </div>
              </div>
            </Container>
          </div>



          <br></br>
          <br></br>
          <br></br>
          <AppFooter/>
        </div>
      </div>

    )
  }
  
}

export default AppHome;
