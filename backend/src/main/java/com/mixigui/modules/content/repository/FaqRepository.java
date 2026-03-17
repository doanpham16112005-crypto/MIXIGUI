package com.mixigui.modules.content.repository;

import com.mixigui.modules.content.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FaqRepository extends JpaRepository<Faq, UUID> {

    List<Faq> findByCourseIdOrderByOrderIndexAsc(UUID courseId);

    List<Faq> findByProductIdOrderByOrderIndexAsc(UUID productId);
}
