import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { border, Container } from "@mui/system";
import validation from "../../../utils/validation";
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  const nav = useNavigate();
  const [error, setError] = useState<Record<string, string>>({});

  const loginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const uniqueId = data.get("uniqueId")?.toString() ?? null;
    const password = data.get("password")?.toString() ?? null;
    setError(validation({ uniqueId, password }));

    console.log(error);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            style={{
              borderRadius: "15px",
              // backdropFilter: "blur(16px) saturate(180%)",
              // WebkitBackdropFilter: "blur(16px) saturate(180%)",
              // backgroundColor: "rgba(30,30,30,0.75)",
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#0C7075" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={loginSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="uniqueId"
                  label="Email Address"
                  name="uniqueId"
                  autoComplete="email"
                  autoFocus
                  style={styles.text_field}
                />
                {error.uniqueId ? (
                  <Typography style={{ color: "red" }}>
                    {" "}
                    {error.uniqueId}{" "}
                  </Typography>
                ) : (
                  <></>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {error.password ? (
                  <Typography style={{ color: "red" }}>
                    {error.password}
                  </Typography>
                ) : (
                  <></>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ backgroundColor: "#0C7075" }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      onClick={() => nav("/auth/forget-password")}
                      style={{
                        color: "#0C7075",
                        fontSize: "15px",
                        cursor: "pointer",
                      }}
                      variant="body2"
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      onClick={() => nav("/auth/login-by-otp")}
                      style={{
                        color: "#0C7075",
                        fontSize: "15px",
                        cursor: "pointer",
                      }}
                    >
                      {"Sign In with OTP"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>

              <Grid item style={{ padding: "20px", fontSize: "15px" }}>
                <Link
                  onClick={() => nav("/auth/signup")}
                  style={{
                    color: "#0C7075",
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                >
                  {"Don't Have an Account ? Register Here"}
                </Link>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const styles = {
  text_field: { border: "solid 1px red" },
};
