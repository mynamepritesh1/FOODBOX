package com.foodbox.controller;

import java.sql.Date;
//import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.foodbox.exception.ResourceNotFoundException;
import com.foodbox.models.Cart;
import com.foodbox.models.Customer;
import com.foodbox.models.Purchase;
import com.foodbox.repo.CartRepo;
import com.foodbox.repo.CustomerRepo;
import com.foodbox.repo.PurchaseRepo;

@RestController
@RequestMapping("/purchase")
@CrossOrigin(origins = "http://localhost:4200" , allowedHeaders = "*")
public class OrderController {
	
	
	@Autowired
	private PurchaseRepo purchaseRepo;
	
	@Autowired
	private CartRepo cartRepo;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@GetMapping("/email/{email}")
	public List<Purchase> CustomerOrders(@PathVariable("email") String email){
		return purchaseRepo.getByEmail(email);
		
	}
	
	@GetMapping
	public List<Purchase> getAllPurchase(){
		return purchaseRepo.findAllByOrderByTransactionidAsc();
		
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deletePurchase(@PathVariable("id") long id){
		Purchase purchase = purchaseRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Order Id not found " + id));
		purchaseRepo.delete(purchase);
		Map<String, Boolean> map = new HashMap<>();
		map.put("Successfully Deleted", Boolean.TRUE);
		return ResponseEntity.ok(map);
			
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/search/{keyword")
	public List<Purchase> searchPurchase(@PathVariable String keyword){
		return purchaseRepo.searchPurchase(keyword);
		
		
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@SuppressWarnings("rawtypes")
	@PostMapping
	public ResponseEntity<Map<String, Boolean>> buyProducts(@RequestBody Map buyProdMap){
		List<Cart> cartList = cartRepo.findAll();
		Purchase purchase = new Purchase();
		String cust_email =(String)buyProdMap.get("email");
		Customer customer = customerRepo.findByEmail(cust_email);
		String transId =(String)buyProdMap.get("transactionId");
		for(Cart cl: cartList) {
			Date date = new Date(new java.util.Date().getTime());
			long min = 100000;long max =999999; long b = (long)(Math.random()*(max-min)+min);
			purchase.setId(b);
			purchase.setDop(date);
			purchase.setCustomer(customer);
			String name = cl.getProduct().getName();
			purchase.setProductname(name);
			purchase.setQuantity(cl.getQuantity());
			purchase.setTotalcost(cl.getPrice());
			purchase.setTransactionid(transId);
			purchaseRepo.save(purchase);
			
		}
		Map<String, Boolean> map = new HashMap<>();
		map.put("Order created", Boolean.TRUE);
		return ResponseEntity.ok(map);
		
		
		
	}
	
	
	
	

}
