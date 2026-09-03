package com.resumematcher.resume_matcher.Services;

import com.resumematcher.resume_matcher.DTO.AuthResponse;
import com.resumematcher.resume_matcher.DTO.LoginRequest;
import com.resumematcher.resume_matcher.DTO.RegisterRequest;
import com.resumematcher.resume_matcher.Repo.UserRepo;
import com.resumematcher.resume_matcher.Security.JwtUtil;
import com.resumematcher.resume_matcher.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    public AuthResponse register(RegisterRequest request) {
        // TODO 1: if userRepo.existsByEmail(...) is true, throw new IllegalArgumentException("Email already registered")
        if(userRepo.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        // TODO 2: create a new User, set name/email from request,
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // TODO 3: save the user via userRepo.save(user)
        userRepo.save(user);

        // TODO 4: generate a token: jwtUtil.generateToken(user.getEmail())
        String token = jwtUtil.generateToken(user.getEmail());
        // TODO 5: return new AuthResponse(token, user.getName(), user.getEmail())
        return new AuthResponse(token, user.getName(), user.getEmail());
    }
    public AuthResponse login(LoginRequest request) {
         authenticationManager.authenticate(
                   new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
         );

        User user = userRepo.findByEmail(request.getEmail())
                 .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getName(), user.getEmail());
    }
}
