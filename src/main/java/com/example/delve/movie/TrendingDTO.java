package com.example.delve.movie;

import java.util.HashMap;

import com.example.delve.trending.TrendingExample;

import org.springframework.web.client.RestTemplate;

public class TrendingDTO {

    private TrendingExample trendingExample;
    private HashMap<String, Object> trendings;
    private String title;
    private String posterPath;
    private int trendingId;

        
    public TrendingDTO(int i){
        RestTemplate restTemplate = new RestTemplate();

        this.trendingExample = restTemplate.getForObject("https://api.themoviedb.org/3/trending/movie/week?api_key=623eeab48528051330ddc3ca73959483", TrendingExample.class);

        trendings = new HashMap<>();

        this.setTitle(trendingExample.getResults().get(i).getTitle());
        this.setPosterPath(trendingExample.getResults().get(i).getPosterPath());
        this.setTrendingId(trendingExample.getResults().get(i).getId());
        
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