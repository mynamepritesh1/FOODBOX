package com.foodbox.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodbox.models.Cart;


@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {
	

}
