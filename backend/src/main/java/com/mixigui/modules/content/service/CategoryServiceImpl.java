package com.mixigui.modules.content.service;

import com.mixigui.modules.content.dto.CategoryRequest;
import com.mixigui.modules.content.dto.CategoryResponse;
import com.mixigui.modules.content.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryResponse> getAll() {
        return null;
    }

    @Override
    public List<CategoryResponse> getByType(String type) {
        return null;
    }

    @Override
    public CategoryResponse create(CategoryRequest request) {
        return null;
    }

    @Override
    public CategoryResponse update(UUID id, CategoryRequest request) {
        return null;
    }

    @Override
    public void delete(UUID id) {
    }
}
