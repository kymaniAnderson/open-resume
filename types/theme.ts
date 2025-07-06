export interface CustomTheme {
  primaryColor: string;
  accentColor: string;
  headingFont: string;
  bodyFont: string;
  mode: "light" | "dark";
}

export const defaultTheme: CustomTheme = {
  primaryColor: "#1976d2",
  accentColor: "#dc004e",
  headingFont: "Playfair Display, serif",
  bodyFont: "Inter, sans-serif",
  mode: "light",
};

export const fontOptions = [
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Open Sans", value: "Open Sans, sans-serif" },
  { label: "Lato", value: "Lato, sans-serif" },
  { label: "Montserrat", value: "Montserrat, sans-serif" },
  { label: "Poppins", value: "Poppins, sans-serif" },
  { label: "Source Sans Pro", value: "Source Sans Pro, sans-serif" },
];

export const headingFontOptions = [
  { label: "Playfair Display", value: "Playfair Display, serif" },
  { label: "Merriweather", value: "Merriweather, serif" },
  { label: "Lora", value: "Lora, serif" },
  { label: "Crimson Text", value: "Crimson Text, serif" },
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Montserrat", value: "Montserrat, sans-serif" },
];

export const colorPresets = [
  { name: "Blue", primary: "#1976d2", accent: "#dc004e" },
  { name: "Green", primary: "#388e3c", accent: "#f57c00" },
  { name: "Purple", primary: "#7b1fa2", accent: "#00796b" },
  { name: "Teal", primary: "#00796b", accent: "#e91e63" },
  { name: "Orange", primary: "#f57c00", accent: "#3f51b5" },
  { name: "Red", primary: "#d32f2f", accent: "#1976d2" },
  { name: "Indigo", primary: "#3f51b5", accent: "#ff5722" },
  { name: "Pink", primary: "#e91e63", accent: "#4caf50" },
];
