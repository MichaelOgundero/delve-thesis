package com.example.delve.repository;

import java.util.Collection;
import java.util.Optional;

import com.example.delve.entity.MovieList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MovieListRepository extends JpaRepository<MovieList, Long>{

	Collection<MovieList> findByUserEntityId(Long userId);
    Optional<MovieList> findByIdAndUserEntityId(Long id, Long userId);
 
    
    //Page<MovieList> findByUserId(Long id, Pageable pageable);
    //Optional<MovieList> findByIdAndUserId(Long id, Long userId);

    // findByPostId(Long postId, Pageable pageable);
    //Optional<Comment> findByIdAndPostId(Long id, Long postId);

 }

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
    }*/