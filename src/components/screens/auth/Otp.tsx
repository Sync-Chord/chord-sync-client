// modules imports
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// MUI imports
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

// apis imports
import Auth from "../../../apis/auth";

// assets imports
import image from "../../../assests/images/logo.png";

// redux imports
import { success_reducer } from "../../../redux/authReducer";

// functions imports
import validation from "../../../utils/validation";

//components imports
import ButtonLoader from "../../common/ButtonLoader";
import CustomTextField from "../../common/CustomTextField";

interface props {
  type: String;
}

const defaultTheme = createTheme();

// otp component
const Otp = (props: props) => {
  // redux selector
  const { error } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);

  // constants
  const { token } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  // States
  const [showOtp, setShowOtp] = useState(false);
  const [newToken, setNewToken] = useState(token);
  const [err, setError] = useState<Record<string, string>>({});

  // function
  // verfiy OTP
  const handleVerifyOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (!newToken) {
      nav("/auth/signup");
    } else {
      const otp = data.get("otp")?.toString() ?? null;
      setError(validation({ otp }));
      if (err.otp) {
        return;
      }
      setLoading(true);
      Auth.register_user({
        otp,
        token: newToken,
      })
        .then((res: any) => {
          setLoading(false);
          if (res.status !== 200) {
            throw new Error(res.data.message);
          } else {
            dispatch(success_reducer(res?.data?.data));
            toast.success("User Registered Successfully");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
        });
    }
  };

  // send OTP
  const sendOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const uniqueId = data.get("uniqueId")?.toString() ?? null;

    const validationErrors = validation({ uniqueId });
    setError(validationErrors);

    if (validationErrors.uniqueId) {
      return;
    }

    setLoading(true);
    Auth.generate_otp_sign_in({ unique_id: uniqueId })
      .then((res: any) => {
        setLoading(false);
        if (res.status !== 200) {
          throw new Error(res.data.message);
        } else {
          toast.success("Otp Sent Successfully");
          setNewToken(res?.data?.data);
          setShowOtp(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  // verfy OTP during sign in
  const verifySignOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const uniqueId = data.get("uniqueId")?.toString() ?? null;
    const otp = data.get("otp")?.toString() ?? null;

    const validationErrors = validation({ uniqueId, otp });
    setError(validationErrors);

    if (validationErrors.uniqueId) {
      return;
    }

    setLoading(true);
    Auth.sign_in_by_otp({ token: newToken, otp })
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

  // resend OTP
  const handleResendOtp = () => {
    if (!newToken) {
      nav("/auth/signup");
    } else {
      setLoading(true);
      Auth.resendOtp({
        token: newToken,
      })
        .then((res: any) => {
          setLoading(false);
          if (res.status !== 200) {
            throw new Error(res.data.message);
          } else {
            setNewToken(res?.data?.data);
            toast.success("Otp Resent Successfully");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
        });
    }
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
              {props.type === "verifyotp" ? (
                <>
                  <Typography sx={{ fontSize: "25px" }}>Hello!</Typography>
                  <Typography sx={{ fontSize: "15px" }}>Verify Otp</Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleVerifyOtp}
                    sx={{ mt: 1 }}
                  >
                    <CustomTextField
                      autofocus={true}
                      id="otp"
                      name="otp"
                      label="OTP"
                    />
                    {err.otp ? (
                      <Typography style={{ color: "red" }}>
                        {err.otp}
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
                      <>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          style={{ backgroundColor: "#27AE60" }}
                        >
                          Submit OTP
                        </Button>
                        <Button
                          onClick={handleResendOtp}
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          style={{ backgroundColor: "#27AE60" }}
                        >
                          Resend OTP
                        </Button>
                      </>
                    )}
                  </Box>
                </>
              ) : (
                <>
                  <Typography sx={{ fontSize: "25px" }}>Hello!</Typography>
                  <Typography sx={{ fontSize: "15px" }}>
                    {props.type === "forgetpassword"
                      ? "Reset your password !"
                      : "Sign in with otp"}
                  </Typography>

                  <Box
                    component="form"
                    noValidate
                    onSubmit={showOtp ? verifySignOtp : sendOtp}
                    sx={{ mt: 1 }}
                  >
                    <CustomTextField
                      autofocus={true}
                      id="uniqueId"
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
                    {showOtp ? (
                      <CustomTextField
                        id="otp"
                        autofocus={false}
                        name="otp"
                        label="OTP"
                      />
                    ) : (
                      ""
                    )}
                    {err.uniqueId ? (
                      <Typography style={{ color: "red" }}>
                        {err.otp}
                      </Typography>
                    ) : (
                      <></>
                    )}
                    {props.type === "forgetpassword" && showOtp ? (
                      <CustomTextField
                        autofocus={false}
                        id="newpassword"
                        name="newpassword"
                        label="New Password"
                      />
                    ) : (
                      ""
                    )}
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
                        {showOtp ? "Submit" : "Send OTP"}
                      </Button>
                    )}
                    <Grid container>
                      <Grid item xs>
                        <Link
                          onClick={handleResendOtp}
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
                </>
              )}
            </Box>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Otp;
