package com.example.Jobportal.Service;

import com.example.Jobportal.Model.AppliedJobs;
import com.example.Jobportal.Model.JobDetails;
import com.example.Jobportal.Model.UserDetails;
import com.example.Jobportal.Repositry.AdminRepository;
import com.example.Jobportal.Repositry.AppliedJobRepository;
import com.example.Jobportal.Repositry.JobRepositry;
import com.example.Jobportal.Repositry.UserRepositry;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    UserRepositry userrepo;

    @Autowired
    JobRepositry jobrepo;

    @Autowired
    AppliedJobRepository aprepo;

    @Autowired
    AdminRepository adminrepo;

    public List<JobDetails> getAllJobs() {

        return  jobrepo.findAll();
    }

    public List<JobDetails> getJob(String jobname) {

        return jobrepo.findByJobName(jobname);
    }

    public void addJob(JobDetails job) {

        jobrepo.save(job);
    }

    //User Repo
    public boolean addUser(UserDetails user) {

         userrepo.save(user);
         return true;

    }

    public UserDetails getUserById(int userid) {
       return userrepo.findById(userid).orElse(null);
    }

    public List<UserDetails> getAllUsers() {

        return  userrepo.findAll();
    }


    public boolean updateById(UserDetails user) {
        //check weather match or not
        int id = user.getId();
        UserDetails user1 = userrepo.findById(id).orElse(null);
        if(user1!=null){
            user1.setName(user.getName());
            user1.setEmail(user.getEmail());
            user1.setContact(user.getContact());

            userrepo.save(user1);
            return true;
        }
        else{
            throw new RuntimeException("no user found ");
        }

    }

    public boolean deleteJobById(int id) {
        if (jobrepo.existsById(id)){
            jobrepo.deleteById(id);
            return true;
        }
        else{
             throw  new RuntimeException("jon not found ");

        }




    }

    public boolean getUserByEmailandPassword(String email, String password) {

        if(userrepo.existsByEmailAndPassword(email,password)){
            return true;
        }
        return false;

    }


    public UserDetails getUserByEmail(String email) {

        return  userrepo.findByEmail(email);
    }

    public boolean addAppliedJob(String userEmail) {


        //1.check the data already present or not
        boolean isUser = userrepo.existsByEmail(userEmail);
        if(isUser) {
            UserDetails user = userrepo.findByEmail(userEmail);
            System.out.println(user);
            AppliedJobs ap = new AppliedJobs(user);
            aprepo.save(ap);
            return true;

        }
        else{
            return  false;
        }
        //2.if present simply return true otherwise return false




    }

    public boolean getAdminByIdandPassword(String adminid, String password) {

        if(adminrepo.existsByAdminidAndPassword(adminid,password)){
            return  true;
        }
        return false;
    }
}
