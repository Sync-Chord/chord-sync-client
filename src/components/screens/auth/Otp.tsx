import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface props {
  type: String
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function Otp(props: props) {
  const nav = useNavigate()
  const [showOtp, setShowOtp] = useState(false)
  const [newPasswordInput, setNewPasswordInput] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
  }

  const check = () => {
    toast.success("Otp Resent SuccessFully!!!")
    setShowOtp(true)
  }
  const checkotp = () => {
    toast.success("Otp Sent SuccessFully!!!")
    setShowOtp(true)
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
                OTP
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="uniqueid"
                  label="Email or Phone"
                  name="uniqueid"
                  autoFocus
                />
                {showOtp ? (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="OTP"
                    label="OTP"
                    name="OTP"
                    autoFocus
                  />
                ) : (
                  ""
                )}
                {props.type === "forgetpassword" && showOtp ? (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="newPassword"
                    label="New Password"
                    name="newPassword"
                    autoFocus
                  />
                ) : (
                  ""
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setShowOtp(true)
                    checkotp()
                  }}
                  sx={{ mt: 3, mb: 2 }}
                  style={{ backgroundColor: "#0C7075" }}
                >
                  {showOtp ? "Submit" : "Send OTP"}
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link
                      onClick={() => check()}
                      style={{
                        color: "#0C7075",
                        fontSize: "15px",
                        cursor: "pointer",
                      }}
                      variant="body2"
                    >
                      Resend OTP
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      onClick={() => nav("/auth/login")}
                      style={{
                        color: "#0C7075",
                        fontSize: "15px",
                        cursor: "pointer",
                      }}
                    >
                      {"Login with password"}
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
