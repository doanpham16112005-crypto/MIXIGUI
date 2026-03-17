package com.mixigui.modules.shop.service;

import com.mixigui.common.dto.PagedResponse;
import com.mixigui.modules.shop.dto.ProductRequest;
import com.mixigui.modules.shop.dto.ProductResponse;

import java.util.UUID;

public interface ProductService {

    PagedResponse<ProductResponse> getAll(int page, int size);

    ProductResponse getBySlug(String slug);

    ProductResponse create(ProductRequest request);

    ProductResponse update(UUID id, ProductRequest request);

    void delete(UUID id);
}
