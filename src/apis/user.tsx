import axios from "axios";

import default_catch from "../utils/error";

const Axios = axios.create({ baseURL: "http://localhost:3001/user" });

class User {
  // edit profile
  static edit_user_profile(payload: any) {
    return new Promise((resolve) => {
      Axios.patch("/edit_user_profile", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // edit send_friend_request
  static send_friend_request(payload: any) {
    return new Promise((resolve) => {
      Axios.post("/send_friend_request", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // accept_request
  static accept_request(payload: any) {
    return new Promise((resolve) => {
      Axios.post("/accept_request", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // user_list
  static user_list(payload: any) {
    return new Promise((resolve) => {
      Axios.get("/user_list", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // friends_list
  static friends_list(payload: any) {
    return new Promise((resolve) => {
      Axios.get("/friends_list", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // get_requests
  static get_requests(payload: any) {
    return new Promise((resolve) => {
      Axios.get("/get_requests", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // delete_request
  static delete_request(payload: any) {
    return new Promise((resolve) => {
      Axios.delete("/delete_request", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }
}

export default User;
