package com.mixigui.modules.review.service;

import com.mixigui.modules.review.dto.ReviewRequest;
import com.mixigui.modules.review.dto.ReviewResponse;
import com.mixigui.modules.review.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<ReviewResponse> getByCourseId(UUID courseId) {
        return null;
    }

    @Override
    public List<ReviewResponse> getByProductId(UUID productId) {
        return null;
    }

    @Override
    public ReviewResponse create(ReviewRequest request) {
        return null;
    }

    @Override
    public void delete(UUID id) {
    }
}
