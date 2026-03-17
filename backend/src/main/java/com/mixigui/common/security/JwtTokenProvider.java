package com.mixigui.common.security;

import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    public String generateToken(String email) {
        return null;
    }

    public String generateRefreshToken(String email) {
        return null;
    }

    public String getEmailFromToken(String token) {
        return null;
    }

    public boolean validateToken(String token) {
        return false;
    }
}
