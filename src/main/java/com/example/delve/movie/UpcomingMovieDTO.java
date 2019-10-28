package com.example.delve.movie;

import com.example.delve.upcoming.UpcomingExample;

import java.util.HashMap;
import org.springframework.web.client.RestTemplate;
import com.example.delve.credits.Credits;

public class UpcomingMovieDTO {

    private UpcomingExample upcomingExample;
    private Credits credits;
    private HashMap<String, Object> movies;
    private String title;
    private String director = " ";
    private String releaseDate;
    private String posterPath;
    private int upcomingId;

        
    public UpcomingMovieDTO(int i){
        RestTemplate restTemplate = new RestTemplate();

        this.upcomingExample = restTemplate.getForObject("https://api.themoviedb.org/3/movie/upcoming?api_key=623eeab48528051330ddc3ca73959483&language=en-US&page=1&region=US", UpcomingExample.class);

        movies = new HashMap<>();

        this.setTitle(upcomingExample.getResults().get(i).getTitle());
        this.setReleaseDate(upcomingExample.getResults().get(i).getReleaseDate());
        this.setPosterPath(upcomingExample.getResults().get(i).getPosterPath());
        this.setUpcomingId(upcomingExample.getResults().get(i).getId());


        RestTemplate restTemplateDirector = new RestTemplate();
        this.credits = restTemplateDirector.getForObject("https://api.themoviedb.org/3/movie/"+upcomingExample.getResults().get(i).getId()+"/credits?api_key=623eeab48528051330ddc3ca73959483", Credits.class);
        

        if(credits.getCrew().size() == 0){
            this.setDirector("N/A");
        }

        for(int j=0;j<credits.getCrew().size();j++){


            if(credits.getCrew().get(j).getJob().contains("Director")){
                this.setDirector(credits.getCrew().get(j).getName());
             }
        }
        
    }



    public String getTitle(){
        return this.title;
    }

    public void setTitle(String title){
        this.title = title;

        movies.put("title", this.getTitle());
    }

    public String getDirector(){
        return this.director;
    }

    public void setDirector(String director){
        this.director = director;
        movies.put("director", this.getDirector());
    }

    public String getReleaseDate(){
        return this.releaseDate;
    }

    public void setReleaseDate(String releaseDate){
        this.releaseDate = releaseDate;
        movies.put("director", this.getDirector());
    }

    public String getPosterPath(){
        return this.posterPath;
    }

    public void setPosterPath(String posterPath){
        this.posterPath = posterPath;
        movies.put("posterPath", this.getPosterPath());
    }

    public int getUpcomingId(){
        return this.upcomingId;
    }

    public void setUpcomingId(int upcomingId){
        this.upcomingId = upcomingId;

        movies.put("movieId", this.getUpcomingId());
    }

}