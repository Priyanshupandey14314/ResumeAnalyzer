package com.resumematcher.resume_matcher.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="analysis")
public class Analysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private String restext;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String jobDescription;
    private int matchScore;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String mskills; //missing skills in resume
    @Lob
    @Column(columnDefinition = "TEXT")
    private String suggestions;
    private LocalDateTime createdAt = LocalDateTime.now();
}
