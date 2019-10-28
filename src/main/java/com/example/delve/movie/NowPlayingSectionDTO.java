package com.example.delve.movie;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.example.delve.credits.Credits;
import com.example.delve.nowplaying.NowPlayingExample;

import org.springframework.web.client.RestTemplate;

public class NowPlayingSectionDTO{
    private NowPlayingExample nowPlayingExample;
    private Credits credits;
    private HashMap<String, Object> movies;
    private String title;
    private String overview;
    private String posterPath;
    private String backdropPath;
    private int movieId;
    private double score;
    private String releaseDate;
    private String language;
    private boolean adult;
    private String director;
    private List<String> genres;

    public NowPlayingSectionDTO(int i){
        RestTemplate restTemplate = new RestTemplate();
        this.nowPlayingExample = restTemplate.getForObject("https://api.themoviedb.org/3/movie/now_playing?api_key=623eeab48528051330ddc3ca73959483&language=en-US&page=1&region=HU", NowPlayingExample.class);

        this.movies = new HashMap<>();
        this.genres = new ArrayList<>();

        this.setTitle(nowPlayingExample.getResults().get(i).getTitle());
        this.setOverview(nowPlayingExample.getResults().get(i).getOverview());
        this.setPosterPath(nowPlayingExample.getResults().get(i).getPosterPath());
        this.setBackdropPath(nowPlayingExample.getResults().get(i).getBackdropPath());
        this.setMovieId(nowPlayingExample.getResults().get(i).getId());
        this.setScore(nowPlayingExample.getResults().get(i).getVoteAverage());
        this.setReleaseDate(nowPlayingExample.getResults().get(i).getReleaseDate());
        this.setLanguage(nowPlayingExample.getResults().get(i).getOriginalLanguage());
        this.setAdult(nowPlayingExample.getResults().get(i).getAdult());
        
        RestTemplate restTemplateDirector = new RestTemplate();
        this.credits = restTemplateDirector.getForObject("https://api.themoviedb.org/3/movie/"+nowPlayingExample.getResults().get(i).getId()+"/credits?api_key=623eeab48528051330ddc3ca73959483", Credits.class);
        for(int j=0;j<credits.getCrew().size();j++){
            if(credits.getCrew().get(j).getJob().contentEquals("Director")){
                this.setDirector(credits.getCrew().get(j).getName());
             }
        
        }
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

