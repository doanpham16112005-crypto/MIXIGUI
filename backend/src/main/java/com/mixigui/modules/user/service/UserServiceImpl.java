package com.mixigui.modules.user.service;

import com.mixigui.common.dto.PagedResponse;
import com.mixigui.modules.user.dto.UserRequest;
import com.mixigui.modules.user.dto.UserResponse;
import com.mixigui.modules.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public PagedResponse<UserResponse> getAll(int page, int size) {
        return null;
    }

    @Override
    public UserResponse getById(UUID id) {
        return null;
    }

    @Override
    public UserResponse update(UUID id, UserRequest request) {
        return null;
    }

    @Override
    public void delete(UUID id) {
    }
}
