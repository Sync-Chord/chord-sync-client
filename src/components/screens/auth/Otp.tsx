import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import image from "../../../assests/images/logo.png"
import validation from "../../../utils/validation"
import CustomTextField from "../../common/CustomTextField"
interface props {
  type: String
}

const defaultTheme = createTheme()

export default function Otp(props: props) {
  const nav = useNavigate()
  const [showOtp, setShowOtp] = useState(false)

  const check = () => {
    toast.success("Otp Resent SuccessFully!!!")
    setShowOtp(true)
  }
  const checkotp = () => {
    toast.success("Otp Sent SuccessFully!!!")
    setShowOtp(true)
  }

  //validation
  const [error, setError] = useState<Record<string, string>>({})

  const otpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const uniqueId = data.get("uniqueId")?.toString() ?? null
    const password = data.get("password")?.toString() ?? null
    const otp = data.get("OTP")?.toString() ?? null

    const errors = validation({ uniqueId, password, otp })
    setError(errors)

    if (Object.keys(errors).length > 0) {
      // Validation failed, prevent form submission
      return false
    }
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
                {props.type === "forgetpassword"
                  ? "Reset your password !"
                  : "Sign in with otp"}
              </Typography>

              <Box
                component="form"
                noValidate
                onSubmit={otpSubmit}
                sx={{ mt: 1 }}
              >
                <CustomTextField
                  autofous={true}
                  id="uniqueId"
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
                {showOtp ? (
                  <CustomTextField
                    id="otp"
                    autofous={false}
                    name="otp"
                    label="OTP"
                  />
                ) : (
                  ""
                )}
                {error.uniqueId ? (
                  <Typography style={{ color: "red" }}>
                    {" "}
                    {error.otp}{" "}
                  </Typography>
                ) : (
                  <></>
                )}
                {props.type === "forgetpassword" && showOtp ? (
                  <CustomTextField
                    autofous={false}
                    id="newpassword"
                    name="newpassword"
                    label="New Password"
                  />
                ) : (
                  ""
                )}
                {error.password ? (
                  <Typography style={{ color: "red" }}>
                    {" "}
                    {error.password}{" "}
                  </Typography>
                ) : (
                  <></>
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
                  style={{ backgroundColor: "#27AE60" }}
                >
                  {showOtp ? "Submit" : "Send OTP"}
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link
                      onClick={() => check()}
                      style={{
                        color: "#767A8A",
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
                        color: "#767A8A",
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
