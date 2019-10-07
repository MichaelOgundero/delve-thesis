package com.example.delve.movie;

import com.example.delve.upcoming.UpcomingExample;

import java.util.HashMap;
import org.springframework.web.client.RestTemplate;

public class UpcomingMovieDTO {

    private UpcomingExample upcomingExample;
    private HashMap<String, Object> movies;
    private String title;
    private String overview;
        
    public UpcomingMovieDTO(int i){
        RestTemplate restTemplate = new RestTemplate();

        this.upcomingExample = restTemplate.getForObject("https://api.themoviedb.org/3/movie/now_playing?api_key=623eeab48528051330ddc3ca73959483&language=en-US&page=1", UpcomingExample.class);

        movies = new HashMap<>();

        this.setTitle(upcomingExample.getResults().get(i).getTitle());
        this.setOverview(upcomingExample.getResults().get(i).getOverview());
    }



    public String getTitle(){
        return this.title;
    }

    public String getOverview(){
        return this.overview;
    }

    public void setTitle(String title){
        this.title = title;

        movies.put("title", this.getTitle());
    }

    public void setOverview(String overview){
        this.overview = overview;
        movies.put("overview", this.getOverview());
    }

}