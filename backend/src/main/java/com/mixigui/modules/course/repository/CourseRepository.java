package com.mixigui.modules.course.repository;

import com.mixigui.modules.course.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<Course, UUID> {

    Optional<Course> findBySlug(String slug);

    Page<Course> findByIsPublishedTrue(Pageable pageable);

    boolean existsBySlug(String slug);
}
