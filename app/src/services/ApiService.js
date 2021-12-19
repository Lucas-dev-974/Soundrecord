import axios from "axios";

let token
if(window.localStorage.getItem('vuex'))
 token = JSON.parse(window.localStorage.getItem('vuex')).token ?? ''

export default axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Authorization': 'Bearer ' + token
    }
})