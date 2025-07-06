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
import { Add, Delete, Close } from "@mui/icons-material";
import type { Project } from "@/types/resume";

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const [newTechStack, setNewTechStack] = useState<{ [key: string]: string }>(
    {}
  );
  const [newHighlight, setNewHighlight] = useState<{ [key: string]: string }>(
    {}
  );

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      techStack: [],
      link: "",
      github: "",
      highlights: [],
    };
    onChange([...projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const removeProject = (id: string) => {
    onChange(projects.filter((project) => project.id !== id));
  };

  const addHighlight = (id: string) => {
    const highlight = newHighlight[id]?.trim();
    if (highlight) {
      const project = projects.find((p) => p.id === id);
      if (project) {
        updateProject(id, "highlights", [...project.highlights, highlight]);
        setNewHighlight({ ...newHighlight, [id]: "" });
      }
    }
  };

  const removeHighlight = (id: string, index: number) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      const newHighlights = project.highlights.filter((_, i) => i !== index);
      updateProject(id, "highlights", newHighlights);
    }
  };

  const addTechStack = (id: string) => {
    const tech = newTechStack[id]?.trim();
    if (tech) {
      const project = projects.find((p) => p.id === id);
      if (project) {
        updateProject(id, "techStack", [...project.techStack, tech]);
        setNewTechStack({ ...newTechStack, [id]: "" });
      }
    }
  };

  const removeTechStack = (id: string, tech: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      updateProject(
        id,
        "techStack",
        project.techStack.filter((t) => t !== tech)
      );
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Projects</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={addProject}>
          Add Project
        </Button>
      </Box>

      <Stack spacing={3}>
        {projects.map((project, index) => (
          <Card key={project.id}>
            <CardHeader
              title={`Project #${index + 1}`}
              action={
                <IconButton onClick={() => removeProject(project.id)}>
                  <Delete />
                </IconButton>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Project Name"
                    required
                    value={project.name}
                    onChange={(e) =>
                      updateProject(project.id, "name", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Live Demo Link"
                    value={project.link || ""}
                    onChange={(e) =>
                      updateProject(project.id, "link", e.target.value)
                    }
                    placeholder="https://myproject.com"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="GitHub Repository"
                    value={project.github || ""}
                    onChange={(e) =>
                      updateProject(project.id, "github", e.target.value)
                    }
                    placeholder="https://github.com/username/project"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    required
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, "description", e.target.value)
                    }
                    placeholder="Brief description of what the project does and its purpose..."
                  />
                </Grid>
              </Grid>

              <Box mt={3}>
                <Typography variant="subtitle2" gutterBottom>
                  Tech Stack
                </Typography>
                <Box display="flex" gap={1} mb={2}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Add technology..."
                    value={newTechStack[project.id] || ""}
                    onChange={(e) =>
                      setNewTechStack({
                        ...newTechStack,
                        [project.id]: e.target.value,
                      })
                    }
                    onKeyPress={(e) =>
                      e.key === "Enter" && addTechStack(project.id)
                    }
                  />
                  <Button
                    variant="outlined"
                    onClick={() => addTechStack(project.id)}
                  >
                    Add
                  </Button>
                </Box>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {project.techStack.map((tech, techIndex) => (
                    <Chip
                      key={techIndex}
                      label={tech}
                      onDelete={() => removeTechStack(project.id, tech)}
                      size="small"
                    />
                  ))}
                </Box>
              </Box>

              <Box mt={3}>
                <Typography variant="subtitle2" gutterBottom>
                  Key Highlights
                </Typography>
                <Box display="flex" gap={1} mb={2}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Key achievement or feature..."
                    value={newHighlight[project.id] || ""}
                    onChange={(e) =>
                      setNewHighlight({
                        ...newHighlight,
                        [project.id]: e.target.value,
                      })
                    }
                    onKeyPress={(e) =>
                      e.key === "Enter" && addHighlight(project.id)
                    }
                  />
                  <Button
                    variant="outlined"
                    onClick={() => addHighlight(project.id)}
                  >
                    Add
                  </Button>
                </Box>
                <Stack spacing={1}>
                  {project.highlights.map((highlight, highlightIndex) => (
                    <Box
                      key={highlightIndex}
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        • {highlight}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          removeHighlight(project.id, highlightIndex)
                        }
                      >
                        <Close />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <Card>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography color="text.secondary" gutterBottom>
                No projects added yet.
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={addProject}
              >
                Add Your First Project
              </Button>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Box>
  );
}
