package com.example.delve.movieweb;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import com.example.delve.movie.MovieDTO;
import com.example.delve.movie.NowPlayingDTO;
import com.example.delve.movie.NowPlayingSectionDTO;
import com.example.delve.movie.ReviewsDTO;
import com.example.delve.movie.SearchDTO;
import com.example.delve.movie.TodaysFiftyDTO;
import com.example.delve.movie.TrendingDTO;
import com.example.delve.movie.UpcomingMovieDTO;
import com.example.delve.nowplaying.NowPlayingResult;
import com.example.delve.nowplayingcarousel.NowPlayingCarouselResult;
import com.example.delve.search.SearchResult;
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
    /*
     * int page = random.nextInt((500 - 1) + 1) + 1; int result =
     * random.nextInt((19-0)+1) + 0;
     */
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
    // TodaysFiftyDTO xxx = new TodaysFiftyDTO();
    // List<Integer> pageMax = xxx.getPageMax((genreIDs[listIds.get(0)]));

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
        Thread.sleep(1000);
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

    @GetMapping("/todaysfifty")
    public List<TodaysFiftyDTO> getTodaysFifty() throws InterruptedException {
       List <TodaysFiftyDTO> todaysFiftyDTO = new ArrayList<TodaysFiftyDTO>();

        
        if(!this.today().equals(current) || listIds.size() == 0 || pageValues.size() == 0 || resultValues.size() == 0){
            current = this.today();
            for(int i=0;i<10;i++){
               
                TodaysFiftyDTO xxx = new TodaysFiftyDTO();
                /*int page = xxx.getPageMax(genreIDs[listIds.get(0)]);
                int result = xxx.getResultMax(genreIDs[listIds.get(0)]);*/
                //Section 1
                int x = xxx.getPageMax(genreIDs[listIds.get(0)]);
                int y = xxx.getResultMax(genreIDs[listIds.get(0)]);
                int page = random.nextInt(( x- 1) + 1) + 1;
                int result = random.nextInt((y-0)+1) + 0;
                Thread.sleep(1000);
                pageValues.add(page);
                resultValues.add(result);

                genreSection = new TodaysFiftyDTO(genreIDs[listIds.get(0)], page, result);
                todaysFiftyDTO.add(genreSection);
            }

            /*Thread.sleep(1000);*/

            for(int i=0;i<10;i++){
               
                //Section 2
                TodaysFiftyDTO xxx = new TodaysFiftyDTO();
                int x = xxx.getPageMax(genreIDs[listIds.get(1)]);
                int y = xxx.getResultMax(genreIDs[listIds.get(1)]);
                int page = random.nextInt(( x- 1) + 1) + 1;
                int result = random.nextInt((y-0)+1) + 0;
                Thread.sleep(1000);
                pageValues.add(page);
                resultValues.add(result);

                genreSection = new TodaysFiftyDTO(genreIDs[listIds.get(1)], page, result);
                todaysFiftyDTO.add(genreSection);
            }

            /*Thread.sleep(1000);*/

            for(int i=0;i<10;i++){
               
                //Section 3
                TodaysFiftyDTO xxx = new TodaysFiftyDTO();
                int x = xxx.getPageMax(genreIDs[listIds.get(2)]);
                int y = xxx.getResultMax(genreIDs[listIds.get(2)]);
                int page = random.nextInt(( x- 1) + 1) + 1;
                int result = random.nextInt((y-0)+1) + 0;
                Thread.sleep(1000);
                pageValues.add(page);
                resultValues.add(result);

                genreSection = new TodaysFiftyDTO(genreIDs[listIds.get(2)], page, result);
                todaysFiftyDTO.add(genreSection);
            }

            /*Thread.sleep(1000);*/

            for(int i=0;i<10;i++){
               
                //Section 4
                TodaysFiftyDTO xxx = new TodaysFiftyDTO();
                int x = xxx.getPageMax(genreIDs[listIds.get(3)]);
                int y = xxx.getResultMax(genreIDs[listIds.get(3)]);
                int page = random.nextInt(( x- 1) + 1) + 1;
                int result = random.nextInt((y-0)+1) + 0;
                Thread.sleep(1000);
                pageValues.add(page);
                resultValues.add(result);

                genreSection = new TodaysFiftyDTO(genreIDs[listIds.get(3)],page,result);
                todaysFiftyDTO.add(genreSection);
            }

            //Thread.sleep(1000);

            for(int i=0;i<10;i++){
               
                //Section 5
                TodaysFiftyDTO xxx = new TodaysFiftyDTO();
                int x = xxx.getPageMax(genreIDs[listIds.get(4)]);
                int y = xxx.getResultMax(genreIDs[listIds.get(4)]);
                int page = random.nextInt(( x- 1) + 1) + 1;
                int result = random.nextInt((y-0)+1) + 0;
                Thread.sleep(1000);
                pageValues.add(page);
                resultValues.add(result);

                genreSection = new TodaysFiftyDTO(genreIDs[listIds.get(4)], page, result);
                todaysFiftyDTO.add(genreSection);
            }
           
        }else{
            //Section 1
            for(int i=0;i<10;i++){
                Thread.sleep(1000);

                    TodaysFiftyDTO movieGenreOne = new TodaysFiftyDTO(genreIDs[listIds.get(0)], pageValues.get(i), resultValues.get(i));
                    todaysFiftyDTO.add(movieGenreOne);
            }
           //Thread.sleep(1000);
            //Section 2
            for(int i=0;i<10;i++){
                Thread.sleep(1000);

                    TodaysFiftyDTO movieGenreTwo = new TodaysFiftyDTO(genreIDs[listIds.get(1)], pageValues.get(i+10), resultValues.get(i+10));
                    todaysFiftyDTO.add(movieGenreTwo);
            }
            //Thread.sleep(1000);
            //Section 3
            for(int i=0;i<10;i++){
                Thread.sleep(1000);

                    TodaysFiftyDTO movieGenreThree = new TodaysFiftyDTO(genreIDs[listIds.get(2)], pageValues.get(i+20), resultValues.get(i+20));
                    todaysFiftyDTO.add(movieGenreThree);
            }
            //Thread.sleep(1000);
            //Section 4
            for(int i=0;i<10;i++){
                Thread.sleep(1000);

                    TodaysFiftyDTO movieGenreFour = new TodaysFiftyDTO(genreIDs[listIds.get(3)], pageValues.get(i+30), resultValues.get(i+30));
                    todaysFiftyDTO.add(movieGenreFour);
            }
            //Thread.sleep(1000);
            //Section 5
            for(int i=0;i<10;i++){
                Thread.sleep(1000);

                    TodaysFiftyDTO movieGenreFive = new TodaysFiftyDTO(genreIDs[listIds.get(4)], pageValues.get(i+40), resultValues.get(i+40));
                    todaysFiftyDTO.add(movieGenreFive);
            }
                
            }
    
    
        return todaysFiftyDTO;
    }

    @GetMapping("/reviews")
    public List<ReviewsDTO> getReviews() throws InterruptedException {
    List <ReviewsDTO> reviews = new ArrayList<ReviewsDTO>();
        Thread.sleep(2000);
        ReviewsDTO review= new ReviewsDTO();
        reviews.add(review);
        return reviews;
    }

    public LocalDate today(){
        return LocalDate.now();
    }

 
    

}