// Module imports
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// MUI imports
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// assets imports
import image from "../../../assests/images/logo.png";

// function imports
import validation from "../../../utils/validation";

// redux imports
import { remover_loading_reducer } from "../../../redux/authReducer";

// apis imports
import Auth from "../../../apis/auth";

// component imports
import ButtonLoader from "../../common/ButtonLoader";
import CustomTextField from "../../common/CustomTextField";

const defaultTheme = createTheme();

const SignUp = () => {
  //redux
  const { error } = useSelector((state: any) => state.auth);

  //constants
  const nav = useNavigate();
  const dispatch = useDispatch();

  //states
  const [err, setError] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //functions
  const signUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const uniqueId = data.get("uniqueId")?.toString() ?? null;
    const password = data.get("password")?.toString() ?? null;
    const name = data.get("name")?.toString() ?? null;

    const validationErrors = validation({ name, uniqueId, password });
    setError(validationErrors);

    if (
      validationErrors.name ||
      validationErrors.uniqueId ||
      validationErrors.password
    ) {
      return;
    }

    setLoading(true);
    Auth.generate_otp_register({ unique_id: uniqueId, password, name })
      .then((res: any) => {
        setLoading(false);
        if (res.status !== 200) {
          throw new Error(res.data.message);
        } else {
          dispatch(remover_loading_reducer());
          nav(`/auth/verify-otp/${res?.data?.data}`);
          toast.success("Otp Sent Successfully");
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
            width: "100%",
            maxWidth: "400px",
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
                      autofocus={true}
                      name="name"
                      label="Name"
                    />
                    {err.name ? (
                      <Typography style={{ color: "red" }}>
                        {" "}
                        {err.name}{" "}
                      </Typography>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      id="uniqueId"
                      autofocus={false}
                      name="uniqueId"
                      label="Email or Phone"
                    />
                    {err.uniqueId ? (
                      <Typography style={{ color: "red" }}>
                        {" "}
                        {err.uniqueId}{" "}
                      </Typography>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid item xs={12}>
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
                  </Grid>
                </Grid>
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
                    Sign Up
                  </Button>
                )}
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
  );
};

export default SignUp;
