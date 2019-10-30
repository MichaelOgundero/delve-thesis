package com.example.delve.movie;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.example.delve.search.SearchExample;
import org.springframework.web.client.RestTemplate;

public class SearchDTO{
    private HashMap<String, Object> movies;
    private SearchExample searchExample;
    private String title;
    private String posterPath;
    private int movieId;
    private double score;
    private String releaseDate;
    private String language;
    private List<String> genres;
    private List<Object> searchMovies;
    

    public SearchDTO(String movie, int i){

        RestTemplate restTemplate = new RestTemplate();

        this.searchExample = restTemplate.getForObject("https://api.themoviedb.org/3/search/movie?api_key=623eeab48528051330ddc3ca73959483&language=en-US&query="+movie+"&page=1&include_adult=false", SearchExample.class);
        
        this.movies = new HashMap<>();
        this.genres = new ArrayList<>();
                
        if(searchExample.getResults().get(i).getOriginalLanguage().equals("en")){
            this.setTitle(searchExample.getResults().get(i).getTitle());
            this.setPosterPath(searchExample.getResults().get(i).getPosterPath());
            this.setMovieId(searchExample.getResults().get(i).getId());
            this.setScore(searchExample.getResults().get(i).getVoteAverage());
            this.setReleaseDate(searchExample.getResults().get(i).getReleaseDate());
            this.setLanguage(searchExample.getResults().get(i).getOriginalLanguage());
        
            for(int j=0;j<searchExample.getResults().get(i).getGenreIds().size();j++){
                this.setGenres(this.translateGenres(searchExample.getResults().get(i).getGenreIds().get(j).toString()));
            }
        
        }
 


        
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



    public void setGenres(String genre){
        this.genres.add(genre);
    }

    public Object[] getGenres(){
        return this.genres.toArray();
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


    public void setReleaseDate(String releaseDate){
        this.releaseDate = releaseDate;
        movies.put("releaseDate", this.getReleaseDate());
    }

    public String getReleaseDate(){
        return this.releaseDate;
    }



}

