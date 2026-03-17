package com.mixigui.modules.content.service;

import com.mixigui.common.dto.PagedResponse;
import com.mixigui.modules.content.dto.BlogPostRequest;
import com.mixigui.modules.content.dto.BlogPostResponse;
import com.mixigui.modules.content.repository.BlogPostRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class BlogServiceImpl implements BlogService {

    private final BlogPostRepository blogPostRepository;

    public BlogServiceImpl(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    @Override
    public PagedResponse<BlogPostResponse> getAll(int page, int size) {
        return null;
    }

    @Override
    public BlogPostResponse getBySlug(String slug) {
        return null;
    }

    @Override
    public BlogPostResponse create(BlogPostRequest request) {
        return null;
    }

    @Override
    public BlogPostResponse update(UUID id, BlogPostRequest request) {
        return null;
    }

    @Override
    public void delete(UUID id) {
    }
}
