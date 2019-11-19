package com.example.delve.repository;

import java.util.List;

import com.example.delve.entity.MovieList;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieListRepository extends JpaRepository<MovieList, Long>{

    MovieList findMovieById(String movieId);
   

 }