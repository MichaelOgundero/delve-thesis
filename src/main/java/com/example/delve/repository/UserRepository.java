package com.example.delve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.example.delve.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long>{

   UserEntity findByUsername(String username);
}

/*
   @PostMapping("/user")
   ResponseEntity<UserEntity> createUser(@Valid @RequestBody UserEntity userEntity){
       UserEntity emailValid = new UserEntity();
       List<String> usernameList = new ArrayList<String>();
       List<String> emailList = new ArrayList<String>();
        for(UserEntity existingUser : userRepository.findAll()){
            usernameList.add(existingUser.getUsername());
            emailList.add(existingUser.getEmail());
        }

     
        if(!emailList.contains(userEntity.getEmail()) && emailValid.isValid(userEntity.getEmail())){
            if(!usernameList.contains(userEntity.getUsername())){
                userRepository.save(userEntity);   
                return ResponseEntity.status(HttpStatus.CREATED).build();
            }

        }
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
   } */