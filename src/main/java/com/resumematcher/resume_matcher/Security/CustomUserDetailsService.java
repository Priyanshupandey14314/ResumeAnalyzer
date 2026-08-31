package com.resumematcher.resume_matcher.Security;
import com.resumematcher.resume_matcher.models.User;
import com.resumematcher.resume_matcher.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor // Lombok generates a constructor for final fields - this is how UserRepo gets injected
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Look up our own User entity by email
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("No user found with email: " + email));

        // Wrap it into Spring Security's own UserDetails object
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword()) // must already be a hashed password
                .authorities("USER")           // basic role/permission - we're keeping this simple
                .build();
    }
}
