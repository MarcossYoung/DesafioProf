package com.example.demo.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.time.LocalDate;

@Entity

    @Table(name = "products")
    public class Product {
    @Id
    @SequenceGenerator(name = "prodID",sequenceName = "prodSequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Enumerated(EnumType.STRING )
    @Column(name="type")
    private ProductType productType;
    @Column(name = "category", nullable = false)
    private Long categoryId;
    @Enumerated(EnumType.STRING)
    private Brand brand;
    @NotNull()
    @Column(name = "titulo")
    private String titulo;

    @NotNull()
    @Column(name = "precio")
    private Double precio;
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private AppUser owner;
    @Column(name = "bio")
    private String bio;
    @Column(name="color")
    private String color;
    @Column(name = "size")
    private long size;
    @Column(name = "sex")
    private String sex;

    @Column(name = "foto1")
    private String foto1;
    @Column(name = "foto2")
    private String foto2;
    @Column(name = "foto3")
    private String foto3;
    @Column(name = "foto4")
    private String foto4;
    @ManyToOne
    @JoinColumn(name = "renterID")
    private AppUser renter;
    @Column(name = "startDate")
    private LocalDate startDate;
    @Column(name = "endDate")
    private LocalDate endDate;






    public long getId() {
        return id;
    }

    public void setId(long id) {
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


        public long getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(long categoryId) {
            this.categoryId = categoryId;
        }

        public Brand getBrand() {
            return brand;
        }

        public void setBrand(Brand brand) {
            this.brand = brand;
        }

        public long getSize() {
            return size;
        }

        public void setSize(long size) {
            this.size = size;
        }

        public String getSex() {
            return sex;
        }

        public void setSex(String sex) {
            this.sex = sex;
        }

        public String getColor() {
            return color;
        }

    public ProductType getRent() {
        return productType;
    }

    public void setRent(ProductType rent) {
        this.productType = rent;
    }

    public void setColor(String color) {
            this.color = color;
        }


    }
