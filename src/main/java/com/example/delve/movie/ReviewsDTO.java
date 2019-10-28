package com.example.delve.movie;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.example.delve.ratings.RatingExample;
import com.example.delve.reviews.ReviewExample;

import org.springframework.web.client.RestTemplate;

public class ReviewsDTO{
    private ReviewExample reviewExample;
    private RatingExample ratingExample;
    private HashMap<String, String> reviews;
    private String author;
 
    private String rating;
    private List<Object> reviewList;

    public ReviewsDTO(){
        RestTemplate restTemplate = new RestTemplate();
        this.reviewExample = restTemplate.getForObject("https://api.themoviedb.org/3/movie/550/reviews?api_key=623eeab48528051330ddc3ca73959483&language=en-US&page=1", ReviewExample.class);

        this.reviewList = new ArrayList<>();
       this.reviews = new HashMap<>();

       for(int i=0;i<reviewExample.getResults().size();i++){
           this.setReview(reviewExample.getResults().get(i).getContent());
       }

       RestTemplate restRating = new RestTemplate();
       this.ratingExample = restRating.getForObject("https://api.themoviedb.org/3/movie/550/release_dates?api_key=623eeab48528051330ddc3ca73959483", RatingExample.class);
      
       for(int i=0;i<ratingExample.getResults().size();i++){
           if(ratingExample.getResults().get(i).getIso31661().contentEquals("US")){
               this.setRating(ratingExample.getResults().get(i).getReleaseDates().get(0).getCertification());
           }
       }


    }


    public void setRating(String rating){
        this.rating = rating;

        reviews.put("rating", this.getRating());
    }

    public String getRating(){
        return this.rating;
    }

    public void setReview(String review){
        this.reviewList.add(review);
    }

    public Object[] getReview(){
        return this.reviewList.toArray();
    }

    public void setAuthor(String author){
        this.author = author;
        reviews.put("author", this.getAuthor());
    }

    public String getAuthor(){
        return this.author;
    }



}

