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

const header = {
  method: null,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  Authorization: 'Bearer '+ token,
  body: null
}
headerComment
// export default Api
export default axios.create(config);
