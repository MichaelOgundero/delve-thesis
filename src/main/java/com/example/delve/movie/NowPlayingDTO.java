package com.example.delve.movie;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.web.client.RestTemplate;
import com.example.delve.nowplayingcarousel.NowPlayingCarouselExample;
import com.example.delve.nowplayingcarousel.NowPlayingCarouselResult;

import com.example.delve.trailer.Trailer;

public class NowPlayingDTO{
    private NowPlayingCarouselExample nowPlayingExample;
    
    private Trailer trailerExample;
    private HashMap<String, Object> movies;
    private String title;
    private String overview;
    private String backdropPath;
    private int movieId;
    private String youtubeKey;
    private List<NowPlayingCarouselResult> nowPlayingCarousel;


    public NowPlayingDTO(){
        RestTemplate restTemplate = new RestTemplate();
        this.nowPlayingExample = restTemplate.getForObject("https://api.themoviedb.org/3/movie/now_playing?api_key=623eeab48528051330ddc3ca73959483&language=en-US&page=1&region=HU", NowPlayingCarouselExample.class);

        this.movies = new HashMap<>();
        this.nowPlayingCarousel = new ArrayList<NowPlayingCarouselResult>();

        RestTemplate restTemplateYtKey = new RestTemplate();

        for(int i=0;i<5;i++){
            this.trailerExample = restTemplateYtKey.getForObject("https://api.themoviedb.org/3/movie/"+nowPlayingExample.getResults().get(i).getId()+"/videos?api_key=623eeab48528051330ddc3ca73959483&language=en-US", Trailer.class);
            for(int j=0;j<trailerExample.getResults().size();j++){
                if(trailerExample.getResults().get(j).getType().contentEquals("Trailer")){
                    nowPlayingExample.getResults().get(i).setyoutubeKey(trailerExample.getResults().get(j).getKey());
                }
            }

            this.nowPlayingCarousel.add(nowPlayingExample.getResults().get(i));
        }
    


        
    }

    public List<NowPlayingCarouselResult> getNowPlayingCarousel(){
        return this.nowPlayingCarousel;
    }


    public String getYoutubeKey(){
        return this.youtubeKey;
    }

    public void setYoutubeKey(String youtubeKey){
        this.youtubeKey = youtubeKey;

        movies.put("youtubeKey", this.getYoutubeKey());
    }

   

    public int getMovieId(){
        return this.movieId;
    }

    public void setMovieId(int movieId){
        this.movieId = movieId;
        movies.put("movieId", this.getMovieId());
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



    public void setBackdropPath(String backdropPath){
        this.backdropPath = backdropPath;
        movies.put("backdropPath", this.getBackdropPath());
    }

    public String getBackdropPath(){
        return this.backdropPath;
    }





}

