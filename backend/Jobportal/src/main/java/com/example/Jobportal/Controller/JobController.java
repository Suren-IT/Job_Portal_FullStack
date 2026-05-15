package com.example.Jobportal.Controller;


import com.example.Jobportal.Model.JobDetails;
import com.example.Jobportal.Model.UserDetails;
import com.example.Jobportal.Service.JobService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5501")
public class JobController {


    @Autowired
    JobService service;

    //login with email and password as user
    @PostMapping("/login")
    public boolean loginByEmailandPassword(@RequestParam("email") String email, @RequestParam("password")String password){
        return service.getUserByEmailandPassword(email,password);


    }

    //login with id and password as admin
    @PostMapping("/adminlogin")
    public boolean loginByIdandPassword(@RequestParam("adminid")String adminid,@RequestParam("password")String password){
        return service.getAdminByIdandPassword(adminid,password);
    }

    //to apply job details
    @PostMapping("appliedjobs/{userEmail}")
    public boolean addAppliedJob(@PathVariable("userEmail") String userEmail){

        return service.addAppliedJob(userEmail);

    }

    //post the job as admin
    @PostMapping("/registerjob")
    public boolean addJob(@RequestBody JobDetails job){
        service.addJob(job);
        return true;
    }


    //when I click home page I will get all jobs
    @GetMapping("/alljobs")
    public List<JobDetails> getAllJobs(){
        return service.getAllJobs();
    }

    //get job by name
    @GetMapping("/searchjob/{jobname}")
    public  List<JobDetails> getJob(@PathVariable("jobname") String jobname){
        return service.getJob(jobname);
    }



   //register in user
    @PostMapping("/register")
    public boolean addUser(@RequestBody UserDetails user){
        return  service.addUser(user);

    }

    //get all users
    @GetMapping("/allusers")
    public List<UserDetails> getAllUser(){
        return service.getAllUsers();
    }

    //get users by id
    @GetMapping("/userid/{userid}")
    public UserDetails getUserById(@PathVariable("userid")int userid){
        return service.getUserById(userid);
    }

    //get user by user email
    @GetMapping("/email/{email}")
    public UserDetails getUserByEmail(@PathVariable("email")String email){
        return service.getUserByEmail(email);

    }

    //user can update their details
    @PutMapping("/update")
    public boolean updateById(@RequestBody UserDetails user){
        return service.updateById(user);

    }

    //admin can delete user if neccessary
    @Transactional
    @DeleteMapping("/delete/{id}")
    public boolean deleteJobById(@PathVariable int id){
        return service.deleteJobById(id);

    }



}
