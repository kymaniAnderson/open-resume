"use client";

import type React from "react";
import { useState } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import { PersonalInfoForm } from "./forms/personal-info-form";
import { SummaryForm } from "./forms/summary-form";
import { WorkExperienceForm } from "./forms/work-experience-form";
import { EducationForm } from "./forms/education-form";
import { ProjectsForm } from "./forms/projects-form";
import { SkillsForm } from "./forms/skills-form";
import { InterestsForm } from "./forms/interests-form";
import { SectionOrderForm } from "./forms/section-order-form";
import { ThemeCustomizer } from "./theme-customizer";
import type { ResumeData } from "../types/resume";
import type { CustomTheme } from "../types/theme";
import {
  Person,
  Description,
  Work,
  School,
  Code,
  Build,
  Favorite,
  Settings,
  Palette,
} from "@mui/icons-material";

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  customTheme: CustomTheme;
  setCustomTheme: (theme: CustomTheme) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`resume-tabpanel-${index}`}
      aria-labelledby={`resume-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function ResumeForm({
  resumeData,
  setResumeData,
  customTheme,
  setCustomTheme,
}: ResumeFormProps) {
  const [activeTab, setActiveTab] = useState(0);

  const updateResumeData = (field: keyof ResumeData, value: any) => {
    setResumeData({
      ...resumeData,
      [field]: value,
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabs = [
    { label: "Personal", icon: <Person />, component: PersonalInfoForm },
    { label: "Summary", icon: <Description />, component: SummaryForm },
    { label: "Work", icon: <Work />, component: WorkExperienceForm },
    { label: "Education", icon: <School />, component: EducationForm },
    { label: "Projects", icon: <Code />, component: ProjectsForm },
    { label: "Skills", icon: <Build />, component: SkillsForm },
    { label: "Interests", icon: <Favorite />, component: InterestsForm },
    { label: "Order", icon: <Settings />, component: SectionOrderForm },
    { label: "Theme", icon: <Palette />, component: ThemeCustomizer },
  ];

  return (
    <Paper elevation={1}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="resume form tabs"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              icon={tab.icon}
              label={tab.label}
              id={`resume-tab-${index}`}
              aria-controls={`resume-tabpanel-${index}`}
              sx={{ minWidth: 80 }}
            />
          ))}
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <PersonalInfoForm
          personalInfo={resumeData.personalInfo}
          onChange={(personalInfo) =>
            updateResumeData("personalInfo", personalInfo)
          }
        />
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <SummaryForm
          summary={resumeData.summary}
          onChange={(summary) => updateResumeData("summary", summary)}
        />
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <WorkExperienceForm
          workExperience={resumeData.workExperience}
          onChange={(workExperience) =>
            updateResumeData("workExperience", workExperience)
          }
        />
      </TabPanel>

      <TabPanel value={activeTab} index={3}>
        <EducationForm
          education={resumeData.education}
          onChange={(education) => updateResumeData("education", education)}
        />
      </TabPanel>

      <TabPanel value={activeTab} index={4}>
        <ProjectsForm
          projects={resumeData.projects}
          onChange={(projects) => updateResumeData("projects", projects)}
        />
      </TabPanel>

      <TabPanel value={activeTab} index={5}>
        <SkillsForm
          skills={resumeData.skills}
          onChange={(skills) => updateResumeData("skills", skills)}
        />
      </TabPanel>

      <TabPanel value={activeTab} index={6}>
        <InterestsForm
          interests={resumeData.interests}
          onChange={(interests) => updateResumeData("interests", interests)}
        />
      </TabPanel>

      <TabPanel value={activeTab} index={7}>
        <SectionOrderForm
          sectionOrder={resumeData.sectionOrder}
          onChange={(sectionOrder) =>
            updateResumeData("sectionOrder", sectionOrder)
          }
        />
      </TabPanel>

      <TabPanel value={activeTab} index={8}>
        <ThemeCustomizer customTheme={customTheme} onChange={setCustomTheme} />
      </TabPanel>
    </Paper>
  );
}
