//import config API
import { api } from '../config/config.js'

export function getRegister(email, pass, firstname, lastname) {

    // utilisation axios
    const axios = require('axios').default;

    let user = {
        email: email,
        password: pass,
        firstname: firstname,
        lastname: lastname
      }
      // requete post sur notre API
      return axios.post(api + '/api/user/signup', user)
        .then(function (response) {
          return true
        })
        .catch(function (error){
          return false
        })

}
