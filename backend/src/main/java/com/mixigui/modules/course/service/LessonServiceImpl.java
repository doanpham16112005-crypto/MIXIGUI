package com.mixigui.modules.course.service;

import com.mixigui.modules.course.dto.LessonRequest;
import com.mixigui.modules.course.dto.LessonResponse;
import com.mixigui.modules.course.repository.LessonRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;

    public LessonServiceImpl(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    @Override
    public List<LessonResponse> getByCourseId(UUID courseId) {
        return null;
    }

    @Override
    public LessonResponse create(LessonRequest request) {
        return null;
    }

    @Override
    public LessonResponse update(UUID id, LessonRequest request) {
        return null;
    }

    @Override
    public void delete(UUID id) {
    }
}
