package com.mixigui.modules.review.controller;

import com.mixigui.common.dto.ApiResponse;
import com.mixigui.modules.review.dto.ReviewRequest;
import com.mixigui.modules.review.dto.ReviewResponse;
import com.mixigui.modules.review.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getByCourse(@PathVariable UUID courseId) {
        return ResponseEntity.ok(ApiResponse.success(reviewService.getByCourseId(courseId)));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getByProduct(@PathVariable UUID productId) {
        return ResponseEntity.ok(ApiResponse.success(reviewService.getByProductId(productId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ReviewResponse>> create(@Valid @RequestBody ReviewRequest request) {
        return ResponseEntity.ok(ApiResponse.success(reviewService.create(request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        reviewService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
