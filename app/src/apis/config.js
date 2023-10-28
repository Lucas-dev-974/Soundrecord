import axios from "axios";

const token = window.localStorage.getItem("vuex")
  ? JSON.parse(window.localStorage.getItem("vuex")).token
  : null;

const host = () => {
  if (!window.location.href.includes("localhost")) {
    return "http://api.soudrecord.lelu0920.odns.fr/";
  } else {
    return "http://localhost:3000/";
  }
};
const config = {
  baseURL: host() + "api",
  headers: {
    Authorization: "Bearer " + token,
  },
};

export default axios.create(config);
