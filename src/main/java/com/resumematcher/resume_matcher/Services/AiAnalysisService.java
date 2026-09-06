package com.resumematcher.resume_matcher.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumematcher.resume_matcher.DTO.AiAnalysisResult;
import com.resumematcher.resume_matcher.Repo.AnalysisRepo;
import com.resumematcher.resume_matcher.Repo.UserRepo;
import com.resumematcher.resume_matcher.models.Analysis;
import com.resumematcher.resume_matcher.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AiAnalysisService {
    private final PDFExtractionService pdfExtractionService;
    private final AiService aiService;
    private final AnalysisRepo analysisRepo;
    private final UserRepo userRepo;
    private String toJson(List<String> list) {
        try {
            return objectMapper.writeValueAsString(list);
        } catch (Exception e) {
            return "[]";
        }
    }
    private  final ObjectMapper objectMapper = new ObjectMapper();
    public Analysis analyze(String userEmail, MultipartFile resumeFile, String jobDescription) throws IOException {
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String resumeText = pdfExtractionService.extractText(resumeFile);

        AiAnalysisResult result = aiService.analyzeMatch(resumeText, jobDescription);

        Analysis analysis = new Analysis();
        analysis.setUser(user);
        analysis.setRestext(resumeText);
        analysis.setJobDescription(jobDescription);
        analysis.setMatchScore(result.getMatchscore());
        analysis.setMskills(toJson(result.getMissingSkills()));
        analysis.setSuggestions(toJson(result.getSuggestions()));
        return analysisRepo.save(analysis);
    }


}
