//import config API
import { api } from '../config/config.js'

export function getRegister(email, pass, firstname, lastname) {

    // utilisation axios
    const axios = require('axios').default;

    function htmlEntities(str) {
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&qut;');
      }

    let user = {
        email: email,
        password: pass,
        firstname: htmlEntities(firstname),
        lastname: htmlEntities(lastname)
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
