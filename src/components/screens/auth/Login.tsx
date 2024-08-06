import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../../assests/images/logo.png";
import validation from "../../../utils/validation";
import CustomTextField from "../../common/CustomTextField";

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
              <img
                src={image}
                style={{ width: "9rem", padding: "1rem" }}
                alt="logo"
              />

              <Typography sx={{ fontSize: "25px" }}>Hello!</Typography>
              <Typography sx={{ fontSize: "15px" }}>
                Login to your account !
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={loginSubmit}
                sx={{ mt: 1 }}
              >
                <CustomTextField
                  id="uniqueId"
                  autofous={true}
                  name="uniqueId"
                  label="Email or Phone"
                />
                {error.uniqueId ? (
                  <Typography style={{ color: "red" }}>
                    {" "}
                    {error.uniqueId}{" "}
                  </Typography>
                ) : (
                  <></>
                )}
                <CustomTextField
                  id="password"
                  autofous={false}
                  name="password"
                  label="Password"
                  // type="password"
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
                  style={{ backgroundColor: "#27AE60" }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      onClick={() => nav("/auth/forget-password")}
                      style={{
                        color: "#767A8A",
                        fontSize: "14px",
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
                        color: "#767A8A",
                        fontSize: "14px",
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
                    color: "#767A8A",
                    fontSize: "14px",
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
