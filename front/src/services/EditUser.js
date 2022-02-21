import { api } from '../config/config.js'

export function editUser(firstname, lastname, avatar) {

        const userInfo = JSON.parse(localStorage.getItem('info'))
        // utilisation axios
        const axios = require('axios').default;

        const data = new FormData();
        data.append('firstname', firstname);
        data.append('lastname', lastname);
        data.append('profilImg', avatar);
        data.append('userId', userInfo.userId);

        axios.put(api + '/api/user/' + userInfo.userId, data, {
            headers: {
            'Authorization' : 'Bearer ' + userInfo.token,
            "Accept": 'application/json',
            "Content-Type": "application/json"}
        })
            .then(function (response) {
            console.log('Profil mis à jour')
            })
            .catch(function (error){
            console.log(error)
            })
}
