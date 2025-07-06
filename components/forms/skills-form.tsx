"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import type { Skills } from "../../types/resume";

interface SkillsFormProps {
  skills: Skills;
  onChange: (skills: Skills) => void;
}

export function SkillsForm({ skills, onChange }: SkillsFormProps) {
  const [newSkills, setNewSkills] = useState({
    languages: "",
    frameworks: "",
    tools: "",
    databases: "",
  });

  const addSkill = (category: keyof Skills) => {
    const skill = newSkills[category].trim();
    if (skill) {
      onChange({
        ...skills,
        [category]: [...skills[category], skill],
      });
      setNewSkills({ ...newSkills, [category]: "" });
    }
  };

  const removeSkill = (category: keyof Skills, skill: string) => {
    onChange({
      ...skills,
      [category]: skills[category].filter((s) => s !== skill),
    });
  };

  const skillCategories = [
    {
      key: "languages" as keyof Skills,
      label: "Programming Languages",
      placeholder: "JavaScript, Python, Java",
    },
    {
      key: "frameworks" as keyof Skills,
      label: "Frameworks & Libraries",
      placeholder: "React, Node.js, Express",
    },
    {
      key: "tools" as keyof Skills,
      label: "Tools & Technologies",
      placeholder: "Git, Docker, AWS",
    },
    {
      key: "databases" as keyof Skills,
      label: "Databases",
      placeholder: "MySQL, MongoDB, PostgreSQL",
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Technical Skills
      </Typography>

      <Grid container spacing={3}>
        {skillCategories.map(({ key, label, placeholder }) => (
          <Grid item xs={12} md={6} key={key}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {label}
                </Typography>
                <Box display="flex" gap={1} mb={2}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder={placeholder}
                    value={newSkills[key]}
                    onChange={(e) =>
                      setNewSkills({ ...newSkills, [key]: e.target.value })
                    }
                    onKeyPress={(e) => e.key === "Enter" && addSkill(key)}
                  />
                  <Button variant="outlined" onClick={() => addSkill(key)}>
                    <Add />
                  </Button>
                </Box>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {skills[key].map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => removeSkill(key, skill)}
                      size="small"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
