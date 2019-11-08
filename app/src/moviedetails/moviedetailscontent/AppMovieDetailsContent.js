import React,  {Component} from 'react';
import { NavLink as Link} from 'react-router-dom';

import './AppMovieDetailsContent.css';



class  AppMovieDetailsContent extends Component{

    constructor(props){
        super(props);
        this.state = {
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
    }


    componentDidMount(){
        this._isMounted  = true;
        this._isMounted && this.getInformation();
      }
    
      componentWillUnmount(){
        this._isMounted = false;
      }

      async getInformation(){

   
        Promise.all([
            fetch("api/detail/550"),
            fetch("api/moreDetails/550"),
            fetch("api/reviews/550"),
            fetch("api/videos/550")

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


        const { movieDetails, movieCast,
                movieCrew, movieBackdrops,
                moviePoster, similarMovies,
                movieReviews, movieVideos,
                 isLoading} = this.state;

                 movieDetails.forEach(cast => {
            console.log(cast.title)
        });

        

            return(
                <div></div>
            )

      }

}

export default AppMovieDetailsContent;