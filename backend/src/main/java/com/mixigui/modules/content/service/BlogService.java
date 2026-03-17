package com.mixigui.modules.content.service;

import com.mixigui.common.dto.PagedResponse;
import com.mixigui.modules.content.dto.BlogPostRequest;
import com.mixigui.modules.content.dto.BlogPostResponse;

import java.util.UUID;

public interface BlogService {

    PagedResponse<BlogPostResponse> getAll(int page, int size);

    BlogPostResponse getBySlug(String slug);

    BlogPostResponse create(BlogPostRequest request);

    BlogPostResponse update(UUID id, BlogPostRequest request);

    void delete(UUID id);
}
