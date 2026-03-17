package com.mixigui.modules.user.dto;

import jakarta.validation.constraints.NotBlank;

public class UserRequest {

    @NotBlank
    private String fullName;

    private String avatarUrl;
    private String bio;
    private String role;

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
