package com.mixigui.modules.content.controller;

import com.mixigui.common.dto.ApiResponse;
import com.mixigui.common.dto.PagedResponse;
import com.mixigui.modules.content.dto.BlogPostRequest;
import com.mixigui.modules.content.dto.BlogPostResponse;
import com.mixigui.modules.content.service.BlogService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<BlogPostResponse>>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.success(blogService.getAll(page, size)));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<BlogPostResponse>> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(blogService.getBySlug(slug)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BlogPostResponse>> create(@Valid @RequestBody BlogPostRequest request) {
        return ResponseEntity.ok(ApiResponse.success(blogService.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogPostResponse>> update(
            @PathVariable UUID id,
            @Valid @RequestBody BlogPostRequest request) {
        return ResponseEntity.ok(ApiResponse.success(blogService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        blogService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
