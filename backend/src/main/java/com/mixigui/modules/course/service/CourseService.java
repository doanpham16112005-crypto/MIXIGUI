package com.mixigui.modules.course.service;

import com.mixigui.common.dto.PagedResponse;
import com.mixigui.modules.course.dto.CourseRequest;
import com.mixigui.modules.course.dto.CourseResponse;

import java.util.UUID;

public interface CourseService {

    PagedResponse<CourseResponse> getAll(int page, int size);

    CourseResponse getBySlug(String slug);

    CourseResponse create(CourseRequest request);

    CourseResponse update(UUID id, CourseRequest request);

    void delete(UUID id);
}
