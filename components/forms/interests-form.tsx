"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { Add } from "@mui/icons-material";

interface InterestsFormProps {
  interests: string[];
  onChange: (interests: string[]) => void;
}

export function InterestsForm({ interests, onChange }: InterestsFormProps) {
  const [newInterest, setNewInterest] = useState("");

  const addInterest = () => {
    const interest = newInterest.trim();
    if (interest && !interests.includes(interest)) {
      onChange([...interests, interest]);
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    onChange(interests.filter((i) => i !== interest));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Interests & Hobbies
      </Typography>

      <Card>
        <CardContent>
          <Box display="flex" gap={1} mb={3}>
            <TextField
              fullWidth
              label="Add Interest"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Photography, Hiking, Chess, etc."
              onKeyPress={(e) => e.key === "Enter" && addInterest()}
            />
            <Button variant="outlined" onClick={addInterest}>
              <Add />
            </Button>
          </Box>

          <Box display="flex" flexWrap="wrap" gap={1}>
            {interests.map((interest, index) => (
              <Chip
                key={index}
                label={interest}
                onDelete={() => removeInterest(interest)}
              />
            ))}
          </Box>

          {interests.length === 0 && (
            <Typography color="text.secondary" variant="body2">
              Add some interests to show your personality and make your resume
              more memorable.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
