"use client";

import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { ResumeForm } from "../components/resume-form";
import { ResumePreview } from "../components/resume-preview";
import { HeaderActions } from "../components/header-actions";
import { type ResumeData, defaultResumeData } from "../types/resume";
import { type CustomTheme, defaultTheme } from "../types/theme";
import { parseDates } from "../utils/date-parser";

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [customTheme, setCustomTheme] = useState<CustomTheme>(defaultTheme);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    const loadData = async () => {
      try {
        const savedData = localStorage.getItem("resumeData");
        const savedTheme = localStorage.getItem("customTheme");

        if (savedData) {
          try {
            const parsed = JSON.parse(savedData);
            setResumeData(parseDates(parsed));
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
      } finally {
        // Small delay to prevent flash
        setTimeout(() => setIsLoading(false), 100);
      }
    };

    loadData();
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />

        {/* Loading backdrop */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress color="inherit" size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading Resume Builder...
            </Typography>
          </Box>
        </Backdrop>

        <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
          {/* Header */}
          <AppBar
            position="sticky"
            elevation={1}
            component="header"
            role="banner"
          >
            <Toolbar>
              <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                Resume Builder
              </Typography>
              {isSaving && (
                <Typography
                  variant="body2"
                  sx={{ mr: 2, opacity: 0.7 }}
                  role="status"
                  aria-live="polite"
                >
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
          <Container
            maxWidth={false}
            sx={{ py: 3 }}
            component="main"
            role="main"
          >
            <Grid container spacing={3}>
              {/* Left Sidebar - Forms */}
              <Grid item xs={12} lg={6}>
                <Box
                  sx={{ height: "calc(100vh - 120px)", overflow: "auto" }}
                  role="region"
                  aria-label="Resume editor forms"
                >
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
                <Box
                  sx={{ height: "calc(100vh - 120px)", overflow: "auto" }}
                  role="region"
                  aria-label="Resume preview"
                >
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
      </LocalizationProvider>
    </ThemeProvider>
  );
}
