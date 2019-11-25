package com.example.delve.controllers.movieweb;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;


import com.example.delve.movie.MoreDetailsDTO;
import com.example.delve.movie.MovieDTO;
import com.example.delve.movie.MovieDetailsDTO;
import com.example.delve.movie.MovieVideosDTO;
import com.example.delve.movie.NowPlayingDTO;
import com.example.delve.movie.NowPlayingSectionDTO;
import com.example.delve.movie.ReviewsDTO;
import com.example.delve.movie.SearchDTO;
import com.example.delve.movie.TodaysFiftyDTO;
import com.example.delve.movie.TrendingDTO;
import com.example.delve.movie.UpcomingMovieDTO;
import com.example.delve.movieofday.MovieOfDayResults;
import com.example.delve.nowplaying.NowPlayingResult;
import com.example.delve.nowplayingcarousel.NowPlayingCarouselResult;
import com.example.delve.reviews.ReviewResult;
import com.example.delve.search.SearchResult;
import com.example.delve.trailer.Trailer;
import com.example.delve.trailer.TrailerResults;
import com.example.delve.trending.TrendingResults;
import com.example.delve.upcoming.Result;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MovieController {

    // LocalDate current = this.today();
    LocalDate current = null;

    Random random = new Random();
    MovieDTO movieDTO = null;

    TodaysFiftyDTO genreSection = new TodaysFiftyDTO();
    static List<Integer> pageValues = new ArrayList<Integer>();
    static List<Integer> resultValues = new ArrayList<Integer>();

    Integer[] genreIDs = new Integer[] { 28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
            53, 10752, 37 };

    public List<Integer> getGenres() {
        List<Integer> abc = new ArrayList<Integer>();

        while (abc.size() < 5) {
            int a = random.nextInt(genreIDs.length);
            if (!abc.contains(a)) {
                abc.add(a);
            }
        }
        return abc;
    }

    List<Integer> listIds = getGenres();

    @GetMapping("/nowPlayingCarousel")
    public List<NowPlayingCarouselResult> getNowPlayingCarousel() throws InterruptedException {

        List<NowPlayingCarouselResult> movies = new ArrayList<NowPlayingCarouselResult>();
       
        Thread.sleep(1000);
            NowPlayingDTO nowPlayingDTO = new NowPlayingDTO();
            movies = nowPlayingDTO.getNowPlayingCarousel();
        

        return movies;
    }

    @GetMapping("/nowPlaying")
    public List<NowPlayingResult> getNowPlaying() throws InterruptedException {
    
        List<NowPlayingResult> movies = new ArrayList<NowPlayingResult>();
        Thread.sleep(2000);
            NowPlayingSectionDTO nowPlayingDTO = new NowPlayingSectionDTO();
            movies = nowPlayingDTO.getNowPlaying();
            return movies;
    }

       

    @GetMapping("/search/{movie}")
    public List<SearchResult> getSearch(@PathVariable String movie) throws InterruptedException {
        Thread.sleep(1000);
        List<SearchResult> movies = new ArrayList<SearchResult>();
        SearchDTO searchDTO = new SearchDTO(movie);
        movies = searchDTO.getSearchMovies();

        return movies;
    }

    @GetMapping("/detail/{movieID}")
    public List<MovieDetailsDTO> getMovieDetails(@PathVariable String movieID) throws InterruptedException{
        Thread.sleep(1000);
        List<MovieDetailsDTO> movie = new ArrayList<MovieDetailsDTO>();
        MovieDetailsDTO movieDetail = new MovieDetailsDTO(movieID);
        movie.add(movieDetail);

        return movie;

    }

    @GetMapping("/videos/{movieID}")
    public List<TrailerResults> getVideos(@PathVariable String movieID) throws InterruptedException {
        Thread.sleep(1000);
        List<TrailerResults> videos = new ArrayList<TrailerResults>();
        MovieVideosDTO movieVideosDTO = new MovieVideosDTO(movieID);
        videos = movieVideosDTO.getVideos();

        return videos;
    }

    @GetMapping("/moreDetails/{movieID}")
    public List<MoreDetailsDTO> getMoreDetails(@PathVariable String movieID) throws InterruptedException {
        Thread.sleep(1000);
        List<MoreDetailsDTO> moreDetails = new ArrayList<MoreDetailsDTO>();
        MoreDetailsDTO moreDetailsDTO = new MoreDetailsDTO(movieID);
        moreDetails.add(moreDetailsDTO);

        return moreDetails;
   
    }

    @GetMapping("/reviews/{movieID}")
    public List<ReviewResult> getReviews(@PathVariable String movieID) throws InterruptedException {
        Thread.sleep(1000);
        List<ReviewResult> reviews = new ArrayList<ReviewResult>();
        ReviewsDTO reviewsDTO = new ReviewsDTO(movieID);
        reviews = reviewsDTO.getReviews();

        return reviews;
    }



    @GetMapping("/upcoming")
    public List<Result> getUpcoming() throws InterruptedException {

        List<Result> movies = new ArrayList<Result>();
        
        Thread.sleep(1000);
            UpcomingMovieDTO upcomingMovieDTO = new UpcomingMovieDTO();
            movies = upcomingMovieDTO.getUpcoming();
        
        return movies;
    }




    @GetMapping("/trending")
    public List<TrendingResults> getTrending() throws InterruptedException {

        List<TrendingResults> movies = new ArrayList<TrendingResults>();
        Thread.sleep(1000);
            TrendingDTO trendingDTO = new TrendingDTO();
            movies = trendingDTO.getTrending();
        
        return movies;
    }

    @GetMapping("/movieofday")
    public List<MovieDTO> getMovieOfDay() throws InterruptedException {
       List <MovieDTO> movieOfDayDTO = new ArrayList<MovieDTO>();
        Thread.sleep(1000);
        if(!this.today().equals(current) || movieDTO == null){
            current = this.today();
            Random random = new Random();
            int page = random.nextInt((500 - 1) + 1) + 1;
            int result = random.nextInt((19-0)+1) + 0;
            movieDTO = new MovieDTO(page, result);
            movieOfDayDTO.add(movieDTO);
        }else{
            movieOfDayDTO.add(movieDTO);
        }

    
        return movieOfDayDTO;
    }

    @GetMapping("/todaysfifty/{genreID}")
    public List<MovieOfDayResults> getTodaysFifty(@PathVariable int genreID) throws InterruptedException {
       List <MovieOfDayResults> todaysFiftyDTO = new ArrayList<MovieOfDayResults>();
        TodaysFiftyDTO asd = new TodaysFiftyDTO(genreID);
        todaysFiftyDTO = asd.getToday50();
        return todaysFiftyDTO;
    }



    public LocalDate today(){
        return LocalDate.now();
    }

 
    

}