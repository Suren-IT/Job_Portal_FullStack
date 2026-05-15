package com.example.Jobportal.Model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobDetails {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private  String jobName;
    private String jobSkills;
    private String jobPackage;
}
