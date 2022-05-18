import axios from "axios";
console.log('okokokok', JSON.parse(window.localStorage.getItem('vuex')));

export default axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('vuex')) ? JSON.parse(window.localStorage.getItem('vuex')).token : ''
    },
})