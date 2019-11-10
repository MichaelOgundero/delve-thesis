import React, { Component } from 'react';
import { NavLink as Link} from 'react-router-dom';

import {
  Carousel,
  NavLink ,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption, Button,
  Modal, ModalHeader, ModalBody
} from 'reactstrap';

import ReactPlayer from 'react-player';

import './Appcarousel.css';


import see from '../../images/see.png'
import play from '../../images/play.png'


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

const movieTitles = []
const movieTrailers = []
const movieIds = []

let movieId;

class Appcarousel extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: 0,
      movies: [],
      trailers: [],
      isLoading: true,
      modal: false,
      playing: true
    };

    this._isMounted = false;

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
   
    //this.setMovieId = this.setMovieId.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
  
      this.props.handleSeeMore(movieId)

    console.log("movie id sent")
 
  }

   componentDidMount(){
    this._isMounted  = true;
    this._isMounted && this.getInformation();
   
  }

  componentWillUnmount(){
    this._isMounted = false;
  }


  async getInformation(){
    const response = await fetch('api/nowPlayingCarousel');
    const body = await response.json();
    this._isMounted && this.setState({
      movies: body,
      isLoading: false
    });
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
     movieId = movieIds[activeIndex]
     
    return(
      <div>
        <div>{movie.overview}</div>
        <div style={{paddingTop: "10px"}}>
          <div style={{  display:"inline-block"}}>
            <Button onClick={()=> this.toggle()} color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"4px", paddingRight:"2px"}} src={play} alt=""></img></span>Watch Trailer</Button>{' '}
          </div>
         
            <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", marginLeft:"5px", padding:"0"}}>
               
                      <Button onClick={this.handleSubmit} color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
             
            </NavLink>
 
    
        
        </div>
        <div>
          <Modal size="lg" isOpen={this.state.modal} >
          <ModalHeader toggle={this.toggle}>{movieTitles[activeIndex] + " Trailer"}</ModalHeader>
          <ModalBody >
          <div className="player-wrapper">
            <ReactPlayer
            url= {`https://www.youtube.com/watch?v=${ytKey}`}
            className='react-player'
            playing = {true}
            width='100%'
            height='430px'
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
  


  render() {
    const { activeIndex, movies, isLoading} = this.state;

    if(isLoading){
      return(
        <div className="loader"></div>
      )
    }
    const slides = movies.map((movie, index) => {
     
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
    return (
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
        <Carousel
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
        </Carousel>
      
      </div>
    );
  }
}




export default Appcarousel;