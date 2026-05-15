package com.example.Jobportal.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppliedJobs {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserDetails user;


    public AppliedJobs(UserDetails user){
        this.user = user;
    }
}
