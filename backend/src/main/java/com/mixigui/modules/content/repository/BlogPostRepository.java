package com.mixigui.modules.content.repository;

import com.mixigui.modules.content.entity.BlogPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, UUID> {

    Optional<BlogPost> findBySlug(String slug);

    Page<BlogPost> findByIsPublishedTrue(Pageable pageable);

    boolean existsBySlug(String slug);
}
