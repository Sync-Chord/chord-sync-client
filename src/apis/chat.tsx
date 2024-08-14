import axios from "axios";

import default_catch from "../utils/error";

const Axios = axios.create({ baseURL: "https://chord-sync-server.onrender.com/chat" });

class Chat {
  static create_chat(payload: any, head: any) {
    return new Promise((resolve) => {
      Axios.post("/create_chat", payload, {
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

  static get_chat(payload: any, head: any) {
    return new Promise((resolve) => {
      Axios.get(`/get_chats?type=${payload.type}`, {
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

  static get_messages(payload: any, head: any) {
    return new Promise((resolve) => {
      Axios.get(`/get_messages?chat_id=${payload.chat_id}`, {
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

export default Chat;
