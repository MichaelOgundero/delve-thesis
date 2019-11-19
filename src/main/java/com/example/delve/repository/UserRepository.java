package com.example.delve.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.delve.entity.User;
import com.example.delve.entity.UserEntity;


public interface UserRepository extends JpaRepository<UserEntity, Long>{
    
      UserEntity findUserByUsername(String userName);
      
      UserEntity findById(long id);
   }