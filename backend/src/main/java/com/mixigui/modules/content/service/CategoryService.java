package com.mixigui.modules.content.service;

import com.mixigui.modules.content.dto.CategoryRequest;
import com.mixigui.modules.content.dto.CategoryResponse;

import java.util.List;
import java.util.UUID;

public interface CategoryService {

    List<CategoryResponse> getAll();

    List<CategoryResponse> getByType(String type);

    CategoryResponse create(CategoryRequest request);

    CategoryResponse update(UUID id, CategoryRequest request);

    void delete(UUID id);
}
