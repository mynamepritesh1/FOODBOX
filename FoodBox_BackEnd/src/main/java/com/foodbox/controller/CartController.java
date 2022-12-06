package com.foodbox.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.foodbox.models.Cart;
import com.foodbox.repo.CartRepo;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CartController {

	@Autowired
	private CartRepo cartRepo;

	@PostMapping("/cart")
	public Cart addToCart(@RequestBody Cart cart, HttpSession session) {
		float grandTotal = 0;
		if (session.getAttribute("grandTotal") == null) {
			grandTotal = 0;
		} else {
			grandTotal = (float) session.getAttribute("grandTotal");
		}
		List<Cart> cartList = cartRepo.findAll();
		for (Cart temp : cartList) {
			if (temp.getProduct().getId() == cart.getProduct().getId()) {
				int tempQuantity = 1 + temp.getQuantity();
				grandTotal = grandTotal + temp.getPrice();
				session.setAttribute("grandTotal", grandTotal);
				temp.setQuantity(tempQuantity);
				temp.setPrice((temp.getProduct().getPrice() * tempQuantity));
				return cartRepo.save(temp);
			}
		}
		int min = 100;
		int max = 999;
		int b = (int) (Math.random() * (max - min + 1) + min);
		cart.setId(b);
		cart.setPrice(cart.getProduct().getPrice());
		cart.setQuantity(1);
		grandTotal = grandTotal + cart.getProduct().getPrice();
		session.setAttribute("grandTotal", grandTotal);
		return cartRepo.save(cart);
	}

	@GetMapping("/cart")
	public List<Cart> getCartItems() {
		return cartRepo.findAll();

	}

	@PutMapping("/cart/add/{id}")
	public ResponseEntity<Cart> addByOne(@PathVariable("id") long id, @RequestBody Cart cart) {
		int quantity = cart.getQuantity() +  1;
		cart.setQuantity(quantity);
		cart.setPrice((cart.getProduct().getPrice()) * quantity);
		Cart updateCart = cartRepo.save(cart);
		return ResponseEntity.ok(updateCart);

	}

	@PutMapping("/cart/remove/{id}")
	public ResponseEntity<Cart> removeByOne(@PathVariable("id") long id, @RequestBody Cart cart) {
		int quantity = cart.getQuantity() - 1;
		if (quantity != 0) {
			cart.setQuantity(quantity);
			cart.setPrice((cart.getProduct().getPrice()) * quantity);
			Cart updateCart = cartRepo.save(cart);
			return ResponseEntity.ok(updateCart);
		} else {
			cartRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.OK);

		}

	}

	@DeleteMapping("/cart/{id}")
	public ResponseEntity<?> deleteCart(@PathVariable("id") long id) {
		cartRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);

	}

	@DeleteMapping("/cart")
	public void deleteAll() {
		cartRepo.deleteAll();

	}

}
