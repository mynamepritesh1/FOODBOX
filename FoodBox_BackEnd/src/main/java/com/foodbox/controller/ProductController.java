package com.foodbox.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbox.exception.ResourceNotFoundException;
import com.foodbox.models.Admin;
import com.foodbox.models.Product;
import com.foodbox.repo.AdminRepo;
import com.foodbox.repo.ProductRepo;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*" , allowedHeaders = "*")
public class ProductController {
    
	@Autowired
	private ProductRepo productRepo;
	
	@Autowired
	private AdminRepo adminRepo;
	
	@GetMapping("/admin")
	public List<Product> getAdminProducts(){
		return productRepo.findAll();
		
	}
	
	@GetMapping("/cust")
	public List<Product> getAllProducts(){
		List<Product> productList = productRepo.findIfAvail();
		if(productList.isEmpty()) {
			List<Admin> adminList = adminRepo.findAll();
			if(adminList.isEmpty()) {
				adminRepo.save(new Admin("admin", "password"));
				
			}
			addProdIfEmpty(new Product());
			productList = productRepo.findIfAvail();
				
		}
		return productList;
		
	}

	private void addProdIfEmpty(Product product) {
		int min = 10000;
		int max = 99999;
		int b = (int)(Math.random()*(max -min +1)+ min);
		product.setId(b);
		float temp = (product.getActualPrice()* (product.getDiscount()/100));
		float price = product.getActualPrice() - temp;
		product.setPrice(price);
		productRepo.save(product);
		
		
	}
	
	@PostMapping
	public Product addProduct(@RequestBody Product product) {
		int min = 10000;
		int max = 99999;
		int b = (int)(Math.random()*(max -min +1)+ min);
		product.setId(b);
		float temp = (product.getActualPrice()* (product.getDiscount()/100));
		float price = product.getActualPrice() - temp;
		product.setPrice(price);
		return productRepo.save(product);	
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Product> updateProduct(@RequestBody Product productDetails , @PathVariable("id") long id){
		Product product = productRepo.findById(id).orElseThrow(()-> 
		new ResourceNotFoundException("Employee not Found with " + id));
		product.setName(productDetails.getName());
		product.setType(productDetails.getType());
		product.setDiscount(productDetails.getDiscount());
		product.setCategory(productDetails.getCategory());
		product.setImagepath(productDetails.getImagepath());
		product.setActualPrice(productDetails.getActualPrice());
		product.setPersons(productDetails.getPersons());
		product.setPrice(productDetails.getPrice());
		product.setFavorite(productDetails.getFavorite());
		product.setStars(productDetails.getStars());
		product.setCalories(productDetails.getCalories());
		product.setAvail(productDetails.getAvail());
		float temp = (product.getActualPrice()* (product.getDiscount()/100));
		float price = product.getActualPrice() - temp;
		product.setPrice(price);
		
		Product updatedProduct = productRepo.save(product);
		return ResponseEntity.ok(updatedProduct);
				
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable("id") long id){
		Product product = productRepo.findById(id).orElseThrow(()-> 
		new ResourceNotFoundException("Employee not Found with " + id));
		productRepo.delete(product);
		Map<String, Boolean> map = new HashMap<>();
		map.put("Succesfully Deleted", Boolean.TRUE);
		return ResponseEntity.ok(map);
		
	}
	
	@GetMapping("/{id}")
	 public ResponseEntity<Product> getProductById(@PathVariable("id") long id){
		Product product = productRepo.findById(id).orElseThrow(()-> 
		new ResourceNotFoundException("Employee not Found with " + id));
		return ResponseEntity.ok(product);
			 
	 }
	@GetMapping("/search/{keyword}")
	public List<Product> getSearchProducts(@PathVariable String keyword){
		return productRepo.homeSearch(keyword);
		
	}
	@GetMapping("/indian")
	public List<Product> getIndian(){
		return productRepo.getIndian();
		
	}
	@GetMapping("/chinese")
	public List<Product> getChinese(){
		return productRepo.getChinese();
		
	}
	@GetMapping("/italian")
	public List<Product> getItalian(){
		return productRepo.getItalian();
		
	}
	@GetMapping("/maxican")
	public List<Product> getMaxican(){
		return productRepo.getMaxican();
		
	}
	@GetMapping("/american")
	public List<Product> getAmerican(){
		return productRepo.getAmerican();
		
	}
	
	@GetMapping("/thai")
	public List<Product> getThai(){
		return productRepo.getThai();
		
	}
	@GetMapping("/koerean")
	public List<Product> getKorean(){
		return productRepo.getKorean();
		
	}
	@GetMapping("/japnese")
	public List<Product> getJapnese(){
		return productRepo.getJapnese();
		
	}
	
	
	
}
