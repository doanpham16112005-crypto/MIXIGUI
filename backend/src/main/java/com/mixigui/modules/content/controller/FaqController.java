package com.mixigui.modules.content.controller;

import com.mixigui.common.dto.ApiResponse;
import com.mixigui.modules.content.dto.FaqResponse;
import com.mixigui.modules.content.service.FaqService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/faqs")
public class FaqController {

    private final FaqService faqService;

    public FaqController(FaqService faqService) {
        this.faqService = faqService;
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<ApiResponse<List<FaqResponse>>> getByCourse(@PathVariable UUID courseId) {
        return ResponseEntity.ok(ApiResponse.success(faqService.getByCourseId(courseId)));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<FaqResponse>>> getByProduct(@PathVariable UUID productId) {
        return ResponseEntity.ok(ApiResponse.success(faqService.getByProductId(productId)));
    }
}
