"use client";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

interface SectionOrderFormProps {
  sectionOrder: string[];
  onChange: (sectionOrder: string[]) => void;
}

const sectionLabels: { [key: string]: string } = {
  summary: "Professional Summary",
  workExperience: "Work Experience",
  education: "Education",
  projects: "Projects",
  skills: "Technical Skills",
  interests: "Interests & Hobbies",
};

export function SectionOrderForm({
  sectionOrder,
  onChange,
}: SectionOrderFormProps) {
  const moveSection = (index: number, direction: "up" | "down") => {
    const newOrder = [...sectionOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newOrder.length) {
      [newOrder[index], newOrder[targetIndex]] = [
        newOrder[targetIndex],
        newOrder[index],
      ];
      onChange(newOrder);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Section Order
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Customize the order of sections in your resume. Personal information
            is always first.
          </Typography>

          <Paper
            variant="outlined"
            sx={{ p: 2, mb: 2, bgcolor: "action.hover" }}
          >
            <Typography variant="body1" fontWeight="medium">
              Personal Information
            </Typography>
            <Typography variant="body2" color="text.secondary">
              (Always first)
            </Typography>
          </Paper>

          <List>
            {sectionOrder.map((section, index) => (
              <ListItem
                key={section}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <ListItemText primary={sectionLabels[section] || section} />
                <IconButton
                  onClick={() => moveSection(index, "up")}
                  disabled={index === 0}
                  size="small"
                >
                  <ArrowUpward />
                </IconButton>
                <IconButton
                  onClick={() => moveSection(index, "down")}
                  disabled={index === sectionOrder.length - 1}
                  size="small"
                >
                  <ArrowDownward />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
