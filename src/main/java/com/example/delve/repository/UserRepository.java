package com.example.delve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.example.delve.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long>{

   UserEntity findByUsername(String username);
}