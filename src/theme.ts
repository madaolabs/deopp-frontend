import { createTheme } from "@mui/material/styles";

export const customeTheme = createTheme({
  palette: {
    primary: {
      main: "#05A17E",
    },
    neutral: {
      main: "#FFF",
      contrastText: "#858585",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "none",
        },
      },
    },
  },
});
