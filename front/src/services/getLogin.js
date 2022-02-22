import { api } from '../config/config.js'

export function getLogin(email, password) {

    // utilisation axios
    const axios = require('axios').default;

    let user = {
        email: email,
        password: password
      }
     return axios.post(api + '/api/user/login', user)
        .then(function (response){
          //stockage en localStorage de l'id & token
          return response.data
        })
        .catch(function (error){
            console.log(error)
            return false
        })

}
