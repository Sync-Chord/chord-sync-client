import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Auth from "../../../apis/auth";
import image from "../../../assests/images/logo.png";
import {
  error_reducer,
  loading_reducer,
  success_reducer,
} from "../../../redux/authReducer";
import validation from "../../../utils/validation";
import ButtonLoader from "../../common/ButtonLoader";
import CustomTextField from "../../common/CustomTextField";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Login = () => {
  //redux
  const { loading, error } = useSelector((state: any) => state.auth);

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

    dispatch(loading_reducer());
    Auth.sign_in({ unique_id: uniqueId, password })
      .then((res: any) => {
        if (res.status !== 200) {
          throw new Error(res.data.message);
        } else {
          dispatch(success_reducer(res?.data?.data));
        }
      })
      .catch((err) => {
        dispatch(error_reducer(err.message));
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
                  <ButtonLoader />
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
