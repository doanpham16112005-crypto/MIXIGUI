package com.mixigui.modules.shop.service;

import com.mixigui.common.dto.PagedResponse;
import com.mixigui.modules.shop.dto.OrderRequest;
import com.mixigui.modules.shop.dto.OrderResponse;
import com.mixigui.modules.shop.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public OrderResponse create(UUID userId, OrderRequest request) {
        return null;
    }

    @Override
    public OrderResponse getById(UUID id) {
        return null;
    }

    @Override
    public PagedResponse<OrderResponse> getByUserId(UUID userId, int page, int size) {
        return null;
    }

    @Override
    public OrderResponse updateStatus(UUID id, String status) {
        return null;
    }
}
