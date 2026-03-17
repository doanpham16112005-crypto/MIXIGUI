package com.mixigui.modules.shop.controller;

import com.mixigui.common.dto.ApiResponse;
import com.mixigui.modules.shop.dto.OrderRequest;
import com.mixigui.modules.shop.dto.OrderResponse;
import com.mixigui.modules.shop.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<OrderResponse>> create(
            @PathVariable UUID userId,
            @Valid @RequestBody OrderRequest request) {
        return ResponseEntity.ok(ApiResponse.success(orderService.create(userId, request)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(orderService.getById(id)));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<OrderResponse>> updateStatus(
            @PathVariable UUID id,
            @RequestParam String status) {
        return ResponseEntity.ok(ApiResponse.success(orderService.updateStatus(id, status)));
    }
}
