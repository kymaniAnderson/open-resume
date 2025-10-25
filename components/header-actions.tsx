"use client";

import type React from "react";
import { Button, Stack, Alert, Snackbar } from "@mui/material";
import { Save, Upload } from "@mui/icons-material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { PDFDownloadButton } from "./pdf-download-button";
import type { ResumeData } from "../types/resume";
import { parseDates } from "../utils/date-parser";
import { validateDataSize, getDataSizeMB } from "../utils/validation";

interface HeaderActionsProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

export function HeaderActions({
  resumeData,
  setResumeData,
}: HeaderActionsProps) {
  const theme = useTheme();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleExportJSON = () => {
    // Validate data size before export
    if (!validateDataSize(resumeData)) {
      const size = getDataSizeMB(resumeData);
      setSnackbar({
        open: true,
        message: `Data size (${size.toFixed(
          2
        )}MB) exceeds maximum limit of 5MB. Please reduce content.`,
        severity: "error",
      });
      return;
    }

    try {
      const dataStr = JSON.stringify(resumeData, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = "resume-data.json";

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();

      setSnackbar({
        open: true,
        message: "Resume exported successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error exporting data:", error);
      setSnackbar({
        open: true,
        message: "Error exporting file. Please try again.",
        severity: "error",
      });
    }
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setSnackbar({
          open: true,
          message: `File too large (${(file.size / 1024 / 1024).toFixed(
            2
          )}MB). Maximum size is 5MB.`,
          severity: "error",
        });
        event.target.value = ""; // Reset input
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);

          // Validate data size
          if (!validateDataSize(importedData)) {
            const size = getDataSizeMB(importedData);
            setSnackbar({
              open: true,
              message: `Imported data size (${size.toFixed(
                2
              )}MB) exceeds maximum limit of 5MB.`,
              severity: "error",
            });
            return;
          }

          setResumeData(parseDates(importedData));
          setSnackbar({
            open: true,
            message: "Resume imported successfully!",
            severity: "success",
          });
        } catch (error) {
          console.error("Error importing data:", error);
          setSnackbar({
            open: true,
            message: "Error importing file. Please check the file format.",
            severity: "error",
          });
        }
      };
      reader.readAsText(file);
    }
    // Reset input to allow re-importing same file
    event.target.value = "";
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <input
          type="file"
          accept=".json"
          onChange={handleImportJSON}
          style={{ display: "none" }}
          id="import-json"
          aria-label="Import resume data from JSON file"
        />
        <Button
          variant="outlined"
          size="small"
          startIcon={<Upload />}
          onClick={() => document.getElementById("import-json")?.click()}
          sx={{ color: "inherit", borderColor: "inherit" }}
          aria-label="Import resume data"
        >
          Import
        </Button>

        <Button
          variant="outlined"
          size="small"
          startIcon={<Save />}
          onClick={handleExportJSON}
          sx={{ color: "inherit", borderColor: "inherit" }}
          aria-label="Export resume data to JSON file"
        >
          Export
        </Button>

        <PDFDownloadButton resumeData={resumeData} />
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
