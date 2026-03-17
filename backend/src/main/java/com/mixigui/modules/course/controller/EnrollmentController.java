package com.mixigui.modules.course.controller;

import com.mixigui.common.dto.ApiResponse;
import com.mixigui.modules.course.dto.EnrollmentResponse;
import com.mixigui.modules.course.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/{userId}/courses/{courseId}")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> enroll(
            @PathVariable UUID userId,
            @PathVariable UUID courseId) {
        return ResponseEntity.ok(ApiResponse.success(enrollmentService.enroll(userId, courseId)));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<EnrollmentResponse>>> getByUser(@PathVariable UUID userId) {
        return ResponseEntity.ok(ApiResponse.success(enrollmentService.getByUserId(userId)));
    }
}
