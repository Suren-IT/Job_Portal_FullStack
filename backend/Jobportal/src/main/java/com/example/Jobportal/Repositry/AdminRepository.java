package com.example.Jobportal.Repositry;

import com.example.Jobportal.Model.Admin_Details;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin_Details , Integer> {
    boolean existsByAdminidAndPassword(String adminid, String password);
}
