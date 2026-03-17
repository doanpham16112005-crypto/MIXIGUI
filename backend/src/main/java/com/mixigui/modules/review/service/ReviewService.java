package com.mixigui.modules.review.service;

import com.mixigui.modules.review.dto.ReviewRequest;
import com.mixigui.modules.review.dto.ReviewResponse;

import java.util.List;
import java.util.UUID;

public interface ReviewService {

    List<ReviewResponse> getByCourseId(UUID courseId);

    List<ReviewResponse> getByProductId(UUID productId);

    ReviewResponse create(ReviewRequest request);

    void delete(UUID id);
}
