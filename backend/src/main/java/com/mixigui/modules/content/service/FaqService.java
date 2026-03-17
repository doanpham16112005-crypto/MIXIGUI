package com.mixigui.modules.content.service;

import com.mixigui.modules.content.dto.FaqResponse;

import java.util.List;
import java.util.UUID;

public interface FaqService {

    List<FaqResponse> getByCourseId(UUID courseId);

    List<FaqResponse> getByProductId(UUID productId);
}
