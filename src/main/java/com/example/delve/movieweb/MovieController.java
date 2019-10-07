package com.example.delve.movieweb;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.delve.movie.MovieDTO;
import com.example.delve.movie.UpcomingMovieDTO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MovieController{

     /*  @RequestMapping("/getMovie")
    public List<Object> getWithoutRequestParam(MovieDTO movieDTO){
        return Arrays.asList(
            movieDTO.getTitle(),
            movieDTO.getBudget()
        );
    }*/ /*returns a list as an array not json*/

    @GetMapping("/movieDetails")
    public Map<String, Object> getWithoutParam(){
        HashMap<String, Object> map = new HashMap<>();
        MovieDTO movieDTO = new MovieDTO();
        map.put("title", movieDTO.getTitle());
        map.put("budget", movieDTO.getBudget());
        map.put("overview", movieDTO.getOverview());
        return map;  
    }

    @GetMapping("/moviesList")
    public List<UpcomingMovieDTO> getMovies(){
        List<UpcomingMovieDTO> movies = new ArrayList<UpcomingMovieDTO>();

        for(int i=0;i<5;i++){
            UpcomingMovieDTO upcomingMovieDTO = new UpcomingMovieDTO(i);
            movies.add(upcomingMovieDTO);
        }

     
        
        return movies;
       

        

       /* movies.add(movieDTO);

        MovieDTO movieDTO1 = new MovieDTO();
        movies.add(movieDTO1);*/

       // movies = movieDTO.getUpcoming();

       // return movieDTO.getUpcoming();
    }

}