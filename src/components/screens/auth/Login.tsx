// module imports
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// mui imports
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";

// assets import
import image from "../../../assests/images/logo.png";

//redux imports
import { success_reducer } from "../../../redux/authReducer";

// functions imports
import validation from "../../../utils/validation";

//apis imports
import Auth from "../../../apis/auth";

//components imports
import ButtonLoader from "../../common/ButtonLoader";
import CustomTextField from "../../common/CustomTextField";

const defaultTheme = createTheme();

const Login = () => {
  //redux
  const { error } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(false);

  //toasts
  if (error) {
    toast.error(error);
  }

  //constants
  const nav = useNavigate();
  const dispatch = useDispatch();

  //states
  const [err, setError] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  //function
  //login using credentials
  const loginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const uniqueId = data.get("uniqueId")?.toString() ?? null;
    const password = data.get("password")?.toString() ?? null;

    const validationErrors = validation({ uniqueId, password });
    setError(validationErrors);

    if (validationErrors.uniqueId || validationErrors.password) {
      return;
    }

    setLoading(true);
    Auth.sign_in({ unique_id: uniqueId, password })
      .then((res: any) => {
        setLoading(false);
        if (res.status !== 200) {
          throw new Error(res.data.message);
        } else {
          dispatch(success_reducer(res?.data?.data));
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
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
                  autofocus={true}
                  name="uniqueId"
                  label="Email or Phone"
                />
                {err.uniqueId ? (
                  <Typography style={{ color: "red" }}>
                    {err.uniqueId}
                  </Typography>
                ) : (
                  <></>
                )}
                <CustomTextField
                  id="password"
                  autofocus={false}
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  icon={
                    <VisibilityIcon
                      style={{ color: "#A8A196" }}
                      cursor="pointer"
                      onMouseOut={() => setShowPassword(false)}
                      onMouseOver={() => setShowPassword(true)}
                    />
                  }
                />

                {err.password ? (
                  <Typography style={{ color: "red" }}>
                    {err.password}
                  </Typography>
                ) : (
                  <></>
                )}

                {loading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "10px",
                    }}
                  >
                    <ButtonLoader />
                  </div>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ backgroundColor: "#27AE60" }}
                  >
                    Sign In
                  </Button>
                )}
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
};

export default Login;
