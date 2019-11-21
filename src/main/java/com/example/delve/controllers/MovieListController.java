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
    public Collection<MovieList> getAllMovies(@PathVariable Long userId){
        return movieListRepository.findByUserEntityId(userId);
    }


    @PostMapping("/users/{userId}/movieList")
    public MovieList createMovieList(@PathVariable  Long userId,
                                    @Valid @RequestBody MovieList movieList){
        return userRepository.findById(userId).map(user -> {    //find user by the id in the userRepository save it to a variable "user"
            movieList.setUserEntity(user);                      //then set the saved "user" to be the userEntity of the movieList class ur creating, basiccally adding the movie the the movielist of the user
            return movieListRepository.save(movieList);         //then save the movieList to the repo
        }).orElseThrow(() -> new ResourceNotFoundException("userID "+ userId + " not found"));

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
    

    @DeleteMapping("/users/{userId}/movieList/{movieListId}")
    public ResponseEntity<?> deleteMovieFromList(@PathVariable Long userId, 
                                                 @PathVariable Long movieListId){
        return movieListRepository.findByIdAndUserEntityId(movieListId, userId).map(movie -> {  //find the movie by the userid and the movieId, then delete from the movieList repo
            movieListRepository.delete(movie);
            return ResponseEntity.ok().build();
            
        }).orElseThrow(() -> new ResourceNotFoundException("movie not found with id " + movieListId + "and postId " + userId));
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