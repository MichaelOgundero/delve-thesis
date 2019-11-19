package com.example.delve.controllers;

import com.example.delve.entity.MovieList;
import com.example.delve.entity.User;
import com.example.delve.repository.MovieListRepository;
import com.example.delve.repository.UserRepository;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class MovieListController{
    private MovieListRepository movieListRepository;


    public MovieListController(MovieListRepository movieListRepository, UserRepository userRepository){
        this.movieListRepository = movieListRepository;
    
    }

    @GetMapping("movieList")
    Collection<MovieList> movieList(Principal principal){
        return movieListRepository.findAll();
    }

    @PostMapping("/newMovie")
    ResponseEntity<MovieList> addMovie(@Valid @RequestBody MovieList movieList){
        
        List<String> movieIds = new ArrayList<String>();
        for(MovieList existingIds: movieListRepository.findAll()){
            movieIds.add(existingIds.getMovieId());
        }
        if(!movieIds.contains(movieList.getMovieId())){
            movieListRepository.save(movieList);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @DeleteMapping("/movieList/{id}")
        public ResponseEntity<MovieList> deleteMovie(@PathVariable Long id){
            movieListRepository.deleteById(id);

            return ResponseEntity.status(HttpStatus.OK).build();
        } 
    
}