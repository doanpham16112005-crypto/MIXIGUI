package com.mixigui.modules.user.service;

import com.mixigui.common.dto.PagedResponse;
import com.mixigui.modules.user.dto.UserRequest;
import com.mixigui.modules.user.dto.UserResponse;

import java.util.UUID;

public interface UserService {

    PagedResponse<UserResponse> getAll(int page, int size);

    UserResponse getById(UUID id);

    UserResponse update(UUID id, UserRequest request);

    void delete(UUID id);
}
