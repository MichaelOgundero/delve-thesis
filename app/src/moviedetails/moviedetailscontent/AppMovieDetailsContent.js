import React,  {Component, useState} from 'react';
import { NavLink as Link} from 'react-router-dom';
import classnames from 'classnames';

import './AppMovieDetailsContent.css';

import { Container, Row,NavLink,
  Col,Card, CardImg, 
  CardText, CardBody,Table,
  CardTitle,CardSubtitle, Button,
  Nav, NavItem, TabContent, TabPane} from 'reactstrap';

  import ReactPlayer from 'react-player';
  import addDetails from '../../images/addDetails.png';

  import detailStar from '../../images/detailStar.png'
  

class  AppMovieDetailsContent extends Component{

    constructor(props){
        super(props);
        this.state = {
            activeTab: '3',
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
    }

    toggle(tab){
      const {activeTab} = this.state;
      if(activeTab !== tab){
        this.setState({
          activeTab: tab
        })
      }
    }


    componentDidMount(){
        this._isMounted  = true;
        this._isMounted && this.getInformation();
      }
    
      componentWillUnmount(){
        this._isMounted = false;
      }

      async getInformation(){
        //475557 joker
        //299536 infinity war
        //1273 tmnt
        //420809 malfic
        const movieID = 475557
   
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

 


      render(){

        let director;
        let posterPath;
        let finalTrailer;
        const { movieDetails, movieCast,
                movieCrew, movieBackdrops,
                moviePoster, similarMovies,
                movieReviews, movieVideos,
                 isLoading, activeTab} = this.state;
        

                 movieCrew.forEach(crew => {
                  if(crew.job === "Director"){
                    director = crew.name;
                  }
              });

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
              

              
              moviePoster.forEach((poster, index)=>{
           
                if(index === 3){
                  posterPath = poster.file_path
                }
              })

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
        

            if(isLoading){
              return(
                <div className="loader"></div>
              )
            }

            const firstRow = movieDetails.map((movie, index)=>{

              let textColor;
              if(movie.movieRating === "R"){
                textColor = "red"
              }
              if(movie.movieRating==="PG"){
                textColor = "green"
              }

              let genreContent = "";
              if(movie.genres.length === 0){
                genreContent = "N/A"
              }
              else if(movie.genres.length === 1){
               genreContent = movie.genres[0]
              }
              else if(movie.genres.length === 2){
                 genreContent = movie.genres[0] + " ," + movie.genres[1]
              }
              else {
                genreContent = movie.genres[0] + ", " + movie.genres[1] + ", " + movie.genres[2];
              }
              

              return(
                <div style={{maxHeight:"100%", maxWidth:"100%", border:"1px solid red", background:"black"}} key={index}>
                  <div style={{maxHeight:"100%", maxWidth:"100%"}}>
                    <div style={{display:"inline-block", maxHeight:"100%", maxWidth:"100%"}}>
                      <CardTitle style={{color:"#fec106", maxWidth:"100%", maxHeight:"100%", border:"1px solid red", background:"black", fontWeight:"bold", fontSize:"32px"}}>
                        {movie.title} 
                      </CardTitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%",border:"1px solid red", marginLeft:"2px", background:"black", fontWeight:"bold", fontSize:"25px"}}>
                        ({movie.releaseDate.substring(0,4)})
                      </CardSubtitle>
                    </div>
                  </div>
                <div style={{maxHeight:"100%", maxWidth:"100%", border:"1px solid white", paddingBottom:"15px"}}>
                  <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                    <CardSubtitle style={{color:"#fec106", maxWidth:"100%", maxHeight:"100%",border:"1px solid red", fontSize:"20px"}}>
                      Directed by 
                    </CardSubtitle>
                  </div>
                  <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                    <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%",border:"1px solid red", marginLeft:"2px",marginTop:"5px", fontSize:"20px",fontWeight:"bold"}}>
                      {director}
                    </CardSubtitle>
                  </div>
                  <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%", border:"1px solid green", float:"right"}}>
                    <div style={{display:"inline-block", maxHeight:"100%", maxWidth:"100%"}}>
                      <img src={detailStar} alt="" style={{width:"32px",height:"32px",border:"1px solid red",padding:"0",marginBottom:"11px",background:"black"}}>
                      </img>
                    </div>
                    <div style={{display:"inline-block", maxHeight:"100%", maxWidth:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%",border:"1px solid red",padding:"0", marginLeft:"2px",background:"black", fontWeight:"bold", fontSize:"20px"}}>
                        {movie.score}
                      </CardSubtitle>
                    </div>
                  </div>

                </div>
                <div style={{ maxHeight:"285px", maxWidth:"100%", border:"1px solid green", overflow:"hidden"}}>
                  <div style={{overflow:"hidden", float:"left", maxHeight:"100%", maxWidth:"100%", border:"1px solid red", marginRight:"10px"}}>
                    <CardImg src={`http://image.tmdb.org/t/p/original${posterPath}`} alt="" title={movie.title} style={{height:"278px", width:"185px", maxHeight:"278px", maxWidth:"185px", border:"1px solid blue"}}/>
                  </div>
                  <div  className="player-wrapper" style={{overflow:"hidden", maxHeight:"300px", maxWidth:"100%", border:"1px solid white"}}>
                    <ReactPlayer
                      url= {`https://www.youtube.com/watch?v=${finalTrailer}`}
                      class="react-player"
                      playing = {true}
                      width="545px"
                      height = "278px"
                      controls = {true}
                      light = {true}  //auto play
                      loop = {true}
                      style={{border:"1px solid white"}}
                    />
                  </div>

                </div>
                <div style={{maxHeight:"100%", maxWidth:"100%", border:"1px solid green", overflow:"hidden",marginTop:"5px"}}>
                  <div style={{maxheight:"100%", maxWidth:"100%",display:"inline-block"}}>
                      <Button color="warning" size="lg" style={{width:"185px"}}><span><img src={addDetails} width="15px" height="15px" alt="" style={{marginBottom:"2px"}}></img><span style={{ fontWeight:"bold", fontSize:"15px",marginLeft:"5px"}}>Add to Watchlist</span></span></Button>
                  </div>
                  
                  <div style={{maxHeight:"100%", maxWidth:"100%", display:"inline-block", border:"1px solid yellow", marginLeft:"12px"}}>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:`${textColor}`, maxWidth:"100%", maxHeight:"100%",border:"1px solid red", fontSize:"15px", fontWeight:"bold"}}>
                        {movie.movieRating}
                      </CardSubtitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", fontSize:"15px", marginLeft:"10px", marginRight:"10px"}}>
                        I
                      </CardSubtitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%",border:"1px solid red", fontSize:"15px", fontWeight:"bold"}}>
                        {movie.runtime} min
                      </CardSubtitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", fontSize:"15px", marginLeft:"10px", marginRight:"10px"}}>
                        I
                      </CardSubtitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%",border:"1px solid red", fontSize:"15px", fontWeight:"bold"}}>
                        {genreContent}
                      </CardSubtitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", fontSize:"15px", marginLeft:"10px", marginRight:"10px"}}>
                        I
                      </CardSubtitle>
                    </div>
                    <div style={{display:"inline-block", maxWidth:"100%", maxHeight:"100%"}}>
                      <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%",border:"1px solid red", fontSize:"15px", fontWeight:"bold"}}>
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
                <div style={{maxHeight:"100%", maxWidth:"100%", border:"1px solid red", background:"black"}} key={index}>
                  <div style={{maxHeight:"100%", maxWidth:"100%", background:"black", borderBottom:"1px solid #fec106"}}>
                      <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Plot</CardSubtitle>
                  </div>
                 
                  <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                    <CardSubtitle style={{color:"#FFFFFF", maxWidth:"100%", maxHeight:"100%", border:"1px solid red", background:"black", fontSize:"15px"}}>
                      {movie.overview}
                    </CardSubtitle>
                  </div>

                  <div style={{maxHeight:"100%", maxWidth:"100%", background:"black", borderBottom:"1px solid #fec106", marginTop:"30px"}}>
                    <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>More Information</CardSubtitle>
                  </div>

                  <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                    <Table borderless style={{maxWidth:"100%", maxheight:"100px"}}>
                      <tbody>
                        <tr style={{margin:"0", padding:"0" }}>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Language</CardSubtitle>
                          </td>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{movie.language}</CardSubtitle>
                          </td>
                        </tr>
                        <br></br>
                        <tr  style={{margin:"0", padding:"0"}}>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Tagline</CardSubtitle>
                          </td>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{movie.tagline}</CardSubtitle>
                          </td>
                        </tr>
                        <br></br>
                        <tr  style={{margin:"0", padding:"0"}}>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Status</CardSubtitle>
                          </td>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{movie.status}</CardSubtitle>
                          </td>
                        </tr>
                        <br></br>
                        <tr  style={{margin:"0", padding:"0"}}>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Spoken Language(s)</CardSubtitle>
                          </td>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{movie.spokenLanguages}</CardSubtitle>
                          </td>
                        </tr>
                        <br></br>
                        <tr  style={{margin:"0", padding:"0"}}>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Homepage</CardSubtitle>
                          </td>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}><a style={{color:"#fec106"}} href={movie.homepage} target="_blank">{movie.homepage}</a></CardSubtitle>
                          </td>
                        </tr>
                        <br></br>
                        <tr  style={{margin:"0", padding:"0"}}>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Original Title</CardSubtitle>
                          </td>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{movie.originalTitle}</CardSubtitle>
                          </td>
                        </tr>
                        <br></br>
                        <tr  style={{margin:"0", padding:"0"}}>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#FFFFFF", fontSize:"18px"}}>Keywords</CardSubtitle>
                          </td>
                          <td style={{margin:"0", padding:"0", maxHeight:"100%"}}>
                            <CardSubtitle style={{color:"#fec106", fontSize:"18px"}}>{keywords}</CardSubtitle>
                          </td>
                        </tr>

                      </tbody>
                    </Table>
                  </div>

                </div>
              )
            })

   


           const production = pcName.map((company, index)=>{
              if(company.origin_country===""){
                company.origin_country = "N/A"
              }
              return(
                <div style={{maxHeight:"100%", maxWidth:"100%", background:"black"}} key={index}>

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
              <div style={{maxHeight:"100%", maxWidth:"100%", background:"black"}} key={index}>

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

           

        

            return(
                <div className="containerDiv" style={{background:"black", border:"1px solid red", maxHeight:"100%"}}>
                  <Container>
                    <div className="backgroundUpcoming" style={{maxHeight:"100%"}}>
                      {firstRow}
                    </div>
                  </Container>
                  <Container>
                    <div className="backgroundUpcoming" style={{background:"black", maxHeight:"100%", border:"1px solid red", marginTop:"10px"}}>
                      <Nav tabs>
                        <NavItem style={{border:"1px solid red"}}>
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
                            <div className="backgroundUpcoming" style={{background:"black", maxHeight:"100%", marginTop:"10px"}}>
                              {overView}
                            </div>
                          </Container>
                        </TabPane>
                        <TabPane tabId="2">
                          <Container>
                            <div className="backgroundUpcoming" style={{background:"black", maxHeight:"100%", marginTop:"10px"}}>
                              hello 2
                            </div>
                          </Container>
                        </TabPane>
                        <TabPane tabId="3">
                          <Container>
                            <div className="backgroundUpcoming" style={{background:"black", maxHeight:"100%", marginTop:"10px"}}>
                              <div style={{maxHeight:"100%", maxWidth:"100%", background:"black", borderBottom:"1px solid #fec106"}}>
                                <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Production Companies</CardSubtitle>
                              </div>
                                <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                                 <Table borderless style={{maxWidth:"100%", maxheight:"100px"}}>
                                   {production}
                                </Table> 
                              </div>
                              <div style={{maxHeight:"100%", maxWidth:"100%", background:"black", borderBottom:"1px solid #fec106", marginBottom:""}}>
                                <CardSubtitle style={{color:"#fec106", fontWeight:"bold", fontSize:"28px"}}>Production Country(s)</CardSubtitle>
                              </div>

                                <div style={{maxHeight:"100%", maxWidth:"100%", marginTop:"10px"}}>
                                 <Table borderless style={{maxWidth:"100%", maxheight:"100px"}}>
                                   {countries}
                                </Table>
                                </div>  

                              <div style={{maxHeight:"100%", maxWidth:"100%", background:"black", borderBottom:"1px solid #fec106", marginBottom:""}}>
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
                            <div className="backgroundUpcoming" style={{background:"black", maxHeight:"100%", marginTop:"10px"}}>
                              hello 4
                            </div>
                          </Container>
                        </TabPane>
                        
                      </TabContent>

                    </div>
                  </Container>
                </div>
            )

      }

}

export default AppMovieDetailsContent;