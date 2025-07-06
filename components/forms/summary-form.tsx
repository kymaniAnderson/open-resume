"use client";
import { Box, Typography, TextField, Card, CardContent } from "@mui/material";

interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
}

export function SummaryForm({ summary, onChange }: SummaryFormProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Professional Summary
      </Typography>

      <Card>
        <CardContent>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Summary"
            value={summary}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write a brief professional summary highlighting your key skills, experience, and career objectives..."
            helperText="Tip: Keep it concise (2-3 sentences) and focus on your most relevant qualifications."
          />
        </CardContent>
      </Card>
    </Box>
  );
}
