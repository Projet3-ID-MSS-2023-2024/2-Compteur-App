package com.compteurapp.backendcompteurapp.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDB {

    @Id
    @Column
    private String id;

    @Column
    private String email;

    @Column
    private String firstname;

    @Column
    private String lastname;

    @Column
    private String username;

    @Column
    private String role;

    @Column
    private String tva;

    @Column
    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
