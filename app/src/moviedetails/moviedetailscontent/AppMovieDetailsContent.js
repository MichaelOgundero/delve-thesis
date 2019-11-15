import React,  {Component, useState} from 'react';
import { NavLink as Link} from 'react-router-dom';
import classnames from 'classnames';

import './AppMovieDetailsContent.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import see from '../../images/see.png'
import noPoster from '../../images/imageUnavailable.png';
import loading from '../../images/theFlashLoading.gif'


import { Container, Row,NavLink,
  Col,Card, CardImg, 
  CardText, CardBody,Table,
  CardTitle,CardSubtitle, Button,Modal, ModalHeader, ModalBody, ModalFooter,
  Nav, NavItem, TabContent, TabPane,CardDeck} from 'reactstrap';

  import ReactPlayer from 'react-player';
  import addDetails from '../../images/addDetails.png';

  import detailStar from '../../images/detailStar.png'



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
  let imageModal;
class  AppMovieDetailsContent extends Component{

    constructor(props){
        super(props);
        this.state = {
            activeTab: '1',
            modal: false,
            autoPlay:true,
            isLoading: true,
            movieDetails: [],   //details
            movieCast:[],       //moreDetails
            movieCrew:[],
            moviePoster:[],
            movieBackdrops:[],
            similarMovies:[],   //moreDetails
            movieReviews:[],    //reviews
            movieVideos:[]      //videos
           
          }
          this._isMounted = false;
          this.toggle = this.toggle.bind(this);
          this.toggleImg = this.toggleImg.bind(this);

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

    toggle(tab){
      const {activeTab} = this.state;
      if(activeTab !== tab){
        this.setState({
          activeTab: tab
        })
      }
    }

    toggleImg(){
      const {modal, autoPlay} = this.state;
      this.setState({
        modal: !modal,
        autoPlay: !autoPlay
      })
    };



    componentDidMount(){
      this._isMounted  = true;
      this._isMounted && this.getInformation();
  
    }
  
    componentWillUnmount(){
      this._isMounted = false;
    }
  
    
    componentDidUpdate(prevProps){
      if(this.props.seeMoreValue != prevProps.seeMoreValue){
        this._isMounted  = true;
        this._isMounted && this.getInformation();
      }
    }

      async getInformation(){
        //475557 joker
        //299536 infinity war
        //1273 tmnt
        //420809 malfic
        //this.props.seeMoreValue
        console.log("this is prop" + this.props.seeMoreValue)
        const movieID = this.props.seeMoreValue
   
        Promise.all([
            fetch(`api/detail/${movieID}`),
            fetch(`api/moreDetails/${movieID}`),
            fetch(`api/reviews/${movieID}`),
            fetch(`api/videos/${movieID}`)

        ]).

        then(([details,moreDetails, reviews, videos]) => {
            return Promise.all([details.json(), moreDetails.json(),reviews.json(),videos.json()])
        }).
        
        then(([details, moreDetails, reviews, videos])=>{
            this._isMounted && this.setState({
                movieDetails: details,
                movieCast: moreDetails[0].castList,
                movieCrew: moreDetails[0].crewList,
                movieBackdrops: moreDetails[0].backdroplist,
                moviePoster: moreDetails[0].posterList,
                similarMovies: moreDetails[0].similarResults,
                movieReviews: reviews,
                movieVideos: videos,
                isLoading: false
              });
        })

     
    
      }

      getActive(val){
        const {movieBackdrops} = this.state
        imageModal = `http://image.tmdb.org/t/p/original${movieBackdrops[val].file_path}`
        this.toggleImg()
      }
 


      render(){

        let directorArr = [];
        let director;
        let directorPoster;
        let posterPath;
        let posterPathValue
        let finalTrailer;
        const { movieDetails, movieCast,
                movieCrew, movieBackdrops,
                moviePoster, similarMovies,
                movieReviews, movieVideos,
                 isLoading, activeTab} = this.state;
                
            

            
            if(isLoading){
              return(
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
               
              )
            }
        
              console.log(movieCast)
              movieCrew.forEach(crew => {
                if(crew.job === "Director"){
                  directorArr.push(crew.name);
                  if(!crew.hasOwnProperty('profile_path')){
                    directorPoster = noPoster
                  }
                    directorPoster = `http://image.tmdb.org/t/p/original${crew.profile_path}`;
                  }
              });
              director = directorArr.join(", ")

              let pcName = []
              movieDetails.forEach(movie=>{
                for(let i=0;i<movie.productionCompanies.length;i++){
                  pcName.push(movie.productionCompanies[i])
                }
              })
              console.log(pcName)
  
              let prodCountry = []
              movieDetails.forEach(movie=>{
                for(let i=0;i<movie.productionCountries.length;i++){
                  prodCountry.push(movie.productionCountries[i])
                }
              })
              console.log(prodCountry)
              
              let revenue
              let budget
              let revenueColor = "red"
              let howManyTimes

              movieDetails.forEach(movie=>{
                revenue = movie.revenue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                budget = movie.budget.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');;

               howManyTimes = Math.round(movie.revenue/movie.budget) 

                if(movie.revenue> movie.budget){
                  revenueColor = "green"
                }
              })
              
              let xxx
            

              if(moviePoster.length === 0){
                  movieDetails.forEach((movie)=>{
                    if(movie.posterPath === null){
                      posterPathValue = noPoster
                  }else{
                    posterPath = movie.posterPath
                    posterPathValue = `http://image.tmdb.org/t/p/original${posterPath}`
                  }

                  })
              }else{
                  moviePoster.forEach((poster, index)=>{
                    if(index === 1){
                    posterPath = poster.file_path  
                    posterPathValue = `http://image.tmdb.org/t/p/original${posterPath}` 
                    }
                  })
            }

              movieVideos.forEach((video)=>{
                if(video.type === "Trailer"){
                  finalTrailer = video.key
                }
              })

              function convertDate(date){
                const year = date.substring(0,4);
                let month = date.substring(5,7);
                const day = date.substring(9,10);
                const dateConverted = ""
                if(month === "01"){
                  month = "January"
                  return  month + " " + day + ", " + year}
                if(month === "02"){
                  month = "February"
                  return  month + " " + day + ", " + year}
                if(month === "03"){
                  month = "March"
                  return  month + " " + day + ", " + year}
                if(month === "04"){
                  month = "April"
                  return  month + " " + day + ", " + year}
                if(month === "05"){
                  month = "May"
                  return  month + " " + day + ", " + year} 
                if(month === "06"){
                  month = "June"
                  return  month + " " + day + ", " + year}
                if(month === "07"){
                  month = "July"
                  return  month + " " + day + ", " + year}
                if(month === "08"){
                  month = "August"
                  return  month + " " + day + ", " + year}
                if(month === "09"){
                  month = "September"
                  return  month + " " + day + ", " + year}
                if(month === "10"){
                  month = "October"
                  return  month + " " + day + ", " + year}
                if(month === "11"){
                  month = "November"
                  return  month + " " + day + ", " + year}
                if(month === "12"){
                  month = "December"
                  return  month + " " + day + ", " + year}
                

                return dateConverted;
              }
        


            const firstRow = movieDetails.map((movie, index)=>{

              let textColor = "white";
              if(movie.movieRating === "R"){
                textColor = "red"
              }
              if(movie.movieRating==="PG"){
                textColor = "green"
              }
              if(movie.movieRating==="PG-13"){
                textColor = "#9500ff"
              }
              if(movie.movieRating==="G"){
                textColor = "#087fff"
              }

              let genreContent = "";
              if(movie.genres.length === 0){
                genreContent = "N/A"
              }
              else if(movie.genres.length === 1){
               genreContent = movie.genres[0]
              }
              else if(movie.genres.length === 2){
                 genreContent = movie.genres[0] + ", " + movie.genres[1]
              }
              else {
                genreContent = movie.genres[0] + ", " + movie.genres[1] + ", " + movie.genres[2];
              }
              

              return(
                <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b"}} key={index}>
                  <div style={{maxHeight:"100%", maxWidth:"100%"}}>
                    <div style={{display:"inline-block", maxHeight:"100%", maxWidth:"100%"}}>
                      <CardTitle style={{color:"#fec106", maxWidth:"100%", maxHeight:"100%", background:"#1c1b1b", fontWeight:"bold", fontSize:"32px"}}>
                        {movie.title} 
                      </CardTitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", marginLeft:"2px", background:"#1c1b1b", fontWeight:"bold", fontSize:"25px"}}>
                        ({movie.releaseDate.substring(0,4)})
                      </CardSubtitle>
                    </div>
                  </div>
                <div style={{maxHeight:"100%", maxWidth:"100%", paddingBottom:"15px"}}>
                  <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                    <CardSubtitle style={{color:"#fec106", maxWidth:"100%", maxHeight:"100%", fontSize:"20px"}}>
                      Directed by 
                    </CardSubtitle>
                  </div>
                  <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                    <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", marginLeft:"5px",marginTop:"5px", fontSize:"20px",fontWeight:"bold"}}>
                      {director}
                    </CardSubtitle>
                  </div>
                  <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%", float:"right", marginRight:"7px"}}>
                    <div style={{display:"inline-block", maxHeight:"100%", maxWidth:"100%"}}>
                      <CardImg src={detailStar} alt="" style={{width:"32px",height:"32px",padding:"0",marginBottom:"11px",background:"#1c1b1b"}}>
                      </CardImg>
                    </div>
                    <div style={{display:"inline-block", maxHeight:"100%", maxWidth:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%",padding:"0", marginLeft:"2px",background:"#1c1b1b", fontWeight:"bold", fontSize:"20px"}}>
                        {movie.score}
                      </CardSubtitle>
                    </div>
                  </div>

                </div>
                <div style={{ maxHeight:"285px", maxWidth:"100%", overflow:"hidden"}}>
                  <div style={{overflow:"hidden", float:"left", maxHeight:"100%", maxWidth:"100%", marginRight:"10px"}}>
                    <CardImg src={posterPathValue} alt="" title={movie.title} style={{height:"278px", width:"185px", maxHeight:"278px", maxWidth:"185px",border:"4px solid black"}}/>
                  </div>
                  <div  className="player-wrapper" style={{overflow:"hidden", maxHeight:"300px", maxWidth:"100%"}}>
                    <ReactPlayer
                      url= {`https://www.youtube.com/watch?v=${finalTrailer}`}
                      class="react-player"
                      playing = {true}
                      width="545px"
                      height = "278px"
                      controls = {true}
                      light = {true}  //auto play
                      loop = {true}
                      style={{border:"4px solid black"}}
                    />
                  </div>

                </div>
                <div style={{maxHeight:"100%", maxWidth:"100%", overflow:"hidden",marginTop:"5px"}}>
                  <div style={{maxheight:"100%", maxWidth:"100%",display:"inline-block"}}>
                      <Button color="warning" size="lg" style={{width:"185px"}}><span><img src={addDetails} width="15px" height="15px" alt="" style={{marginBottom:"2px"}}></img><span style={{ fontWeight:"bold", fontSize:"15px",marginLeft:"5px"}}>Add to Watchlist</span></span></Button>
                  </div>
                  
                  <div style={{maxHeight:"100%", maxWidth:"100%", display:"inline-block", marginLeft:"12px"}}>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:`${textColor}`, maxWidth:"100%", maxHeight:"100%", fontSize:"15px", fontWeight:"bold"}}>
                        {movie.movieRating}
                      </CardSubtitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", fontSize:"15px", marginLeft:"10px", marginRight:"10px"}}>
                        I
                      </CardSubtitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", fontSize:"15px", fontWeight:"bold"}}>
                        {movie.runtime} min
                      </CardSubtitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", fontSize:"15px", marginLeft:"10px", marginRight:"10px"}}>
                        I
                      </CardSubtitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", fontSize:"15px", fontWeight:"bold"}}>
                        {genreContent}
                      </CardSubtitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", fontSize:"15px", marginLeft:"10px", marginRight:"10px"}}>
                        I
                      </CardSubtitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", fontSize:"15px", fontWeight:"bold"}}>
                        {convertDate(movie.releaseDate)}
                      </CardSubtitle>
                    </div>
                  </div>
                </div>
                </div>

              )
            })

            const overView = movieDetails.map((movie, index)=>{
 

              let keywords = "";
              if(movie.keywords.length === 0){
                keywords = "N/A"
              }
              else if(movie.keywords.length === 1){
                keywords = movie.keywords[0].name
              }
              else if(movie.keywords.length === 2){
                keywords = movie.keywords[0].name + ", " + movie.keywords[1].name
              }
              else {
                keywords = movie.keywords[0].name + ", " + movie.keywords[1].name + ", " + movie.keywords[2].name;
              }
              return(
                <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b"}} key={index}>
                  <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b", borderBottom:"1px solid #fec106"}}>
                      <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Plot</CardSubtitle>
                  </div>
                 
                  <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                    <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", background:"#1c1b1b", fontSize:"15px"}}>
                      {movie.overview}
                    </CardSubtitle>
                  </div>

                  <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b", borderBottom:"1px solid #fec106", marginTop:"30px"}}>
                    <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>More Information</CardSubtitle>
                  </div>

                  <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                    <Table  style={{maxWidth:"100%", maxheight:"100px"}}>
                      <tbody>
                        <tr >
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Language</CardSubtitle>
                          </td>
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{movie.language}</CardSubtitle>
                          </td>
                        </tr>
                   
                        <tr  >
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Tagline</CardSubtitle>
                          </td>
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{movie.tagline}</CardSubtitle>
                          </td>
                        </tr>
                   
                        <tr  >
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Status</CardSubtitle>
                          </td>
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{movie.status}</CardSubtitle>
                          </td>
                        </tr>
                  
                        <tr  >
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Spoken Language(s)</CardSubtitle>
                          </td>
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{movie.spokenLanguages.join(", ")}</CardSubtitle>
                          </td>
                        </tr>
                 
                        <tr  >
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Homepage</CardSubtitle>
                          </td>
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}><a style={{color:"#fec106"}} href={movie.homepage} target="_blank">{movie.homepage}</a></CardSubtitle>
                          </td>
                        </tr>
                    
                        <tr  >
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Original Title</CardSubtitle>
                          </td>
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{movie.originalTitle}</CardSubtitle>
                          </td>
                        </tr>
                 
                        <tr  >
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Keywords</CardSubtitle>
                          </td>
                          <td style={{ maxHeight:"100%",display:"table-cell", verticalAlign:"middle"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{keywords}</CardSubtitle>
                          </td>
                        </tr>

                      </tbody>
                    </Table>
                  </div>

                </div>
              )
            })

            const Cast = movieCast.map((cast, index)=>{
              let poster = `http://image.tmdb.org/t/p/original${cast.profile_path}`;
              if(!cast.hasOwnProperty('profile_path')){
                  poster = noPoster
              }
              return(
                <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b"}} key={index}>
                  <tbody>
                  <tr >
                    <td style={{}}>
                      <CardImg style={{maxHeight:"68px", maxWidth:"45px",height:"68px", width:"45px"}} src={poster} alt="Card image cap"></CardImg>
                    </td>
                    <td style={{ width:"350px", maxWidth:"350px", display:"table-cell", verticalAlign:"middle"}}>
                      <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>{cast.name}</CardSubtitle>
                    </td>
                    <td  style={{ width:"350px",maxWidth:"350px", display:"table-cell", verticalAlign:"middle"}}>
                      <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{cast.character}</CardSubtitle>
                    </td>
                  </tr>
                  
                  </tbody>
    

                </div>
              )
            })

            const Crew = movieCrew.map((crew, index)=>{

                return(
                  <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b"}} key={index}>
                  <tbody>
                  <tr >
                    <td style={{ width:"390px", maxWidth:"390px", display:"table-cell", verticalAlign:"middle"}}>
                      <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>{crew.name}</CardSubtitle>
                    </td>
                    <td  style={{ width:"310px",maxWidth:"310px", display:"table-cell", verticalAlign:"middle"}}>
                      <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{crew.job}</CardSubtitle>
                    </td>
                  </tr>
                  
                  </tbody>
    

                </div>
                )
            })

            const Director = movieCrew.map((crew, index)=>{
              if(crew.job === "Director"){
                let poster = `http://image.tmdb.org/t/p/original${crew.profile_path}`;
                if(!crew.hasOwnProperty('profile_path')){
                    poster = noPoster
                }
                return(
                  <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b"}} key={index}>
                  <tbody>
                  <tr >
                    <td style={{}}>
                      <CardImg style={{maxHeight:"68px", maxWidth:"45px",height:"68px", width:"45px"}} src={poster} alt="Card image cap"></CardImg>
                    </td>
                    <td style={{ width:"650px", maxWidth:"650px", display:"table-cell", verticalAlign:"middle"}}>
                      <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>{crew.name}</CardSubtitle>
                    </td>
                  </tr>
                  </tbody>
                </div>
                )
              }
            })

   


           const production = pcName.map((company, index)=>{
              if(company.origin_country===""){
                company.origin_country = "N/A"
              }
              return(
                <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b"}} key={index}>

                      <tbody>
                        <tr style={{margin:"0", padding:"0" }}>
                          <td style={{marginLeft:"0", paddingLeft:"0", marginRight:"5px", paddingRight:"5px", maxHeight:"100%", maxWidth:"100%"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>{company.name}</CardSubtitle>
                          </td>
                          <td style={{marginLeft:"0", paddingLeft:"0", maxHeight:"100%", maxWidth:"100%"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>({company.origin_country})</CardSubtitle>
                          </td>
                        </tr>
                      </tbody>

                </div>
              )
           })

           const countries = prodCountry.map((country, index)=>{

            return(
              <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b"}} key={index}>

              <tbody>
                <tr style={{margin:"0", padding:"0" }}>
                  <td style={{marginLeft:"0", paddingLeft:"0", marginRight:"5px", paddingRight:"5px", maxHeight:"100%", maxWidth:"100%"}}>
                    <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>{country}</CardSubtitle>
                  </td>
                </tr>
              </tbody>

              </div>
            )
           })

           const Reviews = movieReviews.map((review, index)=>{

             return(
               <div div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b"}} key={index}>
                  <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b", marginTop:"50px"}}>
                    <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"20px"}}>Review by {review.author}</CardSubtitle>
                  </div>
                  <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                    <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", background:"#1c1b1b", fontSize:"15px"}}>
                      {review.content}
                    </CardSubtitle>
                  </div>
                  <div style={{maxheight:"100%", maxWidth:"100%", marginTop:"10px", marginLeft:"590px"}}>
                  <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}><a style={{color:"#fec106"}} href={review.url} target="_blank">Link to Review</a></CardSubtitle>
                  </div>
               </div>
             )
           })

           const Similar =()=>{
            let card = []
          
          for(let i=0;i<similarMovies.length;i++){
            let movieName = similarMovies[i].title;
            if(similarMovies[i].title.length>27){
              similarMovies[i].title =  similarMovies[i].title.substring(0,24) + "..." 
            }
            let poster = `http://image.tmdb.org/t/p/original${similarMovies[i].poster_path}`;
            if(!similarMovies[i].hasOwnProperty("poster_path")){
              poster = noPoster;
            }
            card.push(
              <div style={{paddingTop:"25px"}} key={i}>
                <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
                  <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"185px",border:"4px solid black"}} src={`${poster}`} alt="Card image cap"/>
                    <CardBody className="paddingCardbody">
                        <CardTitle  style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={`${movieName}`}>{`${similarMovies[i].title}`}</CardTitle>
                        
                        <NavLink tag={Link} exact to="/details" style={{ display:"inline-block", height:"100%", fontSize:"0", margin:"0", padding:"0"}}>
                          <div style={{  display:"inline-block"}}>
                              <Button onClick={()=>{this.getMovieId(`${similarMovies[i].id}`)}}  color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${see}`} alt=""></img></span>See More</Button>{' '}
                            </div>
                        </NavLink>      
                          
      
                        </CardBody>
                  </Card>
              </div>
          
            )
          }
            return card
        }

        const {modal,autoPlay} = this.state

        const Stills =()=>{
          let card = []
          const externalCloseBtn = <button className="close"  style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={()=>{this.toggleImg()}}><span style={{color:"#FFFFFF"}}>&times;</span></button>;
        
        for(let i=0;i<movieBackdrops.length;i++){
         
          card.push(
            
            <div style={{paddingTop:"10px"}} key={i}>
              
                <CardImg onClick={()=>{this.getActive(i)}} style={{cursor:"pointer",maxHeight:"104px", maxWidth:"185px",height:"104px", width:"185px",border:"2px solid black", paddingLeft:"5px", paddingRight:"5px"}} src={`http://image.tmdb.org/t/p/original${movieBackdrops[i].file_path}`} alt="Card image cap"/>
                
                <div >
            
                  <Modal isOpen={modal} toggle={this.toggleImg} external={externalCloseBtn} style={{ position:"relative", top:"20%"}} size="lg">
                  
                    <ModalBody style={{maxHeight:"100%", maxWidth:"100%",height:"100%", width:"100%", margin:"0", padding:"0", boxSizing:"border-box"}}>
                    <CardImg  style={{maxHeight:"100%", maxWidth:"100%",height:"100%", width:"100%", margin:"0", padding:"0", boxSizing:"border-box"}} src={imageModal}/>

                    </ModalBody>
                  </Modal>
                </div>
            
            </div>

          )
        }
          return card
      }
           

        

            return(
                <div className="containerDiv" style={{background:"#1c1b1b" ,maxHeight:"100%"}}>
                  <Container>
                    <div className="backgroundUpcoming" style={{maxHeight:"100%"}}>
                      {firstRow}
                    </div>
                  </Container>
                  <Container>
                    <div className="backgroundUpcoming" style={{background:"#1c1b1b", maxHeight:"100%", marginTop:"10px", marginBottom:"10px"}}>
                      <Nav tabs>
                        <NavItem style={{}}>
                          <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                            >
                            <span style={{color:"#fec106",fontWeight:"bold"}}>Overview</span>
                           </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                            >
                              <span style={{color:"#fec106",fontWeight:"bold"}}>Cast & Crew</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                            >
                              <span style={{color:"#fec106", fontWeight:"bold"}}>Production</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { this.toggle('4'); }}
                            >
                              <span style={{color:"#fec106",fontWeight:"bold"}}>Reviews</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          <Container>
                            <div className="backgroundUpcoming" style={{background:"#1c1b1b", maxHeight:"100%", marginTop:"30px"}}>
                              {overView}
                            </div>
                          </Container>
                        </TabPane>
                        <TabPane tabId="2">
                          <Container>
                            <div className="backgroundUpcoming" style={{background:"#1c1b1b", maxHeight:"100%", marginTop:"30px"}}>
                              <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b", borderBottom:"1px solid #fec106"}}>
                                <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Director</CardSubtitle>
                              </div>
                              <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                                <Table  style={{maxWidth:"100%", maxheight:"100px"}}>
                                  {Director}
                                </Table>
                              </div>
                              <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b", borderBottom:"1px solid #fec106"}}>
                                <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Cast</CardSubtitle>
                              </div>
                              <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                                <Table  style={{maxWidth:"100%", maxheight:"100px"}}>
                                  {Cast}
                                </Table>
                              </div>
                              <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b", borderBottom:"1px solid #fec106"}}>
                                <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Crew</CardSubtitle>
                              </div>
                              <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                                <Table  style={{maxWidth:"100%", maxheight:"100px"}}>
                                  {Crew}
                                </Table>
                              </div>
                             
                            </div>
                          </Container>
                        </TabPane>
                        <TabPane tabId="3">
                          <Container>
                            <div className="backgroundUpcoming" style={{background:"#1c1b1b", maxHeight:"100%",  marginTop:"30px"}}>
                              <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b", borderBottom:"1px solid #fec106"}}>
                                <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Production Companies</CardSubtitle>
                              </div>
                                <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                                 <Table borderless style={{maxWidth:"100%", maxheight:"100px"}}>
                                   {production}
                                </Table> 
                              </div>
                              <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b", borderBottom:"1px solid #fec106", marginBottom:""}}>
                                <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Production Country(s)</CardSubtitle>
                              </div>

                                <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                                 <Table borderless style={{maxWidth:"100%", maxheight:"100px"}}>
                                   {countries}
                                </Table>
                                </div>  

                              <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b", borderBottom:"1px solid #fec106", marginBottom:""}}>
                                <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Box Office</CardSubtitle>
                              </div>
                              <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                                 <Table borderless style={{maxWidth:"100%", maxheight:"100px"}}>
                                  <tbody>
                                    <tr style={{margin:"0", padding:"0" }}>
                                      <td style={{marginLeft:"0", paddingLeft:"0", marginRight:"5px", paddingRight:"5px", maxHeight:"100%", maxWidth:"100%"}}>
                                        <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>Budget</CardSubtitle>
                                      </td>
                                      <td style={{marginLeft:"0", paddingLeft:"0", maxHeight:"100%", maxWidth:"100%"}}>
                                        <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>{budget} USD</CardSubtitle>
                                      </td>
                                    </tr>
                                    <tr style={{margin:"0", padding:"0" }}>
                                      <td style={{marginLeft:"0", paddingLeft:"0", marginRight:"5px", paddingRight:"5px", maxHeight:"100%", maxWidth:"100%"}}>
                                        <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>Revenue</CardSubtitle>
                                      </td>
                                      <td style={{marginLeft:"0", paddingLeft:"0", maxHeight:"100%", maxWidth:"100%"}}>
                                        <CardSubtitle style={{color:`${revenueColor}`, fontSize:"18px"}}>{revenue} USD (x{howManyTimes})</CardSubtitle>
                                      </td>
                                    </tr>
                                    </tbody>
                                </Table>
                                </div>  
                            </div>
                          </Container>
                        </TabPane>
                        <TabPane tabId="4">
                          <Container>
                            <div className="backgroundUpcoming" style={{background:"#1c1b1b", maxHeight:"100%", marginTop:"30px"}}>
                              <div style={{maxHeight:"100%", maxWidth:"100%", background:"#1c1b1b", borderBottom:"1px solid #fec106"}}>
                                <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Reviews</CardSubtitle>
                              </div>
                              <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                                {Reviews}
                              </div>
                            </div>
                          </Container>
                        </TabPane>
                        
                      </TabContent>

                    </div>
                  </Container>
                  <Container>
                    <div className="backgroundUpcoming" style={{maxHeight:"100%"}}>
                      <div className="backgroundUpcoming" style={{background:"#1c1b1b", maxHeight:"100%",  marginTop:"30px"}}>
                        <div style={{maxHeight:"100%", maxWidth:"95%", background:"#1c1b1b", borderBottom:"1px solid #fec106", marginLeft:"20px"}}>
                          <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Gallery</CardSubtitle>
                        </div>
                        <div style={{maxHeight:"100%", maxWidth:"94.9%", marginTop:"10px",background:"#1c1b1b", marginLeft:"3%"}}>
                          <div  style={{background:"#1c1b1b", maxHeight:"100%", maxWidth:"100%", margin:"auto"}}> 
                            <Carousel  centerMode={true} arrows={true}  infinite={true} responsive={responsive} autoPlay={this.props.deviceType !== "mobile" ? true : false}  autoPlaySpeed={3500} autoPlay={autoPlay}>
                         
                              {Stills()}
                            
                            </Carousel>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Container>
                  <Container>
                    <div className="backgroundUpcoming" style={{maxHeight:"100%"}}>
                      <div className="backgroundUpcoming" style={{background:"#1c1b1b", maxHeight:"100%",  marginTop:"30px"}}>
                        <div style={{maxHeight:"100%", maxWidth:"95%", background:"#1c1b1b", borderBottom:"1px solid #fec106", marginLeft:"20px"}}>
                          <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Similar Movies</CardSubtitle>
                        </div>
                        <div style={{maxHeight:"100%", maxWidth:"97.5%", marginTop:"10px",background:"#1c1b1b"}}>
                          <div  style={{background:"#1c1b1b", maxHeight:"100%", maxWidth:"100%", marginLeft:"20px"}}> 
                            <Carousel  arrows={false}  infinite={true} responsive={responsive}  autoPlay={this.props.deviceType !== "mobile" ? true : false} autoPlaySpeed={3000}>
                              {Similar()}
                            </Carousel>;
                          </div>
                        </div>
                      </div>
                    </div>
                  </Container>
                </div>
            )

      }

}

export default AppMovieDetailsContent;