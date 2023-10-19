import axios from "axios";

const token = window.localStorage.getItem("vuex")
  ? JSON.parse(window.localStorage.getItem("vuex")).token
  : null;

const config = {
    baseURL: "http://localhost:3000/api",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

export default axios.create(config);
