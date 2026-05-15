package com.example.Jobportal.Repositry;

import com.example.Jobportal.Model.JobDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepositry extends JpaRepository<JobDetails,Integer> {
    List<JobDetails> findByJobName(String jobname);
}
