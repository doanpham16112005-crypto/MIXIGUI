package com.mixigui.modules.auth.service;

import com.mixigui.modules.auth.dto.LoginRequest;
import com.mixigui.modules.auth.dto.LoginResponse;
import com.mixigui.modules.auth.dto.RegisterRequest;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Override
    public LoginResponse login(LoginRequest request) {
        return null;
    }

    @Override
    public void register(RegisterRequest request) {
    }

    @Override
    public LoginResponse refreshToken(String refreshToken) {
        return null;
    }
}
