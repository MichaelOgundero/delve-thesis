package com.example.delve.controllers;

import com.example.delve.entity.UserEntity;
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
@RequestMapping("/api")
public class UsersController{
   
    @Autowired
    private UserRepository userRepository;

  
    @GetMapping("/users")
    public Collection<UserEntity> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<UserEntity> getByUsername(@PathVariable String username){
        
        List<String> usernames = new ArrayList<String>();
        for(UserEntity existingUsernames: userRepository.findAll()){
            usernames.add(existingUsernames.getUsername());
        }
        if(usernames.contains(username)){
            UserEntity user = userRepository.findByUsername(username);
            return ResponseEntity.status(HttpStatus.FOUND).body(user);
        }
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();

    }

    @PostMapping("/user")
    public ResponseEntity<UserEntity> createUser(@Valid @RequestBody UserEntity userEntity){
        
        UserEntity emailValid = new UserEntity();
        List<String> usernameList = new ArrayList<String>();
        List<String> emailList = new ArrayList<String>();
        for(UserEntity existingUser: userRepository.findAll()){
            usernameList.add(existingUser.getUsername());
            emailList.add(existingUser.getEmail());
        }

        if(!emailValid.isValid(userEntity.getEmail())){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        if(!emailList.contains(userEntity.getEmail())){
            if(!usernameList.contains(userEntity.getUsername())){
                userRepository.save(userEntity);
                return ResponseEntity.status(HttpStatus.CREATED).body(userEntity);
            }
        }
        
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

}
