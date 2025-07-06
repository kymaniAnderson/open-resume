"use client";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import type { PersonalInfo } from "../../types/resume";

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onChange: (personalInfo: PersonalInfo) => void;
}

export function PersonalInfoForm({
  personalInfo,
  onChange,
}: PersonalInfoFormProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...personalInfo,
      [field]: value,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                required
                value={personalInfo.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="John Doe"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                required
                value={personalInfo.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john@example.com"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                required
                value={personalInfo.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                required
                value={personalInfo.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="New York, NY"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Website"
                value={personalInfo.website || ""}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://johndoe.com"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="LinkedIn"
                value={personalInfo.linkedin || ""}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="GitHub"
                value={personalInfo.github || ""}
                onChange={(e) => handleChange("github", e.target.value)}
                placeholder="https://github.com/johndoe"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
