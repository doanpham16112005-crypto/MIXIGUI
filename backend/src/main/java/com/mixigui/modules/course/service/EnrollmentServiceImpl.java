package com.mixigui.modules.course.service;

import com.mixigui.modules.course.dto.EnrollmentResponse;
import com.mixigui.modules.course.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    public EnrollmentServiceImpl(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    @Override
    public EnrollmentResponse enroll(UUID userId, UUID courseId) {
        return null;
    }

    @Override
    public List<EnrollmentResponse> getByUserId(UUID userId) {
        return null;
    }

    @Override
    public boolean isEnrolled(UUID userId, UUID courseId) {
        return enrollmentRepository.existsByUserIdAndCourseId(userId, courseId);
    }
}
