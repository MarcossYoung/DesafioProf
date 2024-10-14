package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class ProductService {

private final ProductRepo productRepo;


@Autowired
public ProductService(ProductRepo ProductRepo1){
    this.productRepo = ProductRepo1;
}

    private final String UPLOAD_DIR = "uploads/";

    public Product guardar(Product p) {
    return productRepo.save(p);
}

    public List<Product> listarTodos() {
    return productRepo.findAll();}

    public Product buscar(long id) throws RuntimeException {
     return productRepo.findByProductId(id);
    }

    public void editar(Long id, Product product) {
        Product exsistingProduct = productRepo.findById(id).orElse(null);
        if (exsistingProduct != null) {
           exsistingProduct.setTitulo(product.getTitulo());
            exsistingProduct.setBio(product.getBio());
            exsistingProduct.setPrecio(product.getPrecio());
            productRepo.save(product);
        }
    }



    public void borrar(Long id) {productRepo.delete(productRepo.findByProductId(id));}

    public String saveFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), Paths.get(UPLOAD_DIR + fileName), StandardCopyOption.REPLACE_EXISTING);
        return UPLOAD_DIR + fileName;
    }

}


