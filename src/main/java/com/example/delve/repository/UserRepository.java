package com.example.delve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

import com.example.delve.entity.UserEntity;


public interface UserRepository extends JpaRepository<UserEntity, Long>{
    
   UserEntity findUserByUsername(String userName);
   
   UserEntity findById(long id);
}