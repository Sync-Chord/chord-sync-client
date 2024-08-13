import axios from "axios"

import default_catch from "../utils/error"

const Axios = axios.create({ baseURL: "http://localhost:3001/chat" })

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
          resolve(response)
        })
        .catch((err) => {
          default_catch(err, resolve)
        })
    })
  }
}

export default Chat
