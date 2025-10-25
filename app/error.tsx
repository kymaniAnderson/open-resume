"use client";

import { useEffect } from "react";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { Error as ErrorIcon, Refresh } from "@mui/icons-material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            maxWidth: 500,
            width: "100%",
          }}
        >
          <ErrorIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Something went wrong!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            We encountered an unexpected error. Don't worry, your data is stored
            locally and hasn't been lost.
          </Typography>
          {process.env.NODE_ENV === "development" && (
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 3,
                textAlign: "left",
                bgcolor: "grey.100",
                maxHeight: 200,
                overflow: "auto",
              }}
            >
              <Typography
                variant="caption"
                component="pre"
                sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {error.message}
              </Typography>
            </Paper>
          )}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button variant="contained" startIcon={<Refresh />} onClick={reset}>
              Try Again
            </Button>
            <Button
              variant="outlined"
              onClick={() => (window.location.href = "/")}
            >
              Go Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
