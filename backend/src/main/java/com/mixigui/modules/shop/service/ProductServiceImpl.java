package com.mixigui.modules.shop.service;

import com.mixigui.common.dto.PagedResponse;
import com.mixigui.modules.shop.dto.ProductRequest;
import com.mixigui.modules.shop.dto.ProductResponse;
import com.mixigui.modules.shop.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public PagedResponse<ProductResponse> getAll(int page, int size) {
        return null;
    }

    @Override
    public ProductResponse getBySlug(String slug) {
        return null;
    }

    @Override
    public ProductResponse create(ProductRequest request) {
        return null;
    }

    @Override
    public ProductResponse update(UUID id, ProductRequest request) {
        return null;
    }

    @Override
    public void delete(UUID id) {
    }
}
