package com.example.demo.model;


import javax.persistence.*;

@Entity
@Table(name = "productsCategory")
public class ProductCategory {

    @Id
    @SequenceGenerator(name = "catID",sequenceName = "categorySequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "category")
    private String category;

    public ProductCategory(){

    }

    public ProductCategory(String category) {
        this.category = category;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
