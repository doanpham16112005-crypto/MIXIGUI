package com.mixigui.modules.auth.service;

import com.mixigui.modules.auth.dto.LoginRequest;
import com.mixigui.modules.auth.dto.LoginResponse;
import com.mixigui.modules.auth.dto.RegisterRequest;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    void register(RegisterRequest request);

    LoginResponse refreshToken(String refreshToken);
}
