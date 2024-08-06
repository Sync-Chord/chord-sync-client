import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
interface Props {
  id: string;
  name: string;
  label: string;
  autofocus: boolean;
  type?: string;
  icon?: React.ReactNode;
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
});

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
        autoFocus={props.autofocus}
        type={props.type}
        InputProps={{
          endAdornment: props.icon ? (
            <InputAdornment position="end">{props.icon}</InputAdornment>
          ) : null,
        }}
      />
    </ThemeProvider>
  );
};

export default CustomTextField;
