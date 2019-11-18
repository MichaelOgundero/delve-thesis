
package com.example.delve;

import com.example.delve.entity.UserEntity;
import com.example.delve.repository.UserRepository;

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

	@Bean
	public CommandLineRunner demo(UserRepository userRepository){
		return(args) -> {
			//save 
			userRepository.save(new UserEntity("kronus", "bob@bobmail.com", "password"));
			userRepository.save(new UserEntity("slaydatPussy", "xxx@xxx.com", "password123"));
			
			//fetch
			log.info("Customers found");
			log.info("****************");
			for(UserEntity userEntity : userRepository.findAll()){
				log.info(userEntity.toString());
			}

			//fetch by username
			log.info("Customer found with findByUsername('kronus'):");
			log.info("************************************");
			userRepository.findUserByUsername("kronus").toString();
		};
	}

}