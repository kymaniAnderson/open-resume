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
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Add, Delete, Close } from "@mui/icons-material";
import type { WorkExperience } from "../../types/resume";

interface WorkExperienceFormProps {
  workExperience: WorkExperience[];
  onChange: (workExperience: WorkExperience[]) => void;
}

export function WorkExperienceForm({
  workExperience,
  onChange,
}: WorkExperienceFormProps) {
  const [newTechStack, setNewTechStack] = useState<{ [key: string]: string }>(
    {}
  );
  const [newResponsibility, setNewResponsibility] = useState<{
    [key: string]: string;
  }>({});

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: null,
      endDate: null,
      current: false,
      responsibilities: [],
      techStack: [],
    };
    onChange([...workExperience, newExp]);
  };

  const updateExperience = (
    id: string,
    field: keyof WorkExperience,
    value: any
  ) => {
    onChange(
      workExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    onChange(workExperience.filter((exp) => exp.id !== id));
  };

  const addResponsibility = (id: string) => {
    const responsibility = newResponsibility[id]?.trim();
    if (responsibility) {
      const exp = workExperience.find((e) => e.id === id);
      if (exp) {
        updateExperience(id, "responsibilities", [
          ...exp.responsibilities,
          responsibility,
        ]);
        setNewResponsibility({ ...newResponsibility, [id]: "" });
      }
    }
  };

  const removeResponsibility = (id: string, index: number) => {
    const exp = workExperience.find((e) => e.id === id);
    if (exp) {
      const newResponsibilities = exp.responsibilities.filter(
        (_, i) => i !== index
      );
      updateExperience(id, "responsibilities", newResponsibilities);
    }
  };

  const addTechStack = (id: string) => {
    const tech = newTechStack[id]?.trim();
    if (tech) {
      const exp = workExperience.find((e) => e.id === id);
      if (exp) {
        updateExperience(id, "techStack", [...(exp.techStack || []), tech]);
        setNewTechStack({ ...newTechStack, [id]: "" });
      }
    }
  };

  const removeTechStack = (id: string, tech: string) => {
    const exp = workExperience.find((e) => e.id === id);
    if (exp) {
      updateExperience(
        id,
        "techStack",
        (exp.techStack || []).filter((t) => t !== tech)
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
          <Typography variant="h6">Work Experience</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={addExperience}
          >
            Add Experience
          </Button>
        </Box>

        <Stack spacing={3}>
          {workExperience.map((exp, index) => (
            <Card key={exp.id}>
              <CardHeader
                title={`Experience #${index + 1}`}
                action={
                  <IconButton onClick={() => removeExperience(exp.id)}>
                    <Delete />
                  </IconButton>
                }
              />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Company"
                      required
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, "company", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Position"
                      required
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(exp.id, "position", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(exp.id, "location", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={exp.current}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              "current",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Currently working here"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Start Date"
                      value={exp.startDate}
                      onChange={(date) =>
                        updateExperience(exp.id, "startDate", date)
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  {!exp.current && (
                    <Grid item xs={12} md={6}>
                      <DatePicker
                        label="End Date"
                        value={exp.endDate}
                        onChange={(date) =>
                          updateExperience(exp.id, "endDate", date)
                        }
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </Grid>
                  )}
                </Grid>

                <Box mt={3}>
                  <Typography variant="subtitle2" gutterBottom>
                    Responsibilities
                  </Typography>
                  <Box display="flex" gap={1} mb={2}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Add a responsibility..."
                      value={newResponsibility[exp.id] || ""}
                      onChange={(e) =>
                        setNewResponsibility({
                          ...newResponsibility,
                          [exp.id]: e.target.value,
                        })
                      }
                      onKeyPress={(e) =>
                        e.key === "Enter" && addResponsibility(exp.id)
                      }
                    />
                    <Button
                      variant="outlined"
                      onClick={() => addResponsibility(exp.id)}
                    >
                      Add
                    </Button>
                  </Box>
                  <Stack spacing={1}>
                    {exp.responsibilities.map((resp, respIndex) => (
                      <Box
                        key={respIndex}
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          • {resp}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            removeResponsibility(exp.id, respIndex)
                          }
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <Box mt={3}>
                  <Typography variant="subtitle2" gutterBottom>
                    Tech Stack
                  </Typography>
                  <Box display="flex" gap={1} mb={2}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Add technology..."
                      value={newTechStack[exp.id] || ""}
                      onChange={(e) =>
                        setNewTechStack({
                          ...newTechStack,
                          [exp.id]: e.target.value,
                        })
                      }
                      onKeyPress={(e) =>
                        e.key === "Enter" && addTechStack(exp.id)
                      }
                    />
                    <Button
                      variant="outlined"
                      onClick={() => addTechStack(exp.id)}
                    >
                      Add
                    </Button>
                  </Box>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {(exp.techStack || []).map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        onDelete={() => removeTechStack(exp.id, tech)}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}

          {workExperience.length === 0 && (
            <Card>
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Typography color="text.secondary" gutterBottom>
                  No work experience added yet.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={addExperience}
                >
                  Add Your First Experience
                </Button>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
