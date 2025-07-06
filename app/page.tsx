"use client";

import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { ResumeForm } from "../components/resume-form";
import { ResumePreview } from "../components/resume-preview";
import { HeaderActions } from "../components/header-actions";
import { type ResumeData, defaultResumeData } from "../types/resume";
import { type CustomTheme, defaultTheme } from "../types/theme";

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [customTheme, setCustomTheme] = useState<CustomTheme>(defaultTheme);
  const [isSaving, setIsSaving] = useState(false);

  // Create MUI theme based on custom theme
  const muiTheme = createTheme({
    palette: {
      primary: {
        main: customTheme.primaryColor,
      },
      secondary: {
        main: customTheme.accentColor,
      },
      mode: customTheme.mode,
    },
    typography: {
      fontFamily: customTheme.bodyFont,
      h1: {
        fontFamily: customTheme.headingFont,
      },
      h2: {
        fontFamily: customTheme.headingFont,
      },
      h3: {
        fontFamily: customTheme.headingFont,
      },
      h4: {
        fontFamily: customTheme.headingFont,
      },
      h5: {
        fontFamily: customTheme.headingFont,
      },
      h6: {
        fontFamily: customTheme.headingFont,
      },
    },
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    const savedTheme = localStorage.getItem("customTheme");

    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }

    if (savedTheme) {
      try {
        setCustomTheme(JSON.parse(savedTheme));
      } catch (error) {
        console.error("Error loading saved theme:", error);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
      localStorage.setItem("customTheme", JSON.stringify(customTheme));
      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 1000);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [resumeData, customTheme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
        {/* Header */}
        <AppBar position="sticky" elevation={1}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Resume Builder
            </Typography>
            {isSaving && (
              <Typography variant="body2" sx={{ mr: 2, opacity: 0.7 }}>
                Saving...
              </Typography>
            )}
            <HeaderActions
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth={false} sx={{ py: 3 }}>
          <Grid container spacing={3}>
            {/* Left Sidebar - Forms */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ height: "calc(100vh - 120px)", overflow: "auto" }}>
                <ResumeForm
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                  customTheme={customTheme}
                  setCustomTheme={setCustomTheme}
                />
              </Box>
            </Grid>

            {/* Right Panel - Preview */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ height: "calc(100vh - 120px)", overflow: "auto" }}>
                <Paper elevation={2} sx={{ p: 0 }}>
                  <ResumePreview
                    resumeData={resumeData}
                    customTheme={customTheme}
                  />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
