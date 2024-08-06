import axios from "axios";
// component imports
import default_catch from "../utils/error";

const instance = axios.create({
  baseURL: "http://localhost:3001/auth",
})

class Auth {
  // for login
  static login(payload: any) {
    return new Promise((resolve) => {
      instance
        .post("/login", payload)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          default_catch(err, resolve)
        })
    })
  }

  // generating otp during register
  static generate_otp_register(payload: any) {
    return new Promise((resolve) => {
      instance
        .post("/generate_otp_register", payload)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          default_catch(err, resolve)
        })
    })
  }

  // registering user in database
  static register_user(payload: any) {
    return new Promise((resolve) => {
      instance
        .post("/register_user", payload)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          default_catch(err, resolve)
        })
    })
  }
  //for forget password / change url to  and verify otp pending
  static forgetPassword(payload: any) {
    return new Promise((resolve) => {
      instance
        .post("/sign_in_by_otp", payload)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          default_catch(err, resolve)
        })
    })
  }

  // to resend otp
  static resendOtp(payload: any) {
    return new Promise((resolve) => {
      instance
        .post("/resend_otp", payload)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          default_catch(err, resolve)
        })
    })
  }
}

export default Auth;
