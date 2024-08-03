import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import validation from "../../../utils/validation";
import { useState } from "react";
import { color } from "@mui/system";

const defaultTheme = createTheme();

export default function SignUp() {
  const nav = useNavigate();

  //validation
  const [error, setError] = useState<Record<string, string>>({});

  const signUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const uniqueId = data.get("uniqueId")?.toString() ?? null;
    const password = data.get("password")?.toString() ?? null;
    const otp = data.get("OTP")?.toString() ?? null;
    const name = data.get("name")?.toString() ?? null;

    setError(validation({ name, uniqueId, password, otp }));

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
            style={{ borderRadius: "15px" }}
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
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={signUpSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                    />
                    {error.name ? (
                      <Typography style={{ color: "red" }}>
                        {" "}
                        {error.name}{" "}
                      </Typography>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="uniqueId"
                      label="Email or Phone"
                      name="uniqueId"
                      autoComplete="uniqueId"
                    />
                    {error.uniqueId ? (
                      <Typography style={{ color: "red" }}>
                        {" "}
                        {error.uniqueId}{" "}
                      </Typography>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                    {error.password ? (
                      <Typography style={{ color: "red" }}>
                        {" "}
                        {error.password}{" "}
                      </Typography>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ backgroundColor: "#0C7075" }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      onClick={() => nav("/auth/login")}
                      style={{
                        color: "#0C7075",
                        fontSize: "15px",
                        cursor: "pointer",
                      }}
                    >
                      {"  Already have an account? Sign in"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
