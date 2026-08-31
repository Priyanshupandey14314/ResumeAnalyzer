package com.resumematcher.resume_matcher.Repo;

import com.resumematcher.resume_matcher.models.Analysis;
import com.resumematcher.resume_matcher.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnalysisRepo extends JpaRepository<Analysis, Integer> {
    List<Analysis> findByUserOrderByCreatedAtDesc(User user);

}
