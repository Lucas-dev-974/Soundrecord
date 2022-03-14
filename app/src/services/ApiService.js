import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('vuex')).token  ?? ''
    },
})