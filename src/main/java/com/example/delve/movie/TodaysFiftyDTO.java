package com.example.delve.movie;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import com.example.delve.classmodels.Example;
import com.example.delve.credits.Credits;
import com.example.delve.movieofday.MovieOfDayExample;
import com.example.delve.movieofday.MovieOfDayResults;

import org.springframework.web.client.RestTemplate;

public class TodaysFiftyDTO{
    private MovieOfDayExample example;
    private Credits credits;
    private HashMap<String, Object> movies;
    private String title;
    private String posterPath;
    private int movieId;
    private String language;
    private String director;
    private String genreId;
    
    
  public TodaysFiftyDTO(){}
    public TodaysFiftyDTO(int genreId, int page, int result) throws InterruptedException {

        RestTemplate restTemplate = new RestTemplate();
        this.movies = new HashMap<>();  
        
        

       
      
        this.example = restTemplate.getForObject("https://api.themoviedb.org/3/discover/movie?with_genres="+genreId+"&with_original_language=en&api_key=623eeab48528051330ddc3ca73959483&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+page, MovieOfDayExample.class);
     
        //int resultMax = this.example.getResults().size() - 1;
      
  

        this.setGenreId(this.translateGenres(String.valueOf(genreId)));
        this.setTitle(example.getResults().get(result).getTitle());
        this.setMovieId(example.getResults().get(result).getId());
        this.setPosterPath(example.getResults().get(result).getPosterPath());
       
        this.setLanguage(example.getResults().get(result).getOriginalLanguage());
      
        RestTemplate restTemplateDirector = new RestTemplate();
        this.credits = restTemplateDirector.getForObject("https://api.themoviedb.org/3/movie/"+example.getResults().get(result).getId()+"/credits?api_key=623eeab48528051330ddc3ca73959483", Credits.class);
        for(int j=0;j<credits.getCrew().size();j++){
            if(credits.getCrew().get(j).getJob().contentEquals("Director")){
                this.setDirector(credits.getCrew().get(j).getName());
             }
            
        }
     
    }

    public int getPageMax(int genreID){

      RestTemplate restTemplate = new RestTemplate();
      MovieOfDayExample example;
      example = restTemplate.getForObject("https://api.themoviedb.org/3/discover/movie?with_genres="+genreID+"&with_original_language=en&api_key=623eeab48528051330ddc3ca73959483&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false", MovieOfDayExample.class);
      int pageMax = example.getTotalPages();
      return pageMax;

    }

    public int getResultMax(int genreID){
      RestTemplate restTemplate = new RestTemplate();
      MovieOfDayExample example;
      example = restTemplate.getForObject("https://api.themoviedb.org/3/discover/movie?with_genres="+genreID+"&with_original_language=en&api_key=623eeab48528051330ddc3ca73959483&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false", MovieOfDayExample.class);
      int pageMax = example.getResults().size()-1;
      return pageMax;
    }


    public void setGenreId(String genreId){
        this.genreId = genreId;
        movies.put("genreId", this.getGenreId());
    }

    public String getGenreId(){
        return this.genreId;
    }

    public String getDirector(){
        return this.director;
    }

    public void setDirector(String director){
        this.director = director;

        movies.put("director", this.getDirector());
    }

    public int getMovieId(){
        return this.movieId;
    }

    public void setMovieId(int movieId){
        this.movieId = movieId;
        movies.put("movieId", this.getMovieId());
    }




    public String getLanguage(){
        return this.language;
    }

    public void setLanguage(String language){
        this.language = language;
        movies.put("language", this.getLanguage());
    }

    public String getTitle(){
        return this.title;
    }

    public void setTitle(String title){
        this.title = title;
        movies.put("title", this.getTitle());
    }



    public void setPosterPath(String posterPath){
        this.posterPath = posterPath;
        movies.put("posterPath", this.getPosterPath());
    }

    public String getPosterPath(){
        return this.posterPath;
    }

    public String translateGenres(String genre){
      if(genre.equals("28")){
        genre = "Action";
        return genre;
      }if(genre.equals("12")){
        genre = "Adventure";
        return genre;
      }if(genre.equals("16")){
        genre = "Animation";
        return genre;
      }if(genre.equals("35")){
        genre = "Comedy";
        return genre;
      }if(genre.equals("80")){
        genre = "Crime";
        return genre;
      }if(genre.equals("99")){
        genre = "Documentary";
        return genre;
      }if(genre.equals("18")){
        genre = "Drama";
        return genre;
      }if(genre.equals("10751")){
        genre = "Family";
        return genre;
      }if(genre.equals("14")){
        genre = "Fantasy";
        return genre;
      }if(genre.equals("36")){
        genre = "History";
        return genre;
      }if(genre.equals("27")){
        genre = "Horror";
        return genre;
      }if(genre.equals("10402")){
        genre = "Music";
        return genre;
      }if(genre.equals("9648")){
        genre = "Mystery";
        return genre;
      }if(genre.equals("10749")){
        genre = "Romance";
        return genre;
      }if(genre.equals("878")){
        genre = "Science Fiction";
        return genre;
      }if(genre.equals("10770")){
        genre = "TV Movie";
        return genre;
      }if(genre.equals( "53")){
        genre = "Thriller";
        return genre;
      }if(genre.equals("10752")){
        genre = "War";
        return genre;
      }if(genre.equals("37")){
          genre = "Western";
          return genre;
      }else{
          return " ";
      }
    }


}

