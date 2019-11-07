package com.example.delve.movie;

import java.util.ArrayList;
import java.util.List;


import com.example.delve.reviews.ReviewExample;
import com.example.delve.reviews.ReviewResult;

import org.springframework.web.client.RestTemplate;

public class ReviewsDTO{
    private ReviewExample reviewExample;
    private List<ReviewResult> reviewList;

    public ReviewsDTO(String movieID){
        RestTemplate restTemplate = new RestTemplate();
        this.reviewExample = restTemplate.getForObject("https://api.themoviedb.org/3/movie/"+movieID+"/reviews?api_key=623eeab48528051330ddc3ca73959483&language=en-US&page=1", ReviewExample.class);

        this.reviewList = new ArrayList<>();

        for(int i=0;i<reviewExample.getResults().size();i++){
            this.reviewList.add(reviewExample.getResults().get(i));
        }


    }

    public List<ReviewResult> getReviews(){
        return this.reviewList;
    }



}

