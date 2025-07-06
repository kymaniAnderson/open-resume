import { Box, Typography, Chip, Link } from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Language,
  LinkedIn,
  GitHub,
  OpenInNew,
} from "@mui/icons-material";
import type { ResumeData } from "../types/resume";
import type { CustomTheme } from "../types/theme";

interface ResumePreviewProps {
  resumeData: ResumeData;
  customTheme: CustomTheme;
}

export function ResumePreview({ resumeData, customTheme }: ResumePreviewProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const renderSection = (sectionKey: string) => {
    switch (sectionKey) {
      case "summary":
        return (
          resumeData.summary && (
            <Box key="summary" sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: customTheme.headingFont,
                  color: customTheme.primaryColor,
                  mb: 2,
                  pb: 0.5,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                Professional Summary
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: customTheme.bodyFont,
                  lineHeight: 1.6,
                  color: "text.primary",
                }}
              >
                {resumeData.summary}
              </Typography>
            </Box>
          )
        );

      case "workExperience":
        return (
          resumeData.workExperience.length > 0 && (
            <Box key="workExperience" sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: customTheme.headingFont,
                  color: customTheme.primaryColor,
                  mb: 2,
                  pb: 0.5,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                Work Experience
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {resumeData.workExperience.map((exp) => (
                  <Box key={exp.id}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontFamily: customTheme.bodyFont,
                            fontWeight: 600,
                            color: "text.primary",
                          }}
                        >
                          {exp.position}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: customTheme.bodyFont,
                            color: customTheme.accentColor,
                          }}
                        >
                          {exp.company}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(exp.startDate)} -{" "}
                          {exp.current ? "Present" : formatDate(exp.endDate)}
                        </Typography>
                        {exp.location && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            {exp.location}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    {exp.techStack && exp.techStack.length > 0 && (
                      <Box
                        sx={{
                          mb: 1,
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                        }}
                      >
                        {exp.techStack.map((tech, index) => (
                          <Chip
                            key={index}
                            label={tech}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    )}

                    <Box
                      component="ul"
                      sx={{ pl: 2, m: 0, "& li": { mb: 0.5 } }}
                    >
                      {exp.responsibilities
                        .filter((resp) => resp.trim())
                        .map((resp, index) => (
                          <Typography
                            key={index}
                            component="li"
                            variant="body2"
                            sx={{
                              fontFamily: customTheme.bodyFont,
                              color: "text.primary",
                              fontSize: "0.875rem",
                            }}
                          >
                            {resp}
                          </Typography>
                        ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )
        );

      case "education":
        return (
          resumeData.education.length > 0 && (
            <Box key="education" sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: customTheme.headingFont,
                  color: customTheme.primaryColor,
                  mb: 2,
                  pb: 0.5,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                Education
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {resumeData.education.map((edu) => (
                  <Box key={edu.id}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontFamily: customTheme.bodyFont,
                            fontWeight: 600,
                            color: "text.primary",
                          }}
                        >
                          {edu.degree} in {edu.field}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: customTheme.bodyFont,
                            color: customTheme.accentColor,
                          }}
                        >
                          {edu.institution}
                        </Typography>
                        {edu.gpa && (
                          <Typography variant="caption" color="text.secondary">
                            GPA: {edu.gpa}
                          </Typography>
                        )}
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(edu.startDate)} -{" "}
                          {formatDate(edu.endDate)}
                        </Typography>
                        {edu.location && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            {edu.location}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    {edu.honors && edu.honors.length > 0 && (
                      <Typography
                        variant="body2"
                        sx={{ mb: 0.5, fontSize: "0.875rem" }}
                      >
                        <strong>Honors:</strong> {edu.honors.join(", ")}
                      </Typography>
                    )}

                    {edu.activities && edu.activities.length > 0 && (
                      <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                        <strong>Activities:</strong> {edu.activities.join(", ")}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )
        );

      case "projects":
        return (
          resumeData.projects.length > 0 && (
            <Box key="projects" sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: customTheme.headingFont,
                  color: customTheme.primaryColor,
                  mb: 2,
                  pb: 0.5,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                Projects
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {resumeData.projects.map((project) => (
                  <Box key={project.id}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontFamily: customTheme.bodyFont,
                          fontWeight: 600,
                          color: "text.primary",
                        }}
                      >
                        {project.name}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener"
                          >
                            <OpenInNew fontSize="small" />
                          </Link>
                        )}
                        {project.github && (
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener"
                          >
                            <GitHub fontSize="small" />
                          </Link>
                        )}
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: customTheme.bodyFont,
                        color: "text.primary",
                        mb: 1,
                        fontSize: "0.875rem",
                      }}
                    >
                      {project.description}
                    </Typography>

                    {project.techStack.length > 0 && (
                      <Box
                        sx={{
                          mb: 1,
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                        }}
                      >
                        {project.techStack.map((tech, index) => (
                          <Chip
                            key={index}
                            label={tech}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    )}

                    <Box
                      component="ul"
                      sx={{ pl: 2, m: 0, "& li": { mb: 0.5 } }}
                    >
                      {project.highlights
                        .filter((highlight) => highlight.trim())
                        .map((highlight, index) => (
                          <Typography
                            key={index}
                            component="li"
                            variant="body2"
                            sx={{
                              fontFamily: customTheme.bodyFont,
                              color: "text.primary",
                              fontSize: "0.875rem",
                            }}
                          >
                            {highlight}
                          </Typography>
                        ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )
        );

      case "skills":
        return (
          (resumeData.skills.languages.length > 0 ||
            resumeData.skills.frameworks.length > 0 ||
            resumeData.skills.tools.length > 0 ||
            resumeData.skills.databases.length > 0) && (
            <Box key="skills" sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: customTheme.headingFont,
                  color: customTheme.primaryColor,
                  mb: 2,
                  pb: 0.5,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                Technical Skills
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {resumeData.skills.languages.length > 0 && (
                  <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                    <strong>Languages:</strong>{" "}
                    {resumeData.skills.languages.join(", ")}
                  </Typography>
                )}
                {resumeData.skills.frameworks.length > 0 && (
                  <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                    <strong>Frameworks & Libraries:</strong>{" "}
                    {resumeData.skills.frameworks.join(", ")}
                  </Typography>
                )}
                {resumeData.skills.tools.length > 0 && (
                  <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                    <strong>Tools & Technologies:</strong>{" "}
                    {resumeData.skills.tools.join(", ")}
                  </Typography>
                )}
                {resumeData.skills.databases.length > 0 && (
                  <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                    <strong>Databases:</strong>{" "}
                    {resumeData.skills.databases.join(", ")}
                  </Typography>
                )}
              </Box>
            </Box>
          )
        );

      case "interests":
        return (
          resumeData.interests.length > 0 && (
            <Box key="interests" sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: customTheme.headingFont,
                  color: customTheme.primaryColor,
                  mb: 2,
                  pb: 0.5,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                Interests & Hobbies
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: customTheme.bodyFont,
                  color: "text.primary",
                  fontSize: "0.875rem",
                }}
              >
                {resumeData.interests.join(", ")}
              </Typography>
            </Box>
          )
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: "800px",
        minHeight: "1056px",
        p: 4,
        bgcolor: "background.paper",
        fontFamily: customTheme.bodyFont,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: customTheme.headingFont,
            fontWeight: 700,
            color: customTheme.primaryColor,
            mb: 2,
          }}
        >
          {resumeData.personalInfo.fullName || "Your Name"}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 1 }}>
          {resumeData.personalInfo.email && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Email fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {resumeData.personalInfo.email}
              </Typography>
            </Box>
          )}
          {resumeData.personalInfo.phone && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Phone fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {resumeData.personalInfo.phone}
              </Typography>
            </Box>
          )}
          {resumeData.personalInfo.location && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {resumeData.personalInfo.location}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {resumeData.personalInfo.website && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Language fontSize="small" color="action" />
              <Link
                href={resumeData.personalInfo.website}
                target="_blank"
                rel="noopener"
                variant="body2"
                sx={{ color: customTheme.accentColor }}
              >
                {resumeData.personalInfo.website}
              </Link>
            </Box>
          )}
          {resumeData.personalInfo.linkedin && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LinkedIn fontSize="small" color="action" />
              <Link
                href={resumeData.personalInfo.linkedin}
                target="_blank"
                rel="noopener"
                variant="body2"
                sx={{ color: customTheme.accentColor }}
              >
                LinkedIn
              </Link>
            </Box>
          )}
          {resumeData.personalInfo.github && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <GitHub fontSize="small" color="action" />
              <Link
                href={resumeData.personalInfo.github}
                target="_blank"
                rel="noopener"
                variant="body2"
                sx={{ color: customTheme.accentColor }}
              >
                GitHub
              </Link>
            </Box>
          )}
        </Box>
      </Box>

      {/* Dynamic Sections */}
      <Box>
        {resumeData.sectionOrder.map((sectionKey) => renderSection(sectionKey))}
      </Box>
    </Box>
  );
}
