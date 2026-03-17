package com.mixigui.modules.course.service;

import com.mixigui.modules.course.dto.EnrollmentResponse;

import java.util.List;
import java.util.UUID;

public interface EnrollmentService {

    EnrollmentResponse enroll(UUID userId, UUID courseId);

    List<EnrollmentResponse> getByUserId(UUID userId);

    boolean isEnrolled(UUID userId, UUID courseId);
}
