"use client";

import { useState } from "react";
import { Box, TextField, Grid, Paper } from "@mui/material";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const commonColors = [
  "#1976d2",
  "#dc004e",
  "#388e3c",
  "#f57c00",
  "#7b1fa2",
  "#00796b",
  "#d32f2f",
  "#3f51b5",
  "#e91e63",
  "#4caf50",
  "#ff5722",
  "#795548",
  "#607d8b",
  "#9c27b0",
  "#2196f3",
  "#4caf50",
  "#ffeb3b",
  "#ff9800",
];

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [customColor, setCustomColor] = useState(color);

  const handleColorChange = (newColor: string) => {
    setCustomColor(newColor);
    onChange(newColor);
  };

  return (
    <Box>
      <TextField
        type="color"
        value={customColor}
        onChange={(e) => handleColorChange(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Grid container spacing={1}>
        {commonColors.map((presetColor) => (
          <Grid item key={presetColor}>
            <Paper
              elevation={color === presetColor ? 3 : 1}
              sx={{
                width: 32,
                height: 32,
                backgroundColor: presetColor,
                cursor: "pointer",
                border: color === presetColor ? 2 : 0,
                borderColor: "primary.main",
                "&:hover": {
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s",
              }}
              onClick={() => handleColorChange(presetColor)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
