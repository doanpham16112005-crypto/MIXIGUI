package com.mixigui.modules.content.dto;

import java.util.UUID;

public class CategoryResponse {

    private UUID id;
    private String name;
    private String slug;
    private String type;
    private UUID parentId;
    private String description;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public UUID getParentId() { return parentId; }
    public void setParentId(UUID parentId) { this.parentId = parentId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
