package com.resumematcher.resume_matcher.Controller;

import com.resumematcher.resume_matcher.Services.AiAnalysisService;
import com.resumematcher.resume_matcher.Services.AiService;
import com.resumematcher.resume_matcher.models.Analysis;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/analysis")
@RequiredArgsConstructor
public class AnalysisController {

    private final AiAnalysisService analysisService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Analysis> analyze(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam("resume") MultipartFile resumeFile,
            @RequestParam("jobDescription") String jobDescription) throws IOException {

        Analysis result = analysisService.analyze(userDetails.getUsername(), resumeFile, jobDescription);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/history")
    public ResponseEntity<List<Analysis>> history(@AuthenticationPrincipal UserDetails userDetails) {
        List<Analysis> history = analysisService.getHistory(userDetails.getUsername());
        return ResponseEntity.ok(history);
    }
}