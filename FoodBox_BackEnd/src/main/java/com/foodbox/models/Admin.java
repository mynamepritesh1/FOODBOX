package com.foodbox.models;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor 
public class Admin {
	
	
	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
	private String username;
	private String password;

}
