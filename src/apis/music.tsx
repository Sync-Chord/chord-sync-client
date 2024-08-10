import axios from "axios";

import default_catch from "../utils/error";

const Axios = axios.create({ baseURL: "http://localhost:3001/user" });

class Music {
  // create_palylist
  static create_palylist(payload: any) {
    return new Promise((resolve) => {
      Axios.post("/create_palylist", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // add_song_to_palylist
  static add_song_to_palylist(payload: any) {
    return new Promise((resolve) => {
      Axios.post("/add_song_to_palylist", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }

  // delete_playlist
  static delete_playlist(payload: any) {
    return new Promise((resolve) => {
      Axios.delete("/delete_playlist", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          default_catch(err, resolve);
        });
    });
  }
}

export default Music;
