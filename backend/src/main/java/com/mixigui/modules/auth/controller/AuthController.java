package com.mixigui.modules.auth.controller;

import com.mixigui.common.dto.ApiResponse;
import com.mixigui.modules.auth.dto.LoginRequest;
import com.mixigui.modules.auth.dto.LoginResponse;
import com.mixigui.modules.auth.dto.RegisterRequest;
import com.mixigui.modules.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.login(request)));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Dang ky thanh cong", null));
    }
}
