package com.example.delve.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity(name = "Movie_List")
public class MovieList{

    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String movieTitle;
    private String movieImage;
    private String movieId;



    

}