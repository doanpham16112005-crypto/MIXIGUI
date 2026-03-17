package com.mixigui.modules.course.service;

import com.mixigui.modules.course.dto.LessonRequest;
import com.mixigui.modules.course.dto.LessonResponse;

import java.util.List;
import java.util.UUID;

public interface LessonService {

    List<LessonResponse> getByCourseId(UUID courseId);

    LessonResponse create(LessonRequest request);

    LessonResponse update(UUID id, LessonRequest request);

    void delete(UUID id);
}
