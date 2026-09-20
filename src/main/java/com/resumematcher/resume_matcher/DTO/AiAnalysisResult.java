package com.resumematcher.resume_matcher.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AiAnalysisResult {
    private int matchscore;
    private List<String> missingSkills;
    private List<String> suggestions;
}