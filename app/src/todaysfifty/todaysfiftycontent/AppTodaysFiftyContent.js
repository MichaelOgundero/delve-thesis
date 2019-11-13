import React,  {Component} from 'react';
import { NavLink as Link} from 'react-router-dom';

import { Container,Card, CardImg, CardText, CardBody,NavLink,
  CardTitle, Button, Alert} from 'reactstrap';

import './AppTodaysFiftyContent.css';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import see from '../../images/see.png';
import add from '../../images/addIcon.png';
import noPoster from '../../images/imageUnavailable.png';
import loading from '../../images/theFlashLoading.gif'


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
//let sectionOne;

let currentIndexTwo;
//let sectionTwo;

let currentIndexThree;
//let sectionThree;

let currentIndexFour;
//let sectionFour;

let currentIndexFive;
//let sectionFive;
let sectionOneTitle
let sectionTwoTitle
let sectionThreeTitle
let sectionFourTitle
let sectionFiveTitle

let arr

let movieId;

let todayDate = null;
let dbGenre1 = []
let dbGenre2 = []
let dbGenre3 = []
let dbGenre4 = []
let dbGenre5 = []

class AppTodaysFiftyContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      sectionOne: [],
      sectionTwo:[],
      sectionThree:[],
      sectionFour:[],
      sectionFive:[],
      visibleOne: false,
      visibleTwo: false,
      visibleThree: false,
      visibleFour: false,
      visibleFive: false
    }
    this._isMounted = false;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMovieId = this.getMovieId.bind(this);
  }

  getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    console.log(today)
    return today
  }


  sectionOneOnclick(movie){
    const {sectionOne} = this.state
    this.setState({visibleOne:true},()=>{
      window.setTimeout(()=>{
        this.setState({visibleOne:false})
      },3000)
    });
    currentIndexOne = sectionOne[movie].title;
  }
  sectionTwoOnclick(movie){
    const {sectionTwo} = this.state
    this.setState({visibleTwo:true},()=>{
      window.setTimeout(()=>{
        this.setState({visibleTwo:false})
      },3000)
    });
    currentIndexTwo = sectionTwo[movie].title;
  }
  sectionThreeOnclick(movie){
    const {sectionThree} = this.state
    this.setState({visibleThree:true},()=>{
      window.setTimeout(()=>{
        this.setState({visibleThree:false})
      },3000)
    });
    currentIndexThree = sectionThree[movie].title;
  }
  sectionFourOnclick(movie){
    const {sectionFour} = this.state
    this.setState({visibleFour:true},()=>{
      window.setTimeout(()=>{
        this.setState({visibleFour:false})
      },3000)
    });
    currentIndexFour = sectionFour[movie].title;
  }
  sectionFiveOnclick(movie){
    const {sectionFive} = this.state
    this.setState({visibleFive:true},()=>{
      window.setTimeout(()=>{
        this.setState({visibleFive:false})
      },3000)
    });
    currentIndexFive = sectionFive[movie].title;
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

    let genreIds = [ 28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
                      53, 10752, 37 ];
      let min = 0
      let max = 19
      let rand = Math.random()
      let todaysDate = this.getDate()      

      if(localStorage.getItem("currentDate")===null){
        localStorage.setItem("currentDate", JSON.stringify(todaysDate))
      }
      if(todaysDate === JSON.parse(localStorage.getItem("currentDate"))){
        if(localStorage.getItem("dbGenreOne")===null){

          arr = []
          for(let i=0;i<5;i++){
            console.log("here" +i)
           let genre =  Math.floor(Math.random() * genreIds.length)
           if(!arr.includes(genreIds[genre])){
            
             arr.push(genreIds[genre])
           }
          }

          if(typeof arr[0] === undefined || arr[0] === null || JSON.stringify(this.genreTitles(arr[0]))===" "){
            for(let i=0;i<genreIds.length;i++){
              if(!arr.includes(genreIds[i])){
                arr[0] = genreIds[i]
              }
            }
          }
          if(typeof arr[1] === undefined || arr[1] === null || JSON.stringify(this.genreTitles(arr[1]))===" "){
            for(let i=0;i<genreIds.length;i++){
              if(!arr.includes(genreIds[i])){
                arr[1] = genreIds[i]
              }
            }
          }
          if(typeof arr[2] === undefined || arr[2] === null || JSON.stringify(this.genreTitles(arr[2]))===" "){
            for(let i=0;i<genreIds.length;i++){
              if(!arr.includes(genreIds[i])){
                arr[2] = genreIds[i]
              }
            }
          }
          if(typeof arr[3] === undefined || arr[3] === null || JSON.stringify(this.genreTitles(arr[3]))===" "){
            for(let i=0;i<genreIds.length;i++){
              if(!arr.includes(genreIds[i])){
                arr[3] = genreIds[i]
              }
            }
          }
          if(typeof arr[4] === undefined || arr[4] === null || JSON.stringify(this.genreTitles(arr[4]))===" "){
            for(let i=0;i<genreIds.length;i++){
              if(!arr.includes(genreIds[i])){
                arr[4] = genreIds[i]
              }
            }
          }
    
          let genreOne = arr[0];
          let genreTwo= arr[1];
          let genreThree= arr[2];
          let genreFour= arr[3];
          let genreFive= arr[4];
    
    
          localStorage.setItem("sectionOneTitle", JSON.stringify(this.genreTitles(genreOne)))
          localStorage.setItem("sectionTwoTitle", JSON.stringify(this.genreTitles(genreTwo)))
          localStorage.setItem("sectionThreeTitle", JSON.stringify(this.genreTitles(genreThree)))
          localStorage.setItem("sectionFourTitle", JSON.stringify(this.genreTitles(genreFour)))
          localStorage.setItem("sectionFiveTitle", JSON.stringify(this.genreTitles(genreFive)))
    
          sectionOneTitle = JSON.parse(localStorage.getItem("sectionOneTitle"))
          sectionTwoTitle = JSON.parse(localStorage.getItem("sectionTwoTitle"))
          sectionThreeTitle = JSON.parse(localStorage.getItem("sectionThreeTitle"))
          sectionFourTitle = JSON.parse(localStorage.getItem("sectionFourTitle"))
          sectionFiveTitle = JSON.parse(localStorage.getItem("sectionFiveTitle"))
    
          Promise.all([
            fetch(`/api/todaysfifty/${genreOne}`),
            fetch(`/api/todaysfifty/${genreTwo}`),
            fetch(`/api/todaysfifty/${genreThree}`),
            fetch(`/api/todaysfifty/${genreFour}`),
            fetch(`/api/todaysfifty/${genreFive}`)
           
          ]).
          then(([firstSection, secondSection, thirdSection, fourthSection, fifthSection])=>{
            return Promise.all([firstSection.json(), secondSection.json(), thirdSection.json(),fourthSection.json(), fifthSection.json()])
            
          }).
          then(([firstSection, secondSection, thirdSection, fourthSection, fifthSection])=>{
            console.log(firstSection)
            localStorage.setItem("dbGenreOne", JSON.stringify(firstSection))
            localStorage.setItem("dbGenreTwo", JSON.stringify(secondSection))
            localStorage.setItem("dbGenreThree", JSON.stringify(thirdSection))
            localStorage.setItem("dbGenreFour", JSON.stringify(fourthSection))
            localStorage.setItem("dbGenreFive", JSON.stringify(fifthSection))
    
            this._isMounted && this.setState({
              sectionOne: JSON.parse(localStorage.getItem("dbGenreOne")),
              sectionTwo: JSON.parse(localStorage.getItem("dbGenreTwo")),
              sectionThree: JSON.parse(localStorage.getItem("dbGenreThree")),
              sectionFour: JSON.parse(localStorage.getItem("dbGenreFour")),
              sectionFive: JSON.parse(localStorage.getItem("dbGenreFive")),
              isLoading: false
            })
    
            
    
            /*this._isMounted && this.setState({
              sectionOne: firstSection,
              sectionTwo: secondSection,
              sectionThree: thirdSection,
              sectionFour: fourthSection,
              sectionFive: fifthSection,
              isLoading: false
            })*/
          })
         }else{
    
          sectionOneTitle = JSON.parse(localStorage.getItem("sectionOneTitle"))
          sectionTwoTitle = JSON.parse(localStorage.getItem("sectionTwoTitle"))
          sectionThreeTitle = JSON.parse(localStorage.getItem("sectionThreeTitle"))
          sectionFourTitle = JSON.parse(localStorage.getItem("sectionFourTitle"))
          sectionFiveTitle = JSON.parse(localStorage.getItem("sectionFiveTitle"))
    
          this._isMounted && this.setState({
            sectionOne: JSON.parse(localStorage.getItem("dbGenreOne")),
            sectionTwo: JSON.parse(localStorage.getItem("dbGenreTwo")),
            sectionThree: JSON.parse(localStorage.getItem("dbGenreThree")),
            sectionFour: JSON.parse(localStorage.getItem("dbGenreFour")),
            sectionFive: JSON.parse(localStorage.getItem("dbGenreFive")),
            isLoading: false
          })
         }
      }else{
          localStorage.setItem("currentDate", JSON.stringify(todaysDate))
          localStorage.removeItem("dbGenreOne")
          if(localStorage.getItem("dbGenreOne")===null){

            arr = []
            for(let i=0;i<5;i++){
              let genre =  Math.floor(Math.random() * genreIds.length)
              if(!arr.includes(genreIds[genre])){
               
                arr.push(genreIds[genre])
              }
             }
            
            if(typeof arr[0] === undefined || arr[0] === null || JSON.stringify(this.genreTitles(arr[0]))===" "){
              for(let i=0;i<genreIds.length;i++){
                if(!arr.includes(genreIds[i])){
                  arr[0] = genreIds[i]
                }
              }
            }
            if(typeof arr[1] === undefined || arr[1] === null || JSON.stringify(this.genreTitles(arr[1]))===" "){
              for(let i=0;i<genreIds.length;i++){
                if(!arr.includes(genreIds[i])){
                  arr[1] = genreIds[i]
                }
              }
            }
            if(typeof arr[2] === undefined || arr[2] === null || JSON.stringify(this.genreTitles(arr[2]))===" "){
              for(let i=0;i<genreIds.length;i++){
                if(!arr.includes(genreIds[i])){
                  arr[2] = genreIds[i]
                }
              }
            }
            if(typeof arr[3] === undefined || arr[3] === null || JSON.stringify(this.genreTitles(arr[3]))===" "){
              for(let i=0;i<genreIds.length;i++){
                if(!arr.includes(genreIds[i])){
                  arr[3] = genreIds[i]
                }
              }
            }
            if(typeof arr[4] === undefined || arr[4] === null || JSON.stringify(this.genreTitles(arr[4]))===" "){
              for(let i=0;i<genreIds.length;i++){
                if(!arr.includes(genreIds[i])){
                  arr[4] = genreIds[i]
                }
              }
            }
      
            let genreOne = arr[0];
            let genreTwo= arr[1];
            let genreThree= arr[2];
            let genreFour= arr[3];
            let genreFive= arr[4];
      
      
            localStorage.setItem("sectionOneTitle", JSON.stringify(this.genreTitles(genreOne)))
            localStorage.setItem("sectionTwoTitle", JSON.stringify(this.genreTitles(genreTwo)))
            localStorage.setItem("sectionThreeTitle", JSON.stringify(this.genreTitles(genreThree)))
            localStorage.setItem("sectionFourTitle", JSON.stringify(this.genreTitles(genreFour)))
            localStorage.setItem("sectionFiveTitle", JSON.stringify(this.genreTitles(genreFive)))
      
            sectionOneTitle = JSON.parse(localStorage.getItem("sectionOneTitle"))
            sectionTwoTitle = JSON.parse(localStorage.getItem("sectionTwoTitle"))
            sectionThreeTitle = JSON.parse(localStorage.getItem("sectionThreeTitle"))
            sectionFourTitle = JSON.parse(localStorage.getItem("sectionFourTitle"))
            sectionFiveTitle = JSON.parse(localStorage.getItem("sectionFiveTitle"))
      
            Promise.all([
              fetch(`/api/todaysfifty/${genreOne}`),
              fetch(`/api/todaysfifty/${genreTwo}`),
              fetch(`/api/todaysfifty/${genreThree}`),
              fetch(`/api/todaysfifty/${genreFour}`),
              fetch(`/api/todaysfifty/${genreFive}`)
             
            ]).
            then(([firstSection, secondSection, thirdSection, fourthSection, fifthSection])=>{
              return Promise.all([firstSection.json(), secondSection.json(), thirdSection.json(),fourthSection.json(), fifthSection.json()])
              
            }).
            then(([firstSection, secondSection, thirdSection, fourthSection, fifthSection])=>{
              console.log(firstSection)
              localStorage.setItem("dbGenreOne", JSON.stringify(firstSection))
              localStorage.setItem("dbGenreTwo", JSON.stringify(secondSection))
              localStorage.setItem("dbGenreThree", JSON.stringify(thirdSection))
              localStorage.setItem("dbGenreFour", JSON.stringify(fourthSection))
              localStorage.setItem("dbGenreFive", JSON.stringify(fifthSection))
      
              this._isMounted && this.setState({
                sectionOne: JSON.parse(localStorage.getItem("dbGenreOne")),
                sectionTwo: JSON.parse(localStorage.getItem("dbGenreTwo")),
                sectionThree: JSON.parse(localStorage.getItem("dbGenreThree")),
                sectionFour: JSON.parse(localStorage.getItem("dbGenreFour")),
                sectionFive: JSON.parse(localStorage.getItem("dbGenreFive")),
                isLoading: false
              })
      
              
      
              /*this._isMounted && this.setState({
                sectionOne: firstSection,
                sectionTwo: secondSection,
                sectionThree: thirdSection,
                sectionFour: fourthSection,
                sectionFive: fifthSection,
                isLoading: false
              })*/
            })
           }else{
      
            sectionOneTitle = JSON.parse(localStorage.getItem("sectionOneTitle"))
            sectionTwoTitle = JSON.parse(localStorage.getItem("sectionTwoTitle"))
            sectionThreeTitle = JSON.parse(localStorage.getItem("sectionThreeTitle"))
            sectionFourTitle = JSON.parse(localStorage.getItem("sectionFourTitle"))
            sectionFiveTitle = JSON.parse(localStorage.getItem("sectionFiveTitle"))
      
            this._isMounted && this.setState({
              sectionOne: JSON.parse(localStorage.getItem("dbGenreOne")),
              sectionTwo: JSON.parse(localStorage.getItem("dbGenreTwo")),
              sectionThree: JSON.parse(localStorage.getItem("dbGenreThree")),
              sectionFour: JSON.parse(localStorage.getItem("dbGenreFour")),
              sectionFive: JSON.parse(localStorage.getItem("dbGenreFive")),
              isLoading: false
            })
           }

      }


     

    

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

 genreTitles(genre){
  if(genre===28){
    genre = "Action";
    return genre;
  }if(genre===12){
    genre ="Adventure";
    return genre;
  }if(genre===16){
    genre = "Animation";
    return genre;
  }if(genre===35){
    genre = "Comedy";
    return genre;
  }if(genre==80){
    genre = "Crime";
    return genre;
  }if(genre===99){
    genre = "Documentary";
    return genre;
  }if(genre===18){
    genre = "Drama";
    return genre;
  }if(genre===10751){
    genre = "Family";
    return genre;
  }if(genre===14){
    genre = "Fantasy";
    return genre;
  }if(genre===36){
    genre = "History";
    return genre;
  }if(genre===27){
    genre = "Horror";
    return genre;
  }if(genre===10402){
    genre = "Music";
    return genre;
  }if(genre===9648){
    genre = "Mystery";
    return genre;
  }if(genre===10749){
    genre = "Romance";
    return genre;
  }if(genre===878){
    genre = "Science Fiction";
    return genre;
  }if(genre===10770){
    genre = "TV Movie";
    return genre;
  }if(genre===53){
    genre = "Thriller";
    return genre;
  }if(genre===10752){
    genre = "War";
    return genre;
  }if(genre===37){
      genre = "Western";
      return genre;
  }else{
      return " ";
  }



 }


  render() {

  
    const { isLoading,
            sectionOne,
            sectionTwo,
            sectionThree,
            sectionFour,
            sectionFive} = this.state;


    sectionOne.forEach((element)=>{
      console.log(element.title)
    })
    sectionTwo.forEach((element)=>{
      console.log(element.title)    })
    sectionThree.forEach((element)=>{
      console.log(element.title)    })
    sectionFour.forEach((element)=>{
      console.log(element.title)    })
      sectionFive.forEach((element)=>{
        console.log(element.title)      })

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

    
    const genreOne =()=>{
      let card = []
    
    for(let i=0;i<sectionOne.length;i++){
      let movieName = sectionOne[i].title;
      if(sectionOne[i].title.length>27){
        sectionOne[i].title =  sectionOne[i].title.substring(0,24) + "..." 
      }
      let poster = `http://image.tmdb.org/t/p/original${sectionOne[i].poster_path}`;
      if(!sectionOne[i].hasOwnProperty("poster_path")){
        poster = noPoster;
      }
      card.push(
        <div style={{paddingTop:"25px"}} key={i}>
          <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
            <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"185px",border:"4px solid black"}} src={`${poster}`} alt="Card image cap"/>
              <CardBody className="paddingCardbody">
                  <CardTitle  style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={`${movieName}`}>{`${sectionOne[i].title}`}</CardTitle>
                  
                  <div style={{}}>
                  <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", padding:"0"}}>
               
                    <Button onClick={()=>{this.getMovieId(`${sectionOne[i].id}`)}} color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${see}`} alt=""></img></span>See More</Button>{' '}
             
                  </NavLink>

                  <div style={{  display:"inline-block", marginRight:"0px", float:"right"}}>
                    <Button  onClick={ ()=>{this.sectionOneOnclick(i)}}   color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${add}`}alt=""></img></span>Add</Button>{' '} 
                  </div>

                </div>      
                    

                  </CardBody>
            </Card>
        </div>
    
      )
    }
      return card
  }
     //sectionOne = movies.slice(0,10);
    /*const genreOne = sectionOne.map((movie, index) => {
     
        
        let movieName = movie.title;
        if(movie.title.length>27){
          movieName =  movieName.substring(0,24) + "..." 
        }
        if(movie.director === null){
          movie.director = "N/A"
        }
        let poster = `http://image.tmdb.org/t/p/original${movie.poster_path}`;
        if(movie.poster_path === null || !movie.hasOwnProperty("poster_path")){
          poster = noPoster;
        }

      return(

        <div style={{paddingTop:"25px"}} key={index}>

        <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
          <CardImg  
            src={poster} alt="Card image cap" style={{border:"4px solid black", height:"278px", width:"185px",maxHeight:"278px", maxWidth:"185px",}} />
            <CardBody className="paddingCardbody">
                <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize", fontSize:"13px"}} title={movie.title}>{movieName}</CardTitle>
                <CardText  style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}} title={movie.director}>{movie.director}</CardText>
                <div style={{}}>
                  <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", padding:"0"}}>
               
                    <Button color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
             
                  </NavLink>

                  <div style={{  display:"inline-block", marginRight:"0px", float:"right"}}>
                    <Button  onClick={ ()=>{this.sectionOneOnclick(index)}}   color="warning" size="sm"><span> <img max-width="10px" max-height="15px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={add} alt=""></img></span>Add</Button>{' '} 
                  </div>

                </div>   

            </CardBody>

          </Card>
      </div>
      );
    });*/

    
    const genreTwo =()=>{
      let card = []
    
    for(let i=0;i<sectionTwo.length;i++){
      let movieName = sectionTwo[i].title;
      if(sectionTwo[i].title.length>27){
        sectionTwo[i].title =  sectionTwo[i].title.substring(0,24) + "..." 
      }
      let poster = `http://image.tmdb.org/t/p/original${sectionTwo[i].poster_path}`;
      if(!sectionTwo[i].hasOwnProperty("poster_path")){
        poster = noPoster;
      }
      card.push(
        <div style={{paddingTop:"25px"}} key={i}>
          <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
            <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"185px",border:"4px solid black"}} src={`${poster}`} alt="Card image cap"/>
              <CardBody className="paddingCardbody">
                  <CardTitle  style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={`${movieName}`}>{`${sectionTwo[i].title}`}</CardTitle>
                  
                  <div style={{}}>
                  <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", padding:"0"}}>
               
                    <Button onClick={()=>{this.getMovieId(`${sectionTwo[i].id}`)}} color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${see}`} alt=""></img></span>See More</Button>{' '}
             
                  </NavLink>

                  <div style={{  display:"inline-block", marginRight:"0px", float:"right"}}>
                    <Button  onClick={ ()=>{this.sectionTwoOnclick(i)}}   color="warning" size="sm"><span> <img max-width="10px" max-height="15px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={`${add}`}alt=""></img></span>Add</Button>{' '} 
                  </div>

                </div>      
                    

                  </CardBody>
            </Card>
        </div>
    
      )
    }
      return card
  }
    //sectionTwo  = movies.slice(10,21);
   /* const genreTwo = sectionTwo.map((movie, index) => {
      
      let movieName = movie.title;
      if(movie.title.length>27){
        movieName =  movieName.substring(0,24) + "..." 
      }
      if(movie.director === null){
        movie.director = "N/A"
      }
      let poster = `http://image.tmdb.org/t/p/original${movie.poster_path}`;
      if(movie.poster_path === null || !movie.hasOwnProperty("poster_path")){
        poster = noPoster;
      }
    return(

      <div style={{paddingTop:"25px"}} key={index}>
      <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
        <CardImg  
          src={poster} alt="Card image cap" style={{border:"4px solid black", height:"278px", width:"185px",maxHeight:"278px", maxWidth:"185px",}} />
          <CardBody className="paddingCardbody">
              <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize", fontSize:"13px"}} title={movie.title}>{movieName}</CardTitle>
              <CardText style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}} title={movie.director}>{movie.director}</CardText>
              <div style={{}}>
                  <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", padding:"0"}}>
               
                    <Button color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
             
                  </NavLink>

                  <div style={{  display:"inline-block", marginRight:"0px", float:"right"}}>
                    <Button  onClick={()=>{this.sectionTwoOnclick(index)}}    color="warning" size="sm"><span> <img max-width="10px" max-height="10px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={add} alt=""></img></span>Add</Button>{' '} 
                  </div>

                </div>   
          </CardBody>
        </Card>
    </div>
    );
  });*/

    
    const genreThree =()=>{
      let card = []
    
    for(let i=0;i<sectionThree.length;i++){
      let movieName = sectionThree[i].title;
      if(sectionThree[i].title.length>27){
        sectionThree[i].title =  sectionThree[i].title.substring(0,24) + "..." 
      }
      let poster = `http://image.tmdb.org/t/p/original${sectionThree[i].poster_path}`;
      if(!sectionThree[i].hasOwnProperty("poster_path")){
        poster = noPoster;
      }
      card.push(
        <div style={{paddingTop:"25px"}} key={i}>
          <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
            <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"185px",border:"4px solid black"}} src={`${poster}`} alt="Card image cap"/>
              <CardBody className="paddingCardbody">
                  <CardTitle  style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={`${movieName}`}>{`${sectionThree[i].title}`}</CardTitle>
                  
                  <div style={{}}>
                  <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", padding:"0"}}>
               
                    <Button onClick={()=>{this.getMovieId(`${sectionThree[i].id}`)}} color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${see}`} alt=""></img></span>See More</Button>{' '}
             
                  </NavLink>

                  <div style={{  display:"inline-block", marginRight:"0px", float:"right"}}>
                    <Button  onClick={ ()=>{this.sectionThreeOnclick(i)}}   color="warning" size="sm"><span> <img max-width="10px" max-height="15px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={`${add}`}alt=""></img></span>Add</Button>{' '} 
                  </div>

                </div>      
                    

                  </CardBody>
            </Card>
        </div>
    
      )
    }
      return card
  }
    //sectionThree = movies.slice(20,31)
    /*const genreThree = sectionThree.map((movie, index) => {
      
      let movieName = movie.title;
      if(movie.title.length>27){
        movieName =  movieName.substring(0,24) + "..." 
      }
      if(movie.director === null){
        movie.director = "N/A"
      }
      let poster = `http://image.tmdb.org/t/p/original${movie.poster_path}`;
      if(movie.poster_path === null || !movie.hasOwnProperty("poster_path")){
        poster = noPoster;
      }

    return(

      <div style={{paddingTop:"25px"}} key={index}>
      <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
        <CardImg  
          src={poster} alt="Card image cap" style={{border:"4px solid black", height:"278px", width:"185px",maxHeight:"278px", maxWidth:"185px",}} />
          <CardBody className="paddingCardbody">
              <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize", fontSize:"13px"}} title={movie.title}>{movieName}</CardTitle>
              <CardText  style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}} title={movie.director}>{movie.director}</CardText>
              <div style={{}}>
                  <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", padding:"0"}}>
               
                    <Button color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
             
                  </NavLink>

                  <div style={{  display:"inline-block", marginRight:"0px", float:"right"}}>
                    <Button  onClick={ ()=>{this.sectionThreeOnclick(index)}}   color="warning" size="sm"><span> <img max-width="10px" max-height="10px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={add} alt=""></img></span>Add</Button>{' '} 
                  </div>

                </div>   

              </CardBody>
        </Card>
    </div>
    );
  });*/
  

  
  const genreFour =()=>{
    let card = []
  
  for(let i=0;i<sectionFour.length;i++){
    let movieName = sectionFour[i].title;
    if(sectionFour[i].title.length>27){
      sectionFour[i].title =  sectionFour[i].title.substring(0,24) + "..." 
    }
    let poster = `http://image.tmdb.org/t/p/original${sectionFour[i].poster_path}`;
    if(!sectionFour[i].hasOwnProperty("poster_path")){
      poster = noPoster;
    }
    card.push(
      <div style={{paddingTop:"25px"}} key={i}>
        <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
          <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"185px",border:"4px solid black"}} src={`${poster}`} alt="Card image cap"/>
            <CardBody className="paddingCardbody">
                <CardTitle  style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={`${movieName}`}>{`${sectionFour[i].title}`}</CardTitle>
                
                <div style={{}}>
                <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", padding:"0"}}>
             
                  <Button onClick={()=>{this.getMovieId(`${sectionFour[i].id}`)}} color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${see}`} alt=""></img></span>See More</Button>{' '}
           
                </NavLink>

                <div style={{  display:"inline-block", marginRight:"0px", float:"right"}}>
                  <Button  onClick={ ()=>{this.sectionFourOnclick(i)}}   color="warning" size="sm"><span> <img max-width="10px" max-height="15px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={`${add}`}alt=""></img></span>Add</Button>{' '} 
                </div>

              </div>      
                  

                </CardBody>
          </Card>
      </div>
  
    )
  }
    return card
}
  //sectionFour = movies.slice(30,41);
  /*const genreFour = sectionFour.map((movie, index) => {
    
    let movieName = movie.title;
    if(movie.title.length>27){
      movieName = movieName.substring(0,24) + "..." 
    }
    if(movie.director === null){
      movie.director = "N/A"
    }

    let poster = `http://image.tmdb.org/t/p/original${movie.poster_path}`;
    if(movie.poster_path === null || !movie.hasOwnProperty("poster_path")){
      poster = noPoster;
    }

  return(

    <div style={{paddingTop:"25px"}} key={index}>
    <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
      <CardImg  
        src={poster} alt="Card image cap" style={{border:"4px solid black", height:"278px", width:"185px",maxHeight:"278px", maxWidth:"185px",}} />
        <CardBody className="paddingCardbody">
            <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize", fontSize:"13px"}} title={movie.title}>{movieName}</CardTitle>
            <CardText  style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}} title={movie.director}>{movie.director}</CardText>
            <div style={{}}>
                  <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", padding:"0"}}>
               
                    <Button color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
             
                  </NavLink>

                  <div style={{  display:"inline-block", marginRight:"0px", float:"right"}}>
                    <Button  onClick={ ()=>{this.sectionFourOnclick(index)}}   color="warning" size="sm"><span> <img max-width="10px" max-height="10px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={add} alt=""></img></span>Add</Button>{' '} 
                  </div>

                </div>   
          </CardBody>
      </Card>
    </div>
    );
  });*/

  
  const genreFive =()=>{
    let card = []
  
  for(let i=0;i<sectionFive.length;i++){
    let movieName = sectionFive[i].title;
    if(sectionFive[i].title.length>27){
      sectionFive[i].title =  sectionFive[i].title.substring(0,24) + "..." 
    }
    let poster = `http://image.tmdb.org/t/p/original${sectionFive[i].poster_path}`;
    if(!sectionFive[i].hasOwnProperty("poster_path")){
      poster = noPoster;
    }
    card.push(
      <div style={{paddingTop:"25px"}} key={i}>
        <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
          <CardImg style={{maxHeight:"278px", maxWidth:"185px",height:"278px", width:"185px",border:"4px solid black"}} src={`${poster}`} alt="Card image cap"/>
            <CardBody className="paddingCardbody">
                <CardTitle  style={{color:"#fec106", textTransform:"capitalize",  fontSize:"13px"}} title={`${movieName}`}>{`${sectionFive[i].title}`}</CardTitle>
                
                <div style={{}}>
                <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", padding:"0"}}>
             
                  <Button onClick={()=>{this.getMovieId(`${sectionFive[i].id}`)}} color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={`${see}`} alt=""></img></span>See More</Button>{' '}
           
                </NavLink>

                <div style={{  display:"inline-block", marginRight:"0px", float:"right"}}>
                  <Button  onClick={ ()=>{this.sectionFiveOnclick(i)}}   color="warning" size="sm"><span> <img max-width="10px" max-height="15px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={`${add}`}alt=""></img></span>Add</Button>{' '} 
                </div>

              </div>      
                  

                </CardBody>
          </Card>
      </div>
  
    )
  }
    return card
}
  //sectionFive = movies.slice(40,51);
 /* const genreFive = sectionFive.map((movie, index) => {
    
    let movieName = movie.title;
    if(movie.title.length>27){
      movieName =  movieName.substring(0,24) + "..." 
    }
    if(movie.director === null ){
      movie.director = "N/A"
    }

    let poster = `http://image.tmdb.org/t/p/original${movie.poster_path}`;
    if(movie.poster_path === null || !movie.hasOwnProperty("poster_path")){
      poster = noPoster;
    }

  return(

    <div style={{paddingTop:"25px"}} key={index}>
    <Card style={{maxWidth:"185px", borderColor:" #1c1b1b"}}>
      <CardImg  
        src={poster} alt="Card image cap" style={{border:"4px solid black", height:"278px", width:"185px",maxHeight:"278px", maxWidth:"185px",}} />
        <CardBody className="paddingCardbody">
            <CardTitle className="paddingCardbody" style={{color:"#fec106", textTransform:"capitalize", fontSize:"13px"}} title={movie.title}>{movieName}</CardTitle>
            <CardText style={{color:"#FFFFFF", textTransform:"capitalize",  fontSize:"12px"}} title={movie.director}>{movie.director}</CardText>
            <div style={{}}>
                  <NavLink tag={Link} exact to="/details" style={{display:"inline-block", height:"100%", margin:"0", padding:"0"}}>
               
                    <Button color="warning" size="sm"><span> <img max-width="15px" max-height="15px" style={{paddingBottom:"2px", paddingRight:"2px"}} src={see} alt=""></img></span>See More</Button>{' '}
             
                  </NavLink>

                  <div style={{  display:"inline-block", marginRight:"0px", float:"right"}}>
                    <Button  onClick={ ()=>{this.sectionFiveOnclick(index)}}   color="warning" size="sm"><span> <img max-width="10px" max-height="10px" style={{paddingBottom:"3.5px", paddingRight:"2px"}} src={add} alt=""></img></span>Add</Button>{' '} 
                  </div>

                </div>   

       </CardBody>
      </Card>
    </div>
    );
  });*/

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
            {genreOne()}
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
            {genreTwo()}
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
            {genreThree()}
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
            {genreFour()}
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
            {genreFive()}
            </Carousel>;
          </div>
        </div>
        </Container>
      </div>

    );
  }

}
export default AppTodaysFiftyContent;