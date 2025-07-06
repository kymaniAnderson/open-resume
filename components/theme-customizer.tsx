"use client";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Chip,
  Stack,
} from "@mui/material";
import { ColorPicker } from "./color-picker";
import {
  type CustomTheme,
  fontOptions,
  headingFontOptions,
  colorPresets,
} from "../types/theme";

interface ThemeCustomizerProps {
  customTheme: CustomTheme;
  onChange: (theme: CustomTheme) => void;
}

export function ThemeCustomizer({
  customTheme,
  onChange,
}: ThemeCustomizerProps) {
  const updateTheme = (field: keyof CustomTheme, value: any) => {
    onChange({
      ...customTheme,
      [field]: value,
    });
  };

  const applyColorPreset = (preset: { primary: string; accent: string }) => {
    onChange({
      ...customTheme,
      primaryColor: preset.primary,
      accentColor: preset.accent,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Theme Customization
      </Typography>

      <Grid container spacing={3}>
        {/* Color Presets */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Color Presets
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {colorPresets.map((preset) => (
                  <Chip
                    key={preset.name}
                    label={preset.name}
                    onClick={() => applyColorPreset(preset)}
                    sx={{
                      backgroundColor: preset.primary,
                      color: "white",
                      "&:hover": {
                        backgroundColor: preset.primary,
                        opacity: 0.8,
                      },
                    }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Custom Colors */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Primary Color
              </Typography>
              <ColorPicker
                color={customTheme.primaryColor}
                onChange={(color) => updateTheme("primaryColor", color)}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Accent Color
              </Typography>
              <ColorPicker
                color={customTheme.accentColor}
                onChange={(color) => updateTheme("accentColor", color)}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Font Selection */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <FormControl fullWidth>
                <InputLabel>Heading Font</InputLabel>
                <Select
                  value={customTheme.headingFont}
                  label="Heading Font"
                  onChange={(e) => updateTheme("headingFont", e.target.value)}
                >
                  {headingFontOptions.map((font) => (
                    <MenuItem key={font.value} value={font.value}>
                      <span style={{ fontFamily: font.value }}>
                        {font.label}
                      </span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <FormControl fullWidth>
                <InputLabel>Body Font</InputLabel>
                <Select
                  value={customTheme.bodyFont}
                  label="Body Font"
                  onChange={(e) => updateTheme("bodyFont", e.target.value)}
                >
                  {fontOptions.map((font) => (
                    <MenuItem key={font.value} value={font.value}>
                      <span style={{ fontFamily: font.value }}>
                        {font.label}
                      </span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Dark Mode Toggle */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <FormControlLabel
                control={
                  <Switch
                    checked={customTheme.mode === "dark"}
                    onChange={(e) =>
                      updateTheme("mode", e.target.checked ? "dark" : "light")
                    }
                  />
                }
                label="Dark Mode"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Preview */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Font Preview
              </Typography>
              <Box
                sx={{
                  p: 2,
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: customTheme.headingFont,
                    color: customTheme.primaryColor,
                    mb: 1,
                  }}
                >
                  John Doe
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: customTheme.bodyFont,
                    color: customTheme.accentColor,
                  }}
                >
                  Software Engineer
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: customTheme.bodyFont,
                    mt: 1,
                  }}
                >
                  This is how your resume text will look with the selected fonts
                  and colors.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
