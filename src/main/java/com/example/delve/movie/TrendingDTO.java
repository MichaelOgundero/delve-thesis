package com.example.delve.movie;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.example.delve.trending.TrendingExample;
import com.example.delve.trending.TrendingResults;

import org.springframework.web.client.RestTemplate;

public class TrendingDTO {

    private TrendingExample trendingExample;
    private HashMap<String, Object> trendings;
    private String title;
    private String posterPath;
    private int trendingId;
    private List<TrendingResults> trendingMovies;

        
    public TrendingDTO(){
        RestTemplate restTemplate = new RestTemplate();

        this.trendingExample = restTemplate.getForObject("https://api.themoviedb.org/3/trending/movie/week?api_key=623eeab48528051330ddc3ca73959483", TrendingExample.class);

        this.trendings = new HashMap<>();
        this.trendingMovies = new ArrayList<TrendingResults>();

        for(int i=0;i<trendingExample.getResults().size();i++){
            this.trendingMovies.add(trendingExample.getResults().get(i));
        }
        
    }


    public List<TrendingResults> getTrending(){
        return this.trendingMovies;
    }

    public String getTitle(){
        return this.title;
    }

    public void setTitle(String title){
        this.title = title;

        trendings.put("title", this.getTitle());
    }

    public String getPosterPath(){
        return this.posterPath;
    }

    public void setPosterPath(String posterPath){
        this.posterPath = posterPath;
        trendings.put("posterPath", this.getPosterPath());
    }

    public int getUpcomingId(){
        return this.trendingId;
    }

    public void setTrendingId(int trendingId){
        this.trendingId = trendingId;

        trendings.put("movieId", this.getUpcomingId());
    }

}