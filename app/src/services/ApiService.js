import axios from "axios";

export default axios.create({
    baseURL: 'https://sdr-back.dev-development.xyz',
    headers: {
        'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('vuex')) ? JSON.parse(window.localStorage.getItem('vuex')).token : ''
    },
})