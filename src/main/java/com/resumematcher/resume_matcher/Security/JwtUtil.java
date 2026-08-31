package com.resumematcher.resume_matcher.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component // makes this a Spring-managed bean, so it can be injected elsewhere
public class JwtUtil {

    // Pulled from application.properties - the secret used to sign/verify tokens
    @Value("${jwt.secret}")
    private String secret;

    // How long a token stays valid, in milliseconds
    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    // Converts our plain-text secret string into a cryptographic Key object
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Creates a new JWT for a given user's email
    public String generateToken(String email) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .setSubject(email)              // store the email as the token's "subject"
                .setIssuedAt(now)                // when it was created
                .setExpiration(expiry)           // when it becomes invalid
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // sign it
                .compact();                      // build the final string
    }

    // Extracts the email from a token (used later to identify who's making a request)
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Checks if a token is valid: correctly signed AND not expired
    public boolean isTokenValid(String token) {
        try {
            Claims claims = extractAllClaims(token);
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            // if parsing/signature verification throws, the token is invalid/tampered
            return false;
        }
    }

    // Parses the token and returns its claims (payload data) - throws if signature is invalid
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}