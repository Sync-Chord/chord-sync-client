import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import image from "../../../assests/images/logo.png"
import validation from "../../../utils/validation"
import CustomTextField from "../../common/CustomTextField"

const defaultTheme = createTheme()

export default function SignUp() {
  const nav = useNavigate()

  //validation
  const [error, setError] = useState<Record<string, string>>({})

  const signUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const uniqueId = data.get("uniqueId")?.toString() ?? null
    const password = data.get("password")?.toString() ?? null
    const otp = data.get("OTP")?.toString() ?? null
    const name = data.get("name")?.toString() ?? null

    setError(validation({ name, uniqueId, password, otp }))

    console.log(error)
  }

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
              <img
                src={image}
                style={{ width: "9rem", padding: "1rem" }}
                alt="logo"
              />

              <Typography sx={{ fontSize: "25px" }}>Hello!</Typography>
              <Typography sx={{ fontSize: "15px" }}>
                Register your account !
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={signUpSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomTextField
                      id="name"
                      autofous={true}
                      name="name"
                      label="Name"
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
                    <CustomTextField
                      id="uniqueId"
                      autofous={false}
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
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      id="password"
                      autofous={false}
                      name="password"
                      label="Password"
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
                  style={{ backgroundColor: "#27AE60" }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      onClick={() => nav("/auth/login")}
                      style={{
                        color: "#767A8A",
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
  )
}
