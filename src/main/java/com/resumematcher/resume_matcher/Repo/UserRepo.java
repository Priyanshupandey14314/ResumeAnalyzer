package com.resumematcher.resume_matcher.Repo;

import com.resumematcher.resume_matcher.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {
         Optional<User> findByEmail(String email);
         boolean existsByEmail(String email);
}
