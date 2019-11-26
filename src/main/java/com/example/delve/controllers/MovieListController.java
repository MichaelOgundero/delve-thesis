package com.example.delve.controllers;

import com.example.delve.entity.MovieList;

import com.example.delve.exception.ResourceNotFoundException;
import com.example.delve.repository.MovieListRepository;
import com.example.delve.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@RestController
@RequestMapping("api")
public class MovieListController{

    @Autowired
    private MovieListRepository movieListRepository;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("users/{userId}/movies")
    public Collection<MovieList> getAllMovies(@PathVariable Long userId){
        return movieListRepository.findByUserEntityId(userId);
    }

    @GetMapping("allmovies/{movieId}")
    public Collection<MovieList> getMoviesWithId(@PathVariable String movieId){
        return movieListRepository.findByMovieId(movieId);
    }

    @GetMapping("users/{userId}/movieList/{movieId}")
    public ResponseEntity<MovieList> getMovieWithId(@PathVariable Long userId, @PathVariable String movieId) {
       // return movieListRepository.findByMovieIdAndUserEntityId(movieId, userId);

        return movieListRepository.findByMovieIdAndUserEntityId(movieId, userId).map(movie -> {  //find the movie by the userid and the movieId, then delete from the movieList repo
        
            return ResponseEntity.status(HttpStatus.FOUND).body(movie);
            
        }).orElseThrow(() -> new ResourceNotFoundException("movie not found with id " + movieId + "and postId " + userId));
    }
    

    @PostMapping("/users/{userId}/movieList")
    public ResponseEntity<?> createMovieList(@PathVariable  Long userId,
                                    @Valid @RequestBody MovieList movieList){
        
            List<String> movieIds = new ArrayList<String>();
            for(MovieList existingIds: movieListRepository.findByUserEntityId(userId)){
                movieIds.add(existingIds.getMovieId());
            }
            if(!movieIds.contains(movieList.getMovieId())){
                return userRepository.findById(userId).map(user -> {    //find user by the id in the userRepository save it to a variable "user"
                movieList.setUserEntity(user);                      //then set the saved "user" to be the userEntity of the movieList class ur creating, basiccally adding the movie the the movielist of the user
                movieListRepository.save(movieList);         //then save the movieList to the repo
                return ResponseEntity.status(HttpStatus.CREATED).body(movieList);
            }).orElseThrow(() -> new ResourceNotFoundException("userID "+ userId + " not found"));
            }

            return ResponseEntity.status(HttpStatus.CONFLICT).build();
           

    }

    @PutMapping("users/{userId}/movieList/{movieListId}")
    public MovieList updateMovie(@PathVariable Long userId, @PathVariable Long movieListId,
                                @Valid @RequestBody MovieList movieRequest){
        if(!userRepository.existsById(userId)){
            throw new ResourceNotFoundException("UserId "+ userId + " not found");  
        }

        return movieListRepository.findById(movieListId).map(movie -> {     //find by the movieId then modify the contents of the movie by the movie passed(created) as a parameter.
            movie.setMovieRating(movieRequest.getMovieRating());
            movie.setMovieDescription(movieRequest.getMovieDescription());
            return movieListRepository.save(movie);
        }).orElseThrow(() -> new ResourceNotFoundException("Movie with " + movieListId + " not found"));
    }
    

  /* @DeleteMapping("/users/{userId}/movieList/{movieListId}")
    public ResponseEntity<?> deleteMovieFromList(@PathVariable Long userId, 
                                                 @PathVariable Long movieListId){
        return movieListRepository.findByIdAndUserEntityId(movieListId, userId).map(movie -> {  //find the movie by the userid and the movieId, then delete from the movieList repo
            movieListRepository.delete(movie);
            return ResponseEntity.status(HttpStatus.GONE).build();
            
        }).orElseThrow(() -> new ResourceNotFoundException("movie not found with id " + movieListId + "and postId " + userId));
    }
*/
}