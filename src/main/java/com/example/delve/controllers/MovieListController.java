package com.example.delve.controllers;

import com.example.delve.entity.MovieList;
import com.example.delve.entity.UserEntity;
import com.example.delve.exception.ResourceNotFoundException;
import com.example.delve.repository.MovieListRepository;
import com.example.delve.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Autowired
    private MovieListRepository movieListRepository;

    @Autowired
    private UserRepository userRepository;

   /* public MovieListController(MovieListRepository movieListRepository, UserRepository userRepository){
        this.movieListRepository  = movieListRepository;
        this.userRepository = userRepository;
    }*/

    @GetMapping("users/{userId}/movies")
    public Page<MovieList> getAllMovies(@PathVariable Long userId, Pageable pageable){
        return movieListRepository.findByUserEntityId(userId, pageable);
    }


    @PostMapping("/users/{userId}/movieList")
    public MovieList createMovieList(@PathVariable  Long userId,
                                    @Valid @RequestBody MovieList movieList){
        return userRepository.findById(userId).map(user -> {
            movieList.setUserEntity(user);
            return movieListRepository.save(movieList);
        }).orElseThrow(() -> new ResourceNotFoundException("userID "+ userId + " not found"));

    }


 

   /* @GetMapping("/movieList")
    Optional<MovieList> movieList() {
        return  movieListRepository.findById((long) 2);
    }*/

    /*@PostMapping("/newMovie")
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
        } */
    
}