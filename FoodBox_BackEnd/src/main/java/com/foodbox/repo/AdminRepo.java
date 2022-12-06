package com.foodbox.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodbox.models.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin, String> {
	
	Admin findByUsername(String username);

}
