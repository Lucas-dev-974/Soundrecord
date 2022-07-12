import axios from "axios";
const token = window.localStorage.getItem('vuex') ? (JSON.parse(window.localStorage.getItem('vuex')).token ?? null) : null
export default axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Authorization': 'Bearer ' + token,
    },
});