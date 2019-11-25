package com.example.delve.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity(name = "Movie_List")
public class MovieList{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String movieTitle;

    @NotNull
    private String movieImage;

    @NotNull
    private String movieId;

    private Double movieRating;
    private String movieDescription;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private UserEntity userEntity;


    public MovieList(){}

    public MovieList(String movieTitle, String movieImage, String movieId){
            this.movieTitle = movieTitle;
            this.movieImage = movieImage;
            this.movieId = movieId;
         
    }

    public void setMovieRating(Double movieRating){
        this.movieRating = movieRating;
    }

    public Double getMovieRating(){
        return movieRating;
    }

    public void setMovieDescription(String movieDescription){
        this.movieDescription = movieDescription;
    }

    public String getMovieDescription(){
        return movieDescription;
    }
    

    public void setId(Long id){
        this.id = id;
    }

    public Long getId(){
        return id;
    }

    public void setMovieTitle(String movieTitle){
        this.movieTitle = movieTitle;
    }

    public String getMovieTitle(){
        return movieTitle;
    }

    public void setMovieId(String movieId){
        this.movieId = movieId;
    }

    public String getMovieId(){
        return movieId;
    }

    public void setMovieImage(String movieImage){
        this.movieImage = movieImage;
    }

    public String getMovieImage(){
        return movieImage;
    }

    public void setUserEntity(UserEntity userEntity){
        this.userEntity = userEntity;
    }

    public UserEntity getUserEntity(){
        return userEntity;
    }
 

}