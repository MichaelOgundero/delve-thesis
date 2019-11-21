
package com.example.delve;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;

import com.example.delve.entity.MovieList;
import com.example.delve.entity.UserEntity;
import com.example.delve.repository.MovieListRepository;
import com.example.delve.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@SpringBootApplication
public class DelveApplication {

	private static final Logger log = LoggerFactory.getLogger(DelveApplication.class);


	public static void main(String[] args) {
		SpringApplication.run(DelveApplication.class, args);
	}



}