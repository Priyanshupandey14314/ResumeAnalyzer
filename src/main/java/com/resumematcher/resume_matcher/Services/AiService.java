package com.resumematcher.resume_matcher.Services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumematcher.resume_matcher.DTO.AiAnalysisResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AiService {

    @Value("${ai.api.url}")
    private String apiUrl;

    @Value("${ai.api.key}")
    private String apiKey;

    @Value("${ai.api.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String getAiResponse(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> message = Map.of("role", "user", "content", prompt);
        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(message),
                "temperature", 0.3
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        Map<?, ?> response = restTemplate.postForObject(apiUrl, request, Map.class);

        List<?> choices = (List<?>) response.get("choices");
        Map<?, ?> firstChoice = (Map<?, ?>) choices.get(0);
        Map<?, ?> messageObj = (Map<?, ?>) firstChoice.get("message");
        return (String) messageObj.get("content");
    }

    public AiAnalysisResult analyzeMatch(String resumeText, String jobDescription) {
        String prompt = """
                Compare this RESUME to this JOB DESCRIPTION.
                Respond with ONLY a JSON object, no other text, shaped exactly like:
                { "matchScore": <0-100 integer>, "missingSkills": ["a","b"], "suggestions": ["a","b","c"] }

                RESUME:
                %s

                JOB DESCRIPTION:
                %s
                """.formatted(resumeText, jobDescription);

        String rawResponse = getAiResponse(prompt);

        try {
            JsonNode node = objectMapper.readTree(rawResponse);

            int matchScore = node.get("matchScore").asInt();

            List<String> missingSkills = new ArrayList<>();
            node.get("missingSkills").forEach(n -> missingSkills.add(n.asText()));

            List<String> suggestions = new ArrayList<>();
            node.get("suggestions").forEach(n -> suggestions.add(n.asText()));

            return new AiAnalysisResult(matchScore, missingSkills, suggestions);

        } catch (Exception e) {
            // If the AI didn't return valid JSON, fail gracefully instead of crashing the request
            return new AiAnalysisResult(0, List.of("Could not parse AI response"), List.of());
        }
    }
}