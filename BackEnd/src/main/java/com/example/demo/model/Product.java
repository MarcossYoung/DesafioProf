package com.example.demo.model;

import javax.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @SequenceGenerator(name = "prodID",sequenceName = "prodSequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

@Column(name = "titulo")
    private String titulo;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private AppUser owner;
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

    public AppUser getOwner() {
        return owner;
    }

    public void setOwner(AppUser owner) {
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
