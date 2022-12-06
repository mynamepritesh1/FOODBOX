package com.foodbox.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.foodbox.models.Product;


@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
	
	@Query("Select p FROM Product p WHERE p.avail='yes' ORDER BY 'category'")
	List<Product> findIfAvail();
	
	@Query("SELECT p FROM Product p WHERE (p.avail LIKE 'yes') AND (p.name LIKE %?1%"
			+" OR p.type LIKE %?1%"
			+" OR p.price LIKE %?1%"
			+" OR p.category LIKE %?1%)")
	public List<Product> homeSearch(String keyword);
	
	
	@Query("SELECT p FROM Product p WHERE p.category LIKE 'Indian' AND p.avail LIKE 'yes'")
	public List<Product> getIndian();
    
	
	@Query("SELECT p FROM Product p WHERE p.category LIKE 'Chinese' AND p.avail LIKE 'yes'")
	public List<Product> getChinese();
	
	@Query("SELECT p FROM Product p WHERE p.category LIKE 'Italian' AND p.avail LIKE 'yes'")
	public List<Product> getItalian();
	
	@Query("SELECT p FROM Product p WHERE p.category LIKE 'Maxican' AND p.avail LIKE 'yes'")
	public List<Product> getMaxican();
	
	@Query("SELECT p FROM Product p WHERE p.category LIKE 'Thai' AND p.avail LIKE 'yes'")
	public List<Product> getThai();
	
	@Query("SELECT p FROM Product p WHERE p.category LIKE 'American' AND p.avail LIKE 'yes'")
	public List<Product> getAmerican();
	
	@Query("SELECT p FROM Product p WHERE p.category LIKE 'Korean' AND p.avail LIKE 'yes'")
	public List<Product> getKorean();
	
	@Query("SELECT p FROM Product p WHERE p.category LIKE 'Japnese' AND p.avail LIKE 'yes'")
	public List<Product> getJapnese();
}
