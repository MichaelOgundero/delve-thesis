package com.example.delve.repository;


import java.util.Optional;

import com.example.delve.entity.MovieList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MovieListRepository extends JpaRepository<MovieList, Long>{

	Page<MovieList> findByUserEntityId(Long userId, Pageable pageable);

 
    
    //Page<MovieList> findByUserId(Long id, Pageable pageable);
    //Optional<MovieList> findByIdAndUserId(Long id, Long userId);

    // findByPostId(Long postId, Pageable pageable);
    //Optional<Comment> findByIdAndPostId(Long id, Long postId);

 }