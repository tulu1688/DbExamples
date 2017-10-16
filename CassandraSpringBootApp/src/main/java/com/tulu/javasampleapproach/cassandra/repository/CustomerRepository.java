package com.tulu.javasampleapproach.cassandra.repository;

import com.tulu.javasampleapproach.cassandra.model.Customer;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CustomerRepository extends CrudRepository<Customer, String> {

    @Query(value="SELECT * FROM customer WHERE firstname=?0")
    public List<Customer> findByFirstname(String firstname);

    @Query("SELECT * FROM customer WHERE age > ?0 ALLOW FILTERING")
    public List<Customer> findCustomerHasAgeGreaterThan(int age);
}