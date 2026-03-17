package com.mixigui.modules.shop.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import java.util.UUID;

public class OrderRequest {

    @NotEmpty
    private List<OrderItemRequest> items;

    private String paymentMethod;
    private String shippingAddress;
    private String note;

    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public static class OrderItemRequest {
        private UUID productId;
        private UUID courseId;
        private Integer quantity = 1;

        public UUID getProductId() { return productId; }
        public void setProductId(UUID productId) { this.productId = productId; }

        public UUID getCourseId() { return courseId; }
        public void setCourseId(UUID courseId) { this.courseId = courseId; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }
}
