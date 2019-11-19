package com.example.delve.controllers;

import com.example.delve.entity.UserEntity;
import com.example.delve.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class UsersController{
    
    private UserRepository userRepository;

    public UsersController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    Collection<UserEntity> users(){
        return userRepository.findAll();
    }

  @GetMapping("/user/{username}")
    ResponseEntity<UserEntity> getUser(@PathVariable String username){

        List<String> empty = new ArrayList<String>();

        List<String> usernames = new ArrayList<String>();
        for(UserEntity existingUsernames : userRepository.findAll()){
            usernames.add(existingUsernames.getUsername());
        }
        if(usernames.contains(username)){
            /*Optional<UserEntity> user = Optional.of(userRepository.findUserByUsername(username));
            return user.map(response -> ResponseEntity.ok().body(response));*/
            UserEntity user = userRepository.findUserByUsername(username);
            return ResponseEntity.status(HttpStatus.FOUND).body(user);
        }
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(new UserEntity());
    }

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
   } 
}
