package com.example.delve.repository;

import java.util.Collection;
import java.util.Optional;

import com.example.delve.entity.MovieList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieListRepository extends JpaRepository<MovieList, Long>{

	Collection<MovieList> findByUserEntityId(Long userId);
    Optional<MovieList> findByIdAndUserEntityId(Long id, Long userId);
    Collection<MovieList> findByMovieId(String movieId);
    Optional<MovieList> findByMovieIdAndUserEntityId(String movieId, Long userId);
 }

