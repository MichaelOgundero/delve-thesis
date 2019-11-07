package com.example.delve.movie;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.example.delve.credits.Cast;
import com.example.delve.credits.Credits;
import com.example.delve.credits.Crew;
import com.example.delve.images.ImagesBackdrop;
import com.example.delve.images.ImagesExample;
import com.example.delve.images.ImagesPoster;
import com.example.delve.similar.SimilarExample;
import com.example.delve.similar.SimilarResults;

import org.springframework.web.client.RestTemplate;

public class MoreDetailsDTO{

    private Credits credits;
    private ImagesExample imagesExample;
    private SimilarExample similarExample;

    private HashMap<String, Object> movieDetails;

    private List<Cast> castList;
    private List<Crew> crewList;

    private List<ImagesBackdrop> backdropList;
    private List<ImagesPoster> posterList;

    private List<SimilarResults> similarList;


    public MoreDetailsDTO(String movieID){

        this.movieDetails = new HashMap<>();
        this.castList = new ArrayList<>();
        this.crewList = new ArrayList<>();
        this.backdropList = new ArrayList<>();
        this.posterList = new ArrayList<>();
        this.similarList = new ArrayList<>();

        RestTemplate restTemplateCredits = new RestTemplate();
        this.credits = restTemplateCredits.getForObject("https://api.themoviedb.org/3/movie/"+movieID+"/credits?api_key=623eeab48528051330ddc3ca73959483", Credits.class);
        this.setCastList(credits.getCast());
        this.setCrewList(credits.getCrew());

        RestTemplate restTemplateImages = new RestTemplate();
        this.imagesExample = restTemplateImages.getForObject("https://api.themoviedb.org/3/movie/"+movieID+"/images?api_key=623eeab48528051330ddc3ca73959483&language=en-US&include_image_language=en", ImagesExample.class);
        this.setBackdropList(imagesExample.getBackdrops());
        this.setPosterList(imagesExample.getPosters());

        RestTemplate restTemplateSimilar = new RestTemplate();
        this.similarExample = restTemplateSimilar.getForObject("https://api.themoviedb.org/3/movie/"+movieID+"/similar?api_key=623eeab48528051330ddc3ca73959483&language=en-US&page=1", SimilarExample.class);
        this.setSimilarResults(similarExample.getResults());

    }


    public void setCastList(List<Cast> castList){
        this.castList = castList;
        this.movieDetails.put("movieCast", this.getCastList());
    }

    public List<Cast> getCastList(){
        return this.castList;
    }

    public void setCrewList(List<Crew> crewList){
        this.crewList = crewList;
        this.movieDetails.put("movieCrew", this.getCrewList());
    }

    public List<Crew> getCrewList(){
        return this.crewList;
    }

    public void setBackdropList(List<ImagesBackdrop> backdropList){
        this.backdropList = backdropList;
        this.movieDetails.put("movieBackdrops", this.getBackdroplist());
    }

    public List<ImagesBackdrop> getBackdroplist(){
        return this.backdropList;
    }

    public void setPosterList(List<ImagesPoster> posterList){
        this.posterList = posterList;
        this.movieDetails.put("moviePosters", this.getPosterList());
    }

    public List<ImagesPoster> getPosterList(){
        return this.posterList;
    }

    public void setSimilarResults(List<SimilarResults> similarList){
        this.similarList = similarList;
        this.movieDetails.put("similarMovies", this.getSimilarResults());

    }

    public List<SimilarResults> getSimilarResults(){
        return this.similarList;
    }

}