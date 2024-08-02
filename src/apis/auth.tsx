import axios from "axios"
// component imports
import default_catch from "../utils/error"

const instance = axios.create({
  baseURL: "http://localhost:3000/auth",
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


  static register(payload:any){
    return new Promise((resolve) => {
      instance
        .post("/signup", payload)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          default_catch(err, resolve)
        })
    })
  }

// forget password
// otp * 4
}

export default Auth;
