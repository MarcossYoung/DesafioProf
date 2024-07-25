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
private Double precio;

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

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Set<AppUser> getOwner() {
        return owner;
    }

    public void setOwner(Set<AppUser> owner) {
        this.owner = owner;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getFoto1() {
        return foto1;
    }

    public void setFoto1(String foto1) {
        this.foto1 = foto1;
    }

    public String getFoto2() {
        return foto2;
    }

    public void setFoto2(String foto2) {
        this.foto2 = foto2;
    }

    public String getFoto3() {
        return foto3;
    }

    public void setFoto3(String foto3) {
        this.foto3 = foto3;
    }

    public String getFoto4() {
        return foto4;
    }

    public void setFoto4(String foto4) {
        this.foto4 = foto4;
    }
}
