package com.foodbox.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbox.models.Admin;
import com.foodbox.repo.AdminRepo;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*" , allowedHeaders = "*")
public class AdminController {
	
	
	@Autowired
	private AdminRepo adminRepo;
	
	@SuppressWarnings("rawtypes")
	@PostMapping("/{username}")
	public boolean verifyAdminLogin(@RequestBody  Map loginData , @PathVariable("username") String username , HttpSession session) {
	   String lusername = (String) loginData.get("username");
	   String lpassword = (String) loginData.get("password");
	   Admin admin = adminRepo.findByUsername(lusername);
	   if(admin != null && admin.getUsername().equals(lusername) && admin.getPassword().equals(lpassword)) {
		   session.setAttribute("adminUsername", lusername);
		   return true;
		   
	   }
	   else {
		   return false;
	   }
	}  

}
