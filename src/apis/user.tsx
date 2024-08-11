import axios from "axios";

import default_catch from "../utils/error";

const Axios = axios.create({ baseURL: "http://localhost:3001/user" });

class User {
  // edit profile
  static edit_user_profile(payload: any, head: any) {
    return new Promise((resolve) => {
      Axios.patch("/edit_user_profile", payload, {
        headers: {
          token: head.token,
          user: head.id,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // edit send_friend_request
  static send_friend_request(payload: any, head: any) {
    return new Promise((resolve) => {
      Axios.post("/send_friend_request", payload, {
        headers: {
          token: head.token,
          user: head.user,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // accept_request
  static accept_request(payload: any, head: any) {
    return new Promise((resolve) => {
      Axios.patch("/accept_request", payload, {
        headers: {
          token: head.token,
          user: head.user,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // user_list
  static user_list(payload: any, head: any) {
    console.log(head);
    return new Promise((resolve) => {
      Axios.get("/user_list", {
        headers: {
          token: head.token,
          user: head.user,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // friends_list
  static friends_list(payload: any, head: any) {
    return new Promise((resolve) => {
      Axios.get("/friends_list", {
        headers: {
          token: head.token,
          user: head.user,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // get_requests
  static get_requests(payload: any, head: any) {
    return new Promise((resolve) => {
      Axios.get("/get_requests", {
        headers: {
          token: head.token,
          user: head.user,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // delete_request
  static delete_request(payload: any, head: any) {
    return new Promise((resolve) => {
      Axios.delete("/delete_request", {
        headers: {
          token: head.token,
          user: head.user,
        },
      })
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
