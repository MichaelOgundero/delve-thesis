package com.example.delve.movie;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.web.client.RestTemplate;

import com.example.delve.details.DetailsExample;
import com.example.delve.details.DetailsProductionCompany;
import com.example.delve.keywords.KeywordExample;
import com.example.delve.keywords.KeywordResult;
import com.example.delve.ratings.RatingExample;

public class MovieDetailsDTO{
    private DetailsExample detailsExample;
    private RatingExample ratingExample;
    private KeywordExample keywordExample;

  
   
    
    private HashMap<String, Object> movies;

    private double score;

    private int runtime;
    private String movieId;
    private int revenue;
    private int budget;

    private String title;
    private String originalTitle;
    private String overview;
    private String posterPath;
    private String releaseDate;
    private String backdropPath;
    private String language;
    private String homepage;
    private String status;
    private String tagline;
    private String movieRating;

    private List<String> genres;
    private List<DetailsProductionCompany> productionCompanies;
    private List<String> productionCountries;
    private List<String> spokenLanguages;
    private List<KeywordResult> keywords;

   
   


    public MovieDetailsDTO(String movieID){
        RestTemplate restTemplate = new RestTemplate();
        this.detailsExample = restTemplate.getForObject("https://api.themoviedb.org/3/movie/"+movieID+"?api_key=623eeab48528051330ddc3ca73959483&language=en-US", DetailsExample.class);

        this.movies = new HashMap<>();
        this.genres = new ArrayList<>();
        this.productionCompanies = new ArrayList<>();
        this.productionCountries = new ArrayList<>();
        this.spokenLanguages = new ArrayList<>();
        this.keywords = new ArrayList<>();
        

    
        this.setTitle(detailsExample.getTitle());
        this.setOriginalTitle(detailsExample.getOriginalTitle());
        this.setStatus(detailsExample.getStatus());
        this.setTagline(detailsExample.getTagline());
        this.setOverview(detailsExample.getOverview());
        this.setPosterPath(detailsExample.getPosterPath());
        this.setBackdropPath(detailsExample.getBackdropPath());
        this.setMovieId(detailsExample.getId().toString());
        this.setRevenue(detailsExample.getRevenue());
        this.setBudget(detailsExample.getBudget());
        this.setHomepage(detailsExample.getHomepage());
        this.setScore(detailsExample.getVoteAverage());
        this.setReleaseDate(detailsExample.getReleaseDate());
        this.setLanguage(detailsExample.getOriginalLanguage());
        this.setRuntime(detailsExample.getRuntime());

        for(int i=0;i<detailsExample.getGenres().size();i++){
            this.setGenres(detailsExample.getGenres().get(i).getName());
        }

        for(int i=0;i<detailsExample.getSpokenLanguages().size();i++){
            this.setSpokenLanguages(detailsExample.getSpokenLanguages().get(i).getName());
        }

        for(int i=0;i<detailsExample.getProductionCountries().size();i++){
            this.setProductionCountries(detailsExample.getProductionCountries().get(i).getName());
        }

        this.setProductionCompanies(detailsExample.getProductionCompanies());
       
        //getting the movie certifaction rating
        RestTemplate restTemplateRating = new RestTemplate();
        this.ratingExample = restTemplateRating.getForObject("https://api.themoviedb.org/3/movie/"+movieID+"/release_dates?api_key=623eeab48528051330ddc3ca73959483", RatingExample.class);
    
        for(int i=0; i<ratingExample.getResults().size();i++){
            if(ratingExample.getResults().get(i).getIso31661().equals("US")){
                this.setMovieRating(ratingExample.getResults().get(i).getReleaseDates().get(0).getCertification());
            }
        }

        RestTemplate restTemplateKeyword = new RestTemplate();
        this.keywordExample = restTemplateKeyword.getForObject("https://api.themoviedb.org/3/movie/"+movieID+"/keywords?api_key=623eeab48528051330ddc3ca73959483", KeywordExample.class);
        
        this.setKeywords(keywordExample.getKeywords());

        
    }

    public void setRuntime(int runtime){
        this.runtime = runtime;
        movies.put("runtime", this.getRuntime());
    }

    public int getRuntime(){
        return this.runtime;
    }

    public void setBudget(int budget){
        this.budget = budget;
        movies.put("budget", this.getBudget());
    }

    public int getBudget(){
        return this.budget;
    }

    public void setRevenue(int revenue){
        this.revenue = revenue;
        movies.put("revenue", this.getRevenue());
    }

    public int getRevenue(){
        return this.revenue;
    }

    public void setGenres(String genre){
        this.genres.add(genre);
    }

    public Object[] getGenres(){
        return this.genres.toArray();
    }

    public void setProductionCompanies(List<DetailsProductionCompany> productionCompany){
        this.productionCompanies = productionCompany;
    }

    public Object[] getProductionCompanies(){
        return this.productionCompanies.toArray();
    }

    public void setKeywords(List<KeywordResult> keyword){
        this.keywords = keyword;
    }

    public Object[] getKeywords(){
        return this.keywords.toArray();
    }

    public void setProductionCountries(String productionCountry){
        this.productionCountries.add(productionCountry);
    }

    public Object[] getProductionCountries(){
        return this.productionCountries.toArray();
    }

    public void setSpokenLanguages(String spokenLanguage){
        this.spokenLanguages.add(spokenLanguage);
    }

    public Object[] getspokenLanguages(){
        return this.spokenLanguages.toArray();
    }

    public String getHomepage(){
        return this.homepage;
    }

    public void setHomepage(String homepage){
        this.homepage = homepage;

        movies.put("homepage", this.getHomepage());
    }

    public String getMovieRating(){
        return this.movieRating;
    }

    public void setMovieRating(String movieRating){
        this.movieRating = movieRating;

        movies.put("movieRating", this.getMovieRating());
    }

    public String getOriginalTitle(){
        return this.originalTitle;
    }

    public void setOriginalTitle(String originalTitle){
        this.originalTitle = originalTitle;

        movies.put("originalTitle", this.getOriginalTitle());
    }

    public String getTagline(){
        return this.tagline;
    }

    public void setTagline(String tagline){
        this.tagline = tagline;

        movies.put("tagline", this.getTagline());
    }

    public String getStatus(){
        return this.status;
    }

    public void setStatus(String status){
        this.status = status;

        movies.put("movieStatus", this.getStatus());
    }

    public String getMovieId(){
        return this.movieId;
    }

    public void setMovieId(String movieId){
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
