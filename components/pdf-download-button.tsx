"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import type { ResumeData } from "../types/resume";

interface PDFDownloadButtonProps {
  resumeData: ResumeData;
}

export function PDFDownloadButton({ resumeData }: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        throw new Error("Popup blocked");
      }

      const renderSection = (sectionKey: string) => {
        switch (sectionKey) {
          case "summary":
            return resumeData.summary
              ? `
              <section style="margin-bottom: 24px;">
                <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; padding-bottom: 4px; border-bottom: 1px solid #d1d5db;">
                  Professional Summary
                </h2>
                <p style="color: #374151; line-height: 1.6;">${resumeData.summary}</p>
              </section>
            `
              : "";

          case "workExperience":
            return resumeData.workExperience.length > 0
              ? `
              <section style="margin-bottom: 24px;">
                <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; padding-bottom: 4px; border-bottom: 1px solid #d1d5db;">
                  Work Experience
                </h2>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  ${resumeData.workExperience
                    .map(
                      (exp) => `
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                        <div>
                          <h3 style="font-weight: 600; color: #111827; margin: 0;">${
                            exp.position
                          }</h3>
                          <p style="color: #374151; margin: 0;">${
                            exp.company
                          }</p>
                        </div>
                        <div style="text-align: right; font-size: 14px; color: #6b7280;">
                          <p style="margin: 0;">${formatDate(
                            exp.startDate
                          )} - ${
                        exp.current ? "Present" : formatDate(exp.endDate)
                      }</p>
                          ${
                            exp.location
                              ? `<p style="margin: 0;">${exp.location}</p>`
                              : ""
                          }
                        </div>
                      </div>
                      
                      ${
                        exp.techStack && exp.techStack.length > 0
                          ? `
                        <div style="margin-bottom: 8px;">
                          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                            ${exp.techStack
                              .map(
                                (tech) =>
                                  `<span style="background: #f3f4f6; border: 1px solid #d1d5db; padding: 2px 6px; border-radius: 4px; font-size: 12px;">${tech}</span>`
                              )
                              .join("")}
                          </div>
                        </div>
                      `
                          : ""
                      }
                      
                      <ul style="list-style-type: disc; padding-left: 20px; margin: 0; color: #374151; font-size: 14px; line-height: 1.5;">
                        ${exp.responsibilities
                          .filter((resp) => resp.trim())
                          .map(
                            (resp) =>
                              `<li style="margin-bottom: 4px;">${resp}</li>`
                          )
                          .join("")}
                      </ul>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </section>
            `
              : "";

          case "education":
            return resumeData.education.length > 0
              ? `
              <section style="margin-bottom: 24px;">
                <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; padding-bottom: 4px; border-bottom: 1px solid #d1d5db;">
                  Education
                </h2>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  ${resumeData.education
                    .map(
                      (edu) => `
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                        <div>
                          <h3 style="font-weight: 600; color: #111827; margin: 0;">${
                            edu.degree
                          } in ${edu.field}</h3>
                          <p style="color: #374151; margin: 0;">${
                            edu.institution
                          }</p>
                          ${
                            edu.gpa
                              ? `<p style="font-size: 14px; color: #6b7280; margin: 0;">GPA: ${edu.gpa}</p>`
                              : ""
                          }
                        </div>
                        <div style="text-align: right; font-size: 14px; color: #6b7280;">
                          <p style="margin: 0;">${formatDate(
                            edu.startDate
                          )} - ${formatDate(edu.endDate)}</p>
                          ${
                            edu.location
                              ? `<p style="margin: 0;">${edu.location}</p>`
                              : ""
                          }
                        </div>
                      </div>
                      
                      ${
                        edu.honors && edu.honors.length > 0
                          ? `
                        <div style="margin-bottom: 4px;">
                          <p style="font-size: 14px; color: #374151; margin: 0;">
                            <span style="font-weight: 500;">Honors:</span> ${edu.honors.join(
                              ", "
                            )}
                          </p>
                        </div>
                      `
                          : ""
                      }
                      
                      ${
                        edu.activities && edu.activities.length > 0
                          ? `
                        <div>
                          <p style="font-size: 14px; color: #374151; margin: 0;">
                            <span style="font-weight: 500;">Activities:</span> ${edu.activities.join(
                              ", "
                            )}
                          </p>
                        </div>
                      `
                          : ""
                      }
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </section>
            `
              : "";

          case "projects":
            return resumeData.projects.length > 0
              ? `
              <section style="margin-bottom: 24px;">
                <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; padding-bottom: 4px; border-bottom: 1px solid #d1d5db;">
                  Projects
                </h2>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  ${resumeData.projects
                    .map(
                      (project) => `
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                        <h3 style="font-weight: 600; color: #111827; margin: 0;">${
                          project.name
                        }</h3>
                        <div style="display: flex; gap: 8px;">
                          ${
                            project.link
                              ? `<a href="${project.link}" style="color: #2563eb;">🔗</a>`
                              : ""
                          }
                          ${
                            project.github
                              ? `<a href="${project.github}" style="color: #6b7280;">📁</a>`
                              : ""
                          }
                        </div>
                      </div>
                      
                      <p style="color: #374151; font-size: 14px; margin-bottom: 8px;">${
                        project.description
                      }</p>
                      
                      ${
                        project.techStack.length > 0
                          ? `
                        <div style="margin-bottom: 8px;">
                          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                            ${project.techStack
                              .map(
                                (tech) =>
                                  `<span style="background: #f3f4f6; border: 1px solid #d1d5db; padding: 2px 6px; border-radius: 4px; font-size: 12px;">${tech}</span>`
                              )
                              .join("")}
                          </div>
                        </div>
                      `
                          : ""
                      }
                      
                      <ul style="list-style-type: disc; padding-left: 20px; margin: 0; color: #374151; font-size: 14px; line-height: 1.5;">
                        ${project.highlights
                          .filter((highlight) => highlight.trim())
                          .map(
                            (highlight) =>
                              `<li style="margin-bottom: 4px;">${highlight}</li>`
                          )
                          .join("")}
                      </ul>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </section>
            `
              : "";

          case "skills":
            return resumeData.skills.languages.length > 0 ||
              resumeData.skills.frameworks.length > 0 ||
              resumeData.skills.tools.length > 0 ||
              resumeData.skills.databases.length > 0
              ? `
              <section style="margin-bottom: 24px;">
                <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; padding-bottom: 4px; border-bottom: 1px solid #d1d5db;">
                  Technical Skills
                </h2>
                <div style="display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
                  ${
                    resumeData.skills.languages.length > 0
                      ? `
                    <div>
                      <span style="font-weight: 500; color: #111827;">Languages:</span>
                      <span style="color: #374151;"> ${resumeData.skills.languages.join(
                        ", "
                      )}</span>
                    </div>
                  `
                      : ""
                  }
                  ${
                    resumeData.skills.frameworks.length > 0
                      ? `
                    <div>
                      <span style="font-weight: 500; color: #111827;">Frameworks & Libraries:</span>
                      <span style="color: #374151;"> ${resumeData.skills.frameworks.join(
                        ", "
                      )}</span>
                    </div>
                  `
                      : ""
                  }
                  ${
                    resumeData.skills.tools.length > 0
                      ? `
                    <div>
                      <span style="font-weight: 500; color: #111827;">Tools & Technologies:</span>
                      <span style="color: #374151;"> ${resumeData.skills.tools.join(
                        ", "
                      )}</span>
                    </div>
                  `
                      : ""
                  }
                  ${
                    resumeData.skills.databases.length > 0
                      ? `
                    <div>
                      <span style="font-weight: 500; color: #111827;">Databases:</span>
                      <span style="color: #374151;"> ${resumeData.skills.databases.join(
                        ", "
                      )}</span>
                    </div>
                  `
                      : ""
                  }
                </div>
              </section>
            `
              : "";

          case "interests":
            return resumeData.interests.length > 0
              ? `
              <section style="margin-bottom: 24px;">
                <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; padding-bottom: 4px; border-bottom: 1px solid #d1d5db;">
                  Interests & Hobbies
                </h2>
                <p style="color: #374151; font-size: 14px;">${resumeData.interests.join(
                  ", "
                )}</p>
              </section>
            `
              : "";

          default:
            return "";
        }
      };

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${resumeData.personalInfo.fullName || "Resume"}</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4;
              margin: 0.75in;
              /* Remove default header/footer in print (works in some browsers) */
              @top-center { content: none; }
              @bottom-center { content: none; }
            }
            
            * {
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', sans-serif;
              font-size: 14px;
              line-height: 1.5;
              color: #111827;
              margin: 0;
              padding: 0;
              background: white;
            }
            
            .resume-container {
              max-width: 8.5in;
              margin: 0 auto;
              background: white;
              padding: 0;
            }
            
            h1 {
              font-family: 'Playfair Display', serif;
              font-size: 32px;
              font-weight: 700;
              color: #111827;
              margin: 0 0 16px 0;
            }
            
            section {
              margin-bottom: 16px !important;
            }
            
            .contact-info {
              display: flex;
              flex-wrap: wrap;
              gap: 16px;
              font-size: 14px;
              color: #6b7280;
              margin-bottom: 8px;
            }
            
            .contact-item {
              display: flex;
              align-items: center;
              gap: 4px;
            }
            
            a {
              color: #2563eb;
              text-decoration: none;
            }
            
            a:hover {
              color: #1d4ed8;
            }
            
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .no-print {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="resume-container">
            <header style="margin-bottom: 32px;">
              <h1>${resumeData.personalInfo.fullName || "Your Name"}</h1>
              
              <div class="contact-info">
                ${
                  resumeData.personalInfo.email
                    ? `<div class="contact-item">📧 ${resumeData.personalInfo.email}</div>`
                    : ""
                }
                ${
                  resumeData.personalInfo.phone
                    ? `<div class="contact-item">📞 ${resumeData.personalInfo.phone}</div>`
                    : ""
                }
                ${
                  resumeData.personalInfo.location
                    ? `<div class="contact-item">📍 ${resumeData.personalInfo.location}</div>`
                    : ""
                }
              </div>
              
              <div class="contact-info">
                ${
                  resumeData.personalInfo.website
                    ? `<div class="contact-item">🌐 <a href="${resumeData.personalInfo.website}">${resumeData.personalInfo.website}</a></div>`
                    : ""
                }
                ${
                  resumeData.personalInfo.linkedin
                    ? `<div class="contact-item">💼 <a href="${resumeData.personalInfo.linkedin}">LinkedIn</a></div>`
                    : ""
                }
                ${
                  resumeData.personalInfo.github
                    ? `<div class="contact-item">📁 <a href="${resumeData.personalInfo.github}">GitHub</a></div>`
                    : ""
                }
              </div>
            </header>

            <main>
              ${resumeData.sectionOrder
                .map((sectionKey) => renderSection(sectionKey))
                .join("")}
            </main>
          </div>
        </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();

      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      };
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="contained"
      startIcon={<Download />}
      onClick={generatePDF}
      disabled={isGenerating}
    >
      {isGenerating ? "Generating..." : "Download PDF"}
    </Button>
  );
}
