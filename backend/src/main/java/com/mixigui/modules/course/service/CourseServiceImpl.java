package com.mixigui.modules.course.service;

import com.mixigui.common.dto.PagedResponse;
import com.mixigui.modules.course.dto.CourseRequest;
import com.mixigui.modules.course.dto.CourseResponse;
import com.mixigui.modules.course.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public PagedResponse<CourseResponse> getAll(int page, int size) {
        return null;
    }

    @Override
    public CourseResponse getBySlug(String slug) {
        return null;
    }

    @Override
    public CourseResponse create(CourseRequest request) {
        return null;
    }

    @Override
    public CourseResponse update(UUID id, CourseRequest request) {
        return null;
    }

    @Override
    public void delete(UUID id) {
    }
}
