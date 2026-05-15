package com.example.Jobportal.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetails {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id;
    private String name;
    private long contact;
    @Column(unique = true)
    private String email;
    private String password;

    @OneToMany(mappedBy = "user")
    private List<AppliedJobs> a;

}
