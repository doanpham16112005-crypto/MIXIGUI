package com.mixigui.modules.course.controller;

import com.mixigui.common.dto.ApiResponse;
import com.mixigui.modules.course.dto.LessonRequest;
import com.mixigui.modules.course.dto.LessonResponse;
import com.mixigui.modules.course.service.LessonService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<ApiResponse<List<LessonResponse>>> getByCourseId(@PathVariable UUID courseId) {
        return ResponseEntity.ok(ApiResponse.success(lessonService.getByCourseId(courseId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LessonResponse>> create(@Valid @RequestBody LessonRequest request) {
        return ResponseEntity.ok(ApiResponse.success(lessonService.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LessonResponse>> update(
            @PathVariable UUID id,
            @Valid @RequestBody LessonRequest request) {
        return ResponseEntity.ok(ApiResponse.success(lessonService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        lessonService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
