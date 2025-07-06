"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Chip,
  IconButton,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Add, Delete } from "@mui/icons-material";
import type { Education } from "../../types/resume";

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export function EducationForm({ education, onChange }: EducationFormProps) {
  const [newHonor, setNewHonor] = useState<{ [key: string]: string }>({});
  const [newActivity, setNewActivity] = useState<{ [key: string]: string }>({});

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: null,
      endDate: null,
      gpa: "",
      honors: [],
      activities: [],
    };
    onChange([...education, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(
      education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = (id: string) => {
    onChange(education.filter((edu) => edu.id !== id));
  };

  const addHonor = (id: string) => {
    const honor = newHonor[id]?.trim();
    if (honor) {
      const edu = education.find((e) => e.id === id);
      if (edu) {
        updateEducation(id, "honors", [...(edu.honors || []), honor]);
        setNewHonor({ ...newHonor, [id]: "" });
      }
    }
  };

  const removeHonor = (id: string, honor: string) => {
    const edu = education.find((e) => e.id === id);
    if (edu) {
      updateEducation(
        id,
        "honors",
        (edu.honors || []).filter((h) => h !== honor)
      );
    }
  };

  const addActivity = (id: string) => {
    const activity = newActivity[id]?.trim();
    if (activity) {
      const edu = education.find((e) => e.id === id);
      if (edu) {
        updateEducation(id, "activities", [
          ...(edu.activities || []),
          activity,
        ]);
        setNewActivity({ ...newActivity, [id]: "" });
      }
    }
  };

  const removeActivity = (id: string, activity: string) => {
    const edu = education.find((e) => e.id === id);
    if (edu) {
      updateEducation(
        id,
        "activities",
        (edu.activities || []).filter((a) => a !== activity)
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Education</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={addEducation}
          >
            Add Education
          </Button>
        </Box>

        <Stack spacing={3}>
          {education.map((edu, index) => (
            <Card key={edu.id}>
              <CardHeader
                title={`Education #${index + 1}`}
                action={
                  <IconButton onClick={() => removeEducation(edu.id)}>
                    <Delete />
                  </IconButton>
                }
              />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Institution"
                      required
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(edu.id, "institution", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Degree"
                      required
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(edu.id, "degree", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Field of Study"
                      required
                      value={edu.field}
                      onChange={(e) =>
                        updateEducation(edu.id, "field", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      value={edu.location}
                      onChange={(e) =>
                        updateEducation(edu.id, "location", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Start Date"
                      value={edu.startDate}
                      onChange={(date) =>
                        updateEducation(edu.id, "startDate", date)
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="End Date"
                      value={edu.endDate}
                      onChange={(date) =>
                        updateEducation(edu.id, "endDate", date)
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="GPA (Optional)"
                      value={edu.gpa || ""}
                      onChange={(e) =>
                        updateEducation(edu.id, "gpa", e.target.value)
                      }
                      placeholder="3.8/4.0"
                    />
                  </Grid>
                </Grid>

                <Box mt={3}>
                  <Typography variant="subtitle2" gutterBottom>
                    Honors & Awards
                  </Typography>
                  <Box display="flex" gap={1} mb={2}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Dean's List, Magna Cum Laude, etc."
                      value={newHonor[edu.id] || ""}
                      onChange={(e) =>
                        setNewHonor({ ...newHonor, [edu.id]: e.target.value })
                      }
                      onKeyPress={(e) => e.key === "Enter" && addHonor(edu.id)}
                    />
                    <Button variant="outlined" onClick={() => addHonor(edu.id)}>
                      Add
                    </Button>
                  </Box>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {(edu.honors || []).map((honor, honorIndex) => (
                      <Chip
                        key={honorIndex}
                        label={honor}
                        onDelete={() => removeHonor(edu.id, honor)}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>

                <Box mt={3}>
                  <Typography variant="subtitle2" gutterBottom>
                    Activities & Clubs
                  </Typography>
                  <Box display="flex" gap={1} mb={2}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Student Government, Chess Club, etc."
                      value={newActivity[edu.id] || ""}
                      onChange={(e) =>
                        setNewActivity({
                          ...newActivity,
                          [edu.id]: e.target.value,
                        })
                      }
                      onKeyPress={(e) =>
                        e.key === "Enter" && addActivity(edu.id)
                      }
                    />
                    <Button
                      variant="outlined"
                      onClick={() => addActivity(edu.id)}
                    >
                      Add
                    </Button>
                  </Box>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {(edu.activities || []).map((activity, activityIndex) => (
                      <Chip
                        key={activityIndex}
                        label={activity}
                        onDelete={() => removeActivity(edu.id, activity)}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}

          {education.length === 0 && (
            <Card>
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Typography color="text.secondary" gutterBottom>
                  No education added yet.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={addEducation}
                >
                  Add Your First Education
                </Button>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
