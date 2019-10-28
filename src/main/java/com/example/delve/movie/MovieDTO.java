package com.example.delve.movie;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.example.delve.classmodels.Example;
import com.example.delve.credits.Credits;
import com.example.delve.movieofday.MovieOfDayExample;

import org.springframework.web.client.RestTemplate;

public class MovieDTO{
    private MovieOfDayExample example;
    private Example runtimeExample;
    private Credits credits;
    private HashMap<String, Object> movies;
    private String title;
    private String overview;
    private String posterPath;
    private int movieId;
    private double score;
    private String releaseDate;
    private String backdropPath;
    private String language;
    private boolean adult;
    private String director;
    private int runtime;
    private List<String> genres;

    public MovieDTO(int page, int result){

        RestTemplate restTemplate = new RestTemplate();

        

        this.example = restTemplate.getForObject("https://api.themoviedb.org/3/discover/movie?api_key=623eeab48528051330ddc3ca73959483&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+page, MovieOfDayExample.class);

     


        this.movies = new HashMap<>();
        this.genres = new ArrayList<>();

        this.setTitle(example.getResults().get(result).getTitle());
        this.setOverview(example.getResults().get(result).getOverview());
        this.setPosterPath(example.getResults().get(result).getPosterPath());
        this.setBackdropPath(example.getResults().get(result).getBackdropPath());
        this.setMovieId(example.getResults().get(result).getId());
        this.setScore(example.getResults().get(result).getVoteAverage());
        this.setReleaseDate(example.getResults().get(result).getReleaseDate());
        this.setLanguage(example.getResults().get(result).getOriginalLanguage());
        this.setAdult(example.getResults().get(result).getAdult());
        //this.setRuntime(example.getResults().get(result).getRuntime());
        
        for(int i=0;i<example.getResults().get(result).getGenreIds().size();i++){
            this.setGenres(this.translateGenres(example.getResults().get(result).getGenreIds().get(i).toString()));
        }
        
        RestTemplate restTemplateDirector = new RestTemplate();
        this.credits = restTemplateDirector.getForObject("https://api.themoviedb.org/3/movie/"+example.getResults().get(result).getId()+"/credits?api_key=623eeab48528051330ddc3ca73959483", Credits.class);
        for(int j=0;j<credits.getCrew().size();j++){
            if(credits.getCrew().get(j).getJob().contentEquals("Director")){
                this.setDirector(credits.getCrew().get(j).getName());
             }
        
        }

        RestTemplate restTemp = new RestTemplate();
        this.runtimeExample = restTemp.getForObject("https://api.themoviedb.org/3/movie/"+example.getResults().get(result).getId()+"?api_key=623eeab48528051330ddc3ca73959483&language=en-US", Example.class);
        this.setRuntime(runtimeExample.getRuntime());




        
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

    public void setRuntime(int runtime){
        this.runtime = runtime;
        movies.put("runtime", this.getRuntime());
    }

    public int getRuntime(){
        return this.runtime;
    }

    public void setGenres(String genre){
        this.genres.add(genre);
    }

    public Object[] getGenres(){
        return this.genres.toArray();
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

    public double getScore(){
        return this.score;
    }

    public void setScore(double score){
        this.score = score;
        movies.put("score", this.getScore());
    }

    public boolean getAdult(){
        return this.adult;
    }

    public void setAdult(boolean adult){
        this.adult = adult;
        movies.put("rating", this.getAdult());
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

    public String getOverview(){
        return this.overview;
    }

    public void setOverview(String overview){
        this.overview = overview;
        movies.put("overview", this.getOverview());
    }

    public void setPosterPath(String posterPath){
        this.posterPath = posterPath;
        movies.put("posterPath", this.getPosterPath());
    }

    public String getPosterPath(){
        return this.posterPath;
    }

    public void setBackdropPath(String backdropPath){
        this.backdropPath = backdropPath;
        movies.put("backdropPath", this.getBackdropPath());
    }

    public String getBackdropPath(){
        return this.backdropPath;
    }

    public void setReleaseDate(String releaseDate){
        this.releaseDate = releaseDate;
        movies.put("releaseDate", this.getReleaseDate());
    }

    public String getReleaseDate(){
        return this.releaseDate;
    }



}

