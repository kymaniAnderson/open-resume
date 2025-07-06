"use client";

import type React from "react";
import { Button, Stack } from "@mui/material";
import { Save, Upload } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { PDFDownloadButton } from "./pdf-download-button";
import type { ResumeData } from "../types/resume";

interface HeaderActionsProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

export function HeaderActions({
  resumeData,
  setResumeData,
}: HeaderActionsProps) {
  const theme = useTheme();

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "resume-data.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          setResumeData(importedData);
        } catch (error) {
          console.error("Error importing data:", error);
          alert("Error importing file. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <input
        type="file"
        accept=".json"
        onChange={handleImportJSON}
        style={{ display: "none" }}
        id="import-json"
      />
      <Button
        variant="outlined"
        size="small"
        startIcon={<Upload />}
        onClick={() => document.getElementById("import-json")?.click()}
        sx={{ color: "inherit", borderColor: "inherit" }}
      >
        Import
      </Button>

      <Button
        variant="outlined"
        size="small"
        startIcon={<Save />}
        onClick={handleExportJSON}
        sx={{ color: "inherit", borderColor: "inherit" }}
      >
        Export
      </Button>

      <PDFDownloadButton resumeData={resumeData} />
    </Stack>
  );
}
