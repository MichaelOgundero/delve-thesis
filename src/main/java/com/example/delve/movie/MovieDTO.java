package com.example.delve.movie;

import com.example.delve.classmodels.Example;
import java.util.HashMap;
import org.springframework.web.client.RestTemplate;

public class MovieDTO {
    private int budget;
    private String title;
    private String overview;
    private Example example;
    private HashMap<String, Object> movies;
    
 

    public MovieDTO(){
        RestTemplate restTemplate = new RestTemplate();
   
        this.example = restTemplate.getForObject("https://api.themoviedb.org/3/movie/550?api_key=623eeab48528051330ddc3ca73959483", Example.class);
        movies = new HashMap<>();
        
        this.setBudget(example.getBudget());
        this.setTitle(example.getTitle());
        this.setOverview(example.getOverview());
    }

   

    public int getBudget(){
        return this.budget;
    }

    public String getTitle(){
        return this.title;
    }

    public String getOverview(){
        return this.overview;
    }


    public void setBudget(int budget){
        this.budget = budget;
        movies.put("budget", this.getBudget());
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