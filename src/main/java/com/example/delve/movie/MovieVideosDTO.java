package com.example.delve.movie;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.client.RestTemplate;


import com.example.delve.trailer.Trailer;
import com.example.delve.trailer.TrailerResults;

public class MovieVideosDTO{
    
    private Trailer trailerExample;
    private List<TrailerResults> movieVideos;


    public MovieVideosDTO(String movieID){
        

        this.movieVideos = new ArrayList<TrailerResults>();

        RestTemplate restTemplateYtKey = new RestTemplate();
        this.trailerExample = restTemplateYtKey.getForObject("https://api.themoviedb.org/3/movie/"+movieID+"/videos?api_key=623eeab48528051330ddc3ca73959483&language=en-US", Trailer.class);
      
        for(int i=0;i<trailerExample.getResults().size();i++){
            this.movieVideos.add(trailerExample.getResults().get(i));
        }
    


        
    }

    public List<TrailerResults> getVideos(){
        return this.movieVideos;
    }
}