package com.mixigui.modules.course.controller;

import com.mixigui.common.dto.ApiResponse;
import com.mixigui.common.dto.PagedResponse;
import com.mixigui.modules.course.dto.CourseRequest;
import com.mixigui.modules.course.dto.CourseResponse;
import com.mixigui.modules.course.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<CourseResponse>>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.success(courseService.getAll(page, size)));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<CourseResponse>> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(courseService.getBySlug(slug)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CourseResponse>> create(@Valid @RequestBody CourseRequest request) {
        return ResponseEntity.ok(ApiResponse.success(courseService.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> update(
            @PathVariable UUID id,
            @Valid @RequestBody CourseRequest request) {
        return ResponseEntity.ok(ApiResponse.success(courseService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        courseService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
