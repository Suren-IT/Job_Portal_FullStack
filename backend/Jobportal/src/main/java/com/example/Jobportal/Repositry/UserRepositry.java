package com.example.Jobportal.Repositry;

import com.example.Jobportal.Model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepositry extends JpaRepository<UserDetails,Integer> {


//    void existsByEmailandPassword(String email, String password);

    boolean existsByEmailAndPassword(String email, String password);


    UserDetails findByEmail(String email);

    boolean existsByEmail(String userEmail);


}
