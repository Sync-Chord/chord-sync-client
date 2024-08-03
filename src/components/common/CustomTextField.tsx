import React from "react"
import TextField from "@mui/material/TextField"
import { createTheme, ThemeProvider } from "@mui/material/styles"

interface Props {
  id: string
  name: string
  label: string
  autofous: boolean
}

export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#27AE60", // default outline color
            },
            "&:hover fieldset": {
              borderColor: "#27AE60", // hover outline color
            },
            "&.Mui-focused fieldset": {
              borderColor: "#27AE60", // focused outline color
            },
          },
          "& .MuiInputLabel-root": {
            color: "black", // default label color
          },
          "&:hover .MuiInputLabel-root": {
            color: "black", // hover label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "black", // focused label color
          },
        },
      },
    },
  },
})

const CustomTextField = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        margin="normal"
        required
        fullWidth
        id={props.id}
        label={props.label}
        name={props.name}
        autoFocus={props.autofous}
      />
    </ThemeProvider>
  )
}

export default CustomTextField
