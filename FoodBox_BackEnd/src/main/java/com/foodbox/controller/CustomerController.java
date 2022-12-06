package com.foodbox.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbox.models.Customer;
import com.foodbox.repo.CustomerRepo;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "*")
public class CustomerController {
	
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@PostMapping
	public Customer addCustomer(@RequestBody Customer customer , HttpSession session) {
		session.setAttribute("cust_email", customer.getEmail());
		return customerRepo.save(customer);
		
		
	}
	@SuppressWarnings("rawtypes")
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/{email}")
	public boolean verifyLogin(@RequestBody Map loginData, @PathVariable("email")String email,HttpSession session) {
		String lemail = (String) loginData.get("email");
		String lpassword = (String) loginData.get("password");
		Customer customer = customerRepo.findByEmail(email);
		if(customer != null && customer.getEmail().equals(lemail) && customer.getPassword().equals(lpassword)) {
			session.setAttribute("cust_email", lemail);
			return true;
		}
		else {
			return false;
		}
		
		
		
	}
	@GetMapping
	public List<Customer> getAllCustomer(){
		return customerRepo.findAll();
		
	}
	
	@GetMapping("/search/{keyword}")
	public List<Customer> searchCustomer(@PathVariable String keyword){
		return customerRepo.SearchCustomer(keyword);
		
	}
	
	@GetMapping("/{cust_email}")
	public Customer getCustomer(@PathVariable("cust_email") String cust_email) {
		return customerRepo.findByEmail(cust_email);
		
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/{email}")
	public ResponseEntity<Map<String, Boolean>> deleteCustomer(@PathVariable("email")String email){
		Customer customer = customerRepo.findByEmail(email);
		customerRepo.delete(customer);
		Map<String, Boolean> map = new HashMap<>();
		map.put("customer succesfully deleted",Boolean.TRUE);
		return ResponseEntity.ok(map);
		
	}
	
	
	

}
