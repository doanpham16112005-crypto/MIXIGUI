package com.mixigui.modules.content.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.UUID;

public class CategoryRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String type;

    private UUID parentId;
    private String description;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public UUID getParentId() { return parentId; }
    public void setParentId(UUID parentId) { this.parentId = parentId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
