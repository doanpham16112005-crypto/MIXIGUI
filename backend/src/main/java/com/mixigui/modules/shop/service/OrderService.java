package com.mixigui.modules.shop.service;

import com.mixigui.common.dto.PagedResponse;
import com.mixigui.modules.shop.dto.OrderRequest;
import com.mixigui.modules.shop.dto.OrderResponse;

import java.util.UUID;

public interface OrderService {

    OrderResponse create(UUID userId, OrderRequest request);

    OrderResponse getById(UUID id);

    PagedResponse<OrderResponse> getByUserId(UUID userId, int page, int size);

    OrderResponse updateStatus(UUID id, String status);
}
