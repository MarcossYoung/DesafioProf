package com.example.demo.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Shop")
public class Shop {
    @Id
    @SequenceGenerator(name = "shopID",sequenceName = "shopSequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

@Column(name = "titulo")
    private String titulo;

@OneToMany(mappedBy ="shop",fetch = FetchType.LAZY)
private Set<AppUser> owner = new HashSet<>();

@Column(name = "bio")
private String bio;

@Column(name = "precio")
private Integer precio;

@Column(name = "foto1")
private String foto1;

    @Column(name = "foto2")
    private String foto2;

    @Column(name = "foto3")
    private String foto3;

    @Column(name = "foto4")
    private String foto4;



    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }




}
