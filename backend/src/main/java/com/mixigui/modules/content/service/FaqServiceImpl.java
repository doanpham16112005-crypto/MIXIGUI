package com.mixigui.modules.content.service;

import com.mixigui.modules.content.dto.FaqResponse;
import com.mixigui.modules.content.repository.FaqRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class FaqServiceImpl implements FaqService {

    private final FaqRepository faqRepository;

    public FaqServiceImpl(FaqRepository faqRepository) {
        this.faqRepository = faqRepository;
    }

    @Override
    public List<FaqResponse> getByCourseId(UUID courseId) {
        return null;
    }

    @Override
    public List<FaqResponse> getByProductId(UUID productId) {
        return null;
    }
}
